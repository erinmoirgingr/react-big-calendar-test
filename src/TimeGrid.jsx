import PropTypes from 'prop-types';
import React, { Component, createRef } from 'react';
import cn from 'classnames';
import { findDOMNode } from 'react-dom';
import dates from './utils/dates';
import localizer from './localizer'

import DayColumn from './DayColumn';
import EventRow from './EventRow';
import TimeColumn from './TimeColumn';
import BackgroundCells from './BackgroundCells';

import width from 'dom-helpers/width';
import scrollbarSize from 'dom-helpers/scrollbarSize';
import message from './utils/messages';

import { dateFormat} from './utils/propTypes';

import { notify } from './utils/helpers';
import { navigate } from './utils/constants';
import { accessor as get } from './utils/accessors';

import {
  inRange, eventSegments, endOfRange
  , eventLevels, sortEvents, segStyle } from './utils/eventLevels';

const MIN_ROWS = 2;


export default class TimeGrid extends Component {

  static propTypes = {
    ...DayColumn.propTypes,
    ...TimeColumn.propTypes,

    step: PropTypes.number,
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    dayFormat: dateFormat,
    rtl: PropTypes.bool
  }

  static defaultProps = {
    ...DayColumn.defaultProps,
    ...TimeColumn.defaultProps,

    step: 30,
    min: dates.startOf(new Date(), 'day'),
    max: dates.endOf(new Date(), 'day'),
    /* these 2 are needed to satisfy requirements from TimeColumn required props
     * There is a strange bug in React, using ...TimeColumn.defaultProps causes weird crashes
     */
    type: 'gutter',
    now: new Date()
  }

  constructor(props) {
    super(props)
    this.state = { gutterWidth: undefined, isOverflowing: null };
    this._selectEvent = this._selectEvent.bind(this)
    this._headerClick = this._headerClick.bind(this)
    this._gutters = [];

    this.refElems = {
      content: createRef(),
      allDay: createRef(),
      headerCell: createRef(),
    }
  }

  componentDidMount() {
    this.checkOverflow();

    if (this.props.width == null) {
      this.measureGutter()
    }
  }

  componentDidUpdate() {
    if (this.props.width == null && !this.state.gutterWidth) {
      this.measureGutter()
    }

    //this.checkOverflow()
  }

  render() {
    let {
        events, start, end, width
      , startAccessor, endAccessor, allDayAccessor } = this.props;

    width = width || this.state.gutterWidth;

    let range = dates.range(start, end, 'day')

    this._slots = range.length;

    let allDayEvents = []
      , rangeEvents = [];

    events.forEach(event => {
      if (inRange(event, start, end, this.props)) {
        let eStart = get(event, startAccessor)
          , eEnd = get(event, endAccessor);

        if (
          get(event, allDayAccessor)
          || !dates.eq(eStart, eEnd, 'day')
          || (dates.isJustDate(eStart) && dates.isJustDate(eEnd)))
        {
          allDayEvents.push(event)
        }
        else
          rangeEvents.push(event)
      }
    })

    allDayEvents.sort((a, b) => sortEvents(a, b, this.props))

    let {first, last} = endOfRange(range);

    let segments = allDayEvents.map(evt => eventSegments(evt, first, last, this.props))

    let gutterRef = ref => this._gutters[1] = ref && findDOMNode(ref);

    return (
      <div className='rbc-time-view'>
        {
          this.renderHeader(range, segments, width)
        }
        <div ref={this.refElems.content} className='rbc-time-content'>
          <TimeColumn
            {...this.props}
            showLabels
            style={{ width }}
            ref={gutterRef}
            className='rbc-time-gutter'
          />
          {
            this.renderEvents(range, rangeEvents, this.props.now)
          }
        </div>
      </div>
    );
  }

