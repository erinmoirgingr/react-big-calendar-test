import PropTypes from 'prop-types';
import React from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';
import dates from './utils/dates';
import localizer from './localizer'

import _ from "lodash";

import { navigate } from './utils/constants';
import { notify } from './utils/helpers';
import height from 'dom-helpers/height';
import position from 'dom-helpers/position';
import { request } from 'dom-helpers/animationFrame';

import EventRow from './EventRow';
import EventEndingRow from './EventEndingRow';
import Popup from './Popup';
import { Overlay } from 'react-overlays';
import BackgroundCells from './BackgroundCells';

import { dateFormat } from './utils/propTypes';
import {
    segStyle, inRange, eventSegments
  , endOfRange, eventLevels, sortEvents } from './utils/eventLevels';

let eventsForWeek = (evts, start, end, props) =>
  evts.filter(e => inRange(e, start, end, props));

let isSegmentInSlot = (seg, slot) => seg.left <= slot && seg.right >= slot;

let propTypes = {
  ...EventRow.PropTypes,

  culture: PropTypes.string,

  date: PropTypes.instanceOf(Date),

  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),

  dateFormat,

  weekdayFormat: dateFormat,

  popup: PropTypes.bool,

  popupOffset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    })
  ]),

  onSelectEvent: PropTypes.func,
  onSelectSlot: PropTypes.func
};