  renderEvents(range, events, today){
    let { min, max, endAccessor, startAccessor, components } = this.props;

    return range.map((date, idx) => {
      let daysEvents = events.filter(
        event => dates.inRange(date,
          get(event, startAccessor),
          get(event, endAccessor), 'day')
      )

      return (
        <DayColumn
          {...this.props }
          min={dates.merge(date, min)}
          max={dates.merge(date, max)}
          eventComponent={components.event}
          eventWrapperComponent={components.eventWrapper}
          backgroundWrapperComponent={components.backgroundWrapper}
          className={cn({ 'rbc-now': dates.eq(date, today, 'day') })}
          style={segStyle(1, this._slots)}
          key={idx}
          date={date}
          events={daysEvents}
        />
      )
    })
  }

  renderAllDayEvents(range, levels){
    let { first, last } = endOfRange(range);

    while (levels.length < MIN_ROWS )
      levels.push([])

    return levels.map((segs, idx) =>
      <EventRow
        eventComponent={this.props.components.event}
        eventWrapperComponent={this.props.components.eventWrapper}
        titleAccessor={this.props.titleAccessor}
        startAccessor={this.props.startAccessor}
        endAccessor={this.props.endAccessor}
        allDayAccessor={this.props.allDayAccessor}
        eventPropGetter={this.props.eventPropGetter}
        onSelect={this._selectEvent}
        slots={this._slots}
        key={idx}
        segments={segs}
        start={first}
        end={last}
      />
    )
  }

  renderHeader(range, segments, width) {
    let { messages, rtl } = this.props;
    let { isOverflowing } = this.state || {};

    let { levels } = eventLevels(segments);
    let style = {};

    if (isOverflowing)
      style[rtl ? 'marginLeft' : 'marginRight'] = scrollbarSize() + 'px';

    return (
      <div
        ref={this.refElems.headerCell}
        className={cn(
          'rbc-time-header',
          isOverflowing && 'rbc-overflowing'
        )}
        style={style}
      >
        <div className='rbc-row'>
          <div
            className='rbc-label rbc-header-gutter'
            style={{ width }}
          />
          { this.renderHeaderCells(range) }
        </div>
        <div className='rbc-row'>
          <div
            ref={ref => this._gutters[0] = ref}
            className='rbc-label rbc-header-gutter'
            style={{ width }}
          >
            { message(messages).allDay }
          </div>
          <div ref={this.refElems.allDay} className='rbc-allday-cell'>
            <BackgroundCells
              backgroundWrapperComponent={this.props.components.backgroundWrapper}
              slots={range.length}
              values={range}
              type="AllDay"
              container={()=> this.refElems.allDay.current}
              selectable={this.props.selectable}
            />
            <div className='rbc-allday-events'>
              { this.renderAllDayEvents(range, levels) }
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderHeaderCells(range){
    let { dayFormat, culture } = this.props;

    return range.map((date, i) =>
      <div
        key={i}
        className='rbc-header'
        style={segStyle(1, this._slots)}
      >
        <a href='#' onClick={this._headerClick.bind(null, date)}>
          { localizer.format(date, dayFormat, culture) }
        </a>
      </div>
    )
  }

  _headerClick(date, e){
    e.preventDefault()
    notify(this.props.onNavigate, [navigate.DATE, date])
  }

  _selectEvent(...args){
    notify(this.props.onSelectEvent, args)
  }

  measureGutter() {
    let width = this.state.gutterWidth;
    let gutterCells = this._gutters;

    if (!width) {
      width = Math.max(...gutterCells.map(node => node.clientWidth));

      if (width) {
        this.setState({ gutterWidth: width })
      }
    }
  }

  checkOverflow() {
    if (this._updatingOverflow) return;

    let isOverflowing = this.refElems.content.current.scrollHeight > this.refElems.content.current.clientHeight;

    if (this.setState.isOverflowing !== isOverflowing) {
      this._updatingOverflow = true;
      this.setState({ isOverflowing }, () => {
        this._updatingOverflow = false;
      })
    }
  }

}