class MonthView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rowLimit: 5,
      needLimitMeasure: true
    }
    this._renderMeasureRows = this._renderMeasureRows.bind(this);
    this.renderWeek = this.renderWeek.bind(this);
    this.renderBackground = this.renderBackground.bind(this);
    this.renderRowLevel = this.renderRowLevel.bind(this);
    this._dateClick = this._dateClick.bind(this);
    this._dates = this._dates.bind(this);
    this._headers = this._headers.bind(this);
    this._measureRowLimit = this._measureRowLimit.bind(this);
    this._renderOverlay = this._renderOverlay.bind(this);
    this._selectDates = this._selectDates.bind(this);
    this._selectEvent = this._selectEvent.bind(this);
    this._showMore = this._showMore.bind(this);
    this.clearSelect = this.clearSelection.bind(this);
    this.renderShowMore = this.renderShowMore.bind(this);
  
  }

  componentWillMount() {
    this._bgRows = []
    this._pendingSelection = []
  }

  componentWillReceiveProps({ date }) {
    this.setState({
      needLimitMeasure: !dates.eq(date, this.props.date)
    })
  }

  componentDidMount() {
    let running;

    if (this.state.needLimitMeasure)
      this._measureRowLimit(this.props)

    window.addEventListener('resize', this._resizeListener = ()=> {
      if (!running) {
        request(()=> {
          running = false
          this.setState({ needLimitMeasure: true }) //eslint-disable-line
        })
      }
    }, false)
  }

  componentDidUpdate() {
    if (this.state.needLimitMeasure)
      this._measureRowLimit(this.props)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeListener, false)
  }

  render() {
    var { date, culture, weekdayFormat } = this.props
      , month = dates.visibleDays(date, culture)
      , weeks  = _.chunk(month, 7);

    let measure = this.state.needLimitMeasure

    this._weekCount = weeks.length;

    var elementProps = _.omit(this.props, Object.keys(propTypes));

    return (
      <div
        {...elementProps}
        className={cn('rbc-month-view', elementProps.className)}
      >
        <div className='rbc-row rbc-month-header'>
          {this._headers(weeks[0], weekdayFormat, culture)}
        </div>
        { weeks.map((week, idx) =>
            this.renderWeek(week, idx, measure && this._renderMeasureRows))
        }
      </div>
    )
  }

  renderWeek(week, weekIdx, content) {
    let { first, last } = endOfRange(week);
    let columnPKs       = this.props.columnPKs;
    let evts            = eventsForWeek(this.props.events, week[0], week[week.length - 1], this.props)

    evts = _.filter(evts, function(event, i) {
      var p     = '';

      if(typeof event.responsible_person !== 'undefined') {
        p = event.responsible_person;
      } else if(typeof event.pk !== 'undefined') {
        p = event.pk;
      }

      return p === '' || columnPKs.indexOf(p) > -1;
    })

    evts.sort((a, b) => sortEvents(a, b, this.props))

    let segments = evts = evts.map(evt => eventSegments(evt, first, last, this.props))
    let limit = (this.state.rowLimit - 1) || 1;

    let { levels, extra } = eventLevels(segments, limit)

    content = content || ((lvls, wk) => lvls.map((lvl, idx) => this.renderRowLevel(lvl, wk, idx)))

    return (
      <div key={'week_' + weekIdx}
        className='rbc-month-row'
        ref={!weekIdx ? (r => this._firstRow = r) : null}
      >
        {
          this.renderBackground(week, weekIdx)
        }
        <div
          className='rbc-row-content'
        >
          <div
            className='rbc-row'
            ref={!weekIdx ? (r => this._firstDateRow = r) : null}
          >
            { this._dates(week) }
          </div>
          {
            content(levels, week, weekIdx)
          }
          {
            !!extra.length &&
              this.renderShowMore(segments, extra, week, weekIdx, levels.length)
          }
        </div>
        { this.props.popup
            && this._renderOverlay()
        }
      </div>
    )
  }

  renderBackground(row, idx){
    let self = this;

    function onSelectSlot({ start, end }) {
      self._pendingSelection = self._pendingSelection
        .concat(row.slice(start, end + 1))

      clearTimeout(self._selectTimer)
      self._selectTimer = setTimeout(()=> self._selectDates())
    }

    return (
    <BackgroundCells
      backgroundWrapperComponent={this.props.components.backgroundWrapper}
      container={() => findDOMNode(this)}
      selectable={this.props.selectable}
      slots={7}
      values={row}
      type="Day"
      ref={r => this._bgRows[idx] = r}
      onSelectSlot={onSelectSlot}
    />
    )
  }

  renderRowLevel(segments, week, idx){
    let { first, last } = endOfRange(week);

    return (
      <EventRow
        {...this.props}
        eventComponent={this.props.components.event}
        eventWrapperComponent={this.props.components.eventWrapper}
        onSelect={this._selectEvent}
        key={idx}
        segments={segments}
        start={first}
        end={last}
      />
    )
  }

  renderShowMore(segments, extraSegments, week, weekIdx) {
    let { first, last } = endOfRange(week);

    let onClick = slot => this._showMore(segments, week[slot - 1], weekIdx, slot)

    return (
      <EventEndingRow
        {...this.props}
        eventComponent={this.props.components.event}
        eventWrapperComponent={this.props.components.eventWrapper}
        onSelect={this._selectEvent}
        onShowMore={onClick}
        key={'last_row_' + weekIdx}
        segments={extraSegments}
        start={first}
        end={last}
      />
    )
  }

  _dates(row){
    return row.map((day, colIdx) => {
      var offRange = dates.month(day) !== dates.month(this.props.date);

      return (
        <div
          key={'header_' + colIdx}
          style={segStyle(1, 7)}
          className={cn('rbc-date-cell', {
            'rbc-off-range': offRange,
            'rbc-now': dates.eq(day, new Date(), 'day'),
            'rbc-current': dates.eq(day, this.props.date, 'day')
          })}
        >
          <a href='#' onClick={this._dateClick.bind(null, day)}>
            { localizer.format(day, this.props.dateFormat, this.props.culture) }
          </a>
        </div>
      )
    })
  }

  _headers(row, format, culture){
    let first = row[0]
    let last = row[row.length - 1]

    return dates.range(first, last, 'day').map((day, idx) =>
      <div
        key={'header_' + idx}
        className='rbc-header'
        style={segStyle(1, 7)}
      >
        { localizer.format(day, format, culture) }
      </div>
    )
  }

  _renderMeasureRows(levels, row, idx) {
    let first = idx === 0;

    return first ? (
      <div className='rbc-row'>
        <div className='rbc-row-segment' style={segStyle(1, 7)}>
          <div ref={r => this._measureEvent = r} className={cn('rbc-event')}>
            <div className='rbc-event-content'>&nbsp;</div>
          </div>
        </div>
      </div>
    ) : <span/>
  }

  _renderOverlay(){
    let overlay = ((this.state && this.state.overlay) ? this.state.overlay : {});

    return (
      
      <Overlay
         rootClose
         placement='bottom'
         container={this}
         show={!!overlay.position}
         onHide={() => this.setState({ overlay: null })}
       >
         <Popup
            {...props}
            eventComponent={props.components.event}
            eventWrapperComponent={props.components.eventWrapper}
            position={overlay.position}
            events={overlay.events}
            slotStart={overlay.date}
            slotEnd={overlay.end}
            onSelect={selectEvent}
          />
      
       </Overlay>
    )
  }

  _measureRowLimit() {
    let eventHeight = height(this._measureEvent);
    let labelHeight = height(this._firstDateRow);
    let eventSpace = height(this._firstRow) - labelHeight;

    this._needLimitMeasure = false;

    this.setState({
      needLimitMeasure: false,
      rowLimit: Math.max(
        Math.floor(eventSpace / eventHeight), 1)
    })
  }

  _dateClick(date, e){
    e.preventDefault();
    this.clearSelection()
    notify(this.props.onNavigate, [navigate.DATE, date])
  }

  _selectEvent(...args){
    //cancel any pending selections so only the event click goes through.
    this.clearSelection()

    notify(this.props.onSelectEvent, args)
  }

  _selectDates(){
    let slots = this._pendingSelection.slice()

    this._pendingSelection = []

    slots.sort((a, b) => +a - +b)

    notify(this.props.onSelectSlot, {
      slots,
      start: slots[0],
      end: slots[slots.length - 1]
    })
  }

  _showMore(segments, date, weekIdx, slot){
    let cell = findDOMNode(this._bgRows[weekIdx]).children[slot - 1];

    let events = segments
      .filter(seg => isSegmentInSlot(seg, slot))
      .map(seg => seg.event)

    //cancel any pending selections so only the event click goes through.
    this.clearSelection()

    if (this.props.popup) {
      let position = position(cell, findDOMNode(this));

      this.setState({
        overlay: { date, events, position }
      })
    }
    else {
      notify(this.props.onNavigate, [navigate.DATE, date])
    }

    notify(this.props.onShowMore, [events, date, slot])
  }

  clearSelection(){
    clearTimeout(this._selectTimer)
    this._pendingSelection = [];
  }

};

MonthView.propTypes = propTypes;
MonthView.displayName = 'MonthView';

MonthView.navigate = (date, action)=>{
  switch (action){
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'month');

    case navigate.NEXT:
      return dates.add(date, 1, 'month')

    default:
      return date;
  }
}

MonthView.range = (date, { culture }) => {
  let start = dates.firstVisibleDay(date, culture)
  let end = dates.lastVisibleDay(date, culture)
  return { start, end }
}

export default MonthView
