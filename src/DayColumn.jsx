import React from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import Selection, { getBoundsForNode } from './Selection';
import dates from './utils/dates';
import { isSelected } from './utils/selection';
import localizer from './localizer'

import { notify } from './utils/helpers';
import { accessor } from './utils/propTypes';
import { accessor as get } from './utils/accessors';
import getStyledEvents, { positionFromDate, startsBefore } from './utils/dayViewLayout'

import TimeColumn from './TimeColumn'

function snapToSlot(date, step){
  var roundTo = 1000 * 60 * step;
  return new Date(Math.floor(date.getTime() / roundTo) * roundTo)
}

function overlaps(event, events, { startAccessor, endAccessor }, last) {
  let eStart = get(event, startAccessor);
  let offset = last;

  function overlap(eventB){
    return dates.lt(eStart, get(eventB, endAccessor))
  }

  if (!events.length) return last - 1
  events.reverse().some(prevEvent => {
    if (overlap(prevEvent)) return true
    offset = offset - 1
  })

  return offset
}

let DaySlot = React.createClass({

  propTypes: {
    events: React.PropTypes.array.isRequired,
    step: React.PropTypes.number.isRequired,
    min: React.PropTypes.instanceOf(Date).isRequired,
    max: React.PropTypes.instanceOf(Date).isRequired,

    allDayAccessor: accessor.isRequired,
    startAccessor: accessor.isRequired,
    endAccessor: accessor.isRequired,

    selectable: React.PropTypes.bool,
    eventOffset: React.PropTypes.number,

    onSelecting: React.PropTypes.func,
    onSelectSlot: React.PropTypes.func.isRequired,
    onSelectEvent: React.PropTypes.func.isRequired,

    className: React.PropTypes.string
  },

  getInitialState() {
    return { selecting: false };
  },


  componentDidMount() {
    this.props.selectable
    && this._selectable()
  },

  componentWillUnmount() {
    this._teardownSelectable();
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectable && !this.props.selectable)
      this._selectable();
    if (!nextProps.selectable && this.props.selectable)
      this._teardownSelectable();
  },

  render() {
    const {
      min,
      max,
      step,
      timeslots,
      now,
      selectRangeFormat,
      culture,
      ...props
    } = this.props
    this._totalMin = dates.diff(min, max, 'minutes')

    let { selecting, startSlot, endSlot } = this.state
      , style = this._slotStyle(startSlot, endSlot)

    let selectDates = {
      start: this.state.startDate,
      end: this.state.endDate
    };
    var self = this;

    if(this.props.view === 'day') {
      return (
        <div style={{display:'flex',flexGrow: '1'}}>
          {
            _.map(this.props.columnPKs, function(pk, i) {
              return (
                <div className="rbc-day-column-pk">
                  {(!_.isUndefined(props.components.SpecialistSlot)) ?
                    <props.components.SpecialistSlot
                      pk={pk}
                      key={'specialist-slots-' + pk}
                      now={now}
                      min={min}
                      max={max}
                      step={step}
                      numberSlots={props.extraColumnSlots}
                      eventComponent={props.eventComponent}
                      eventWrapper={props.components.eventWrapper}
                       />
                  : null }
                  <TimeColumn {...props}
                    className='rbc-day-slot'
                    timeslots={timeslots}
                    now={now}
                    min={min}
                    max={max}
                    step={step}
                    key={pk}
                    pk={pk}
                    extraColumnSlots={0}
                  >
                    {self.renderEvents(pk)}
                    {
                      selecting &&
                      <div className='rbc-slot-selection' style={style}>
                          <span>
                          { localizer.format(selectDates, selectRangeFormat, culture) }
                          </span>
                      </div>
                    }
                  </TimeColumn>
                </div>
              )
            })
          }

        </div>
      );
    }

    return (
      <TimeColumn 
        {...props}
        className='rbc-day-slot'
        timeslots={timeslots}
        now={now}
        min={min}
        max={max}
        step={step}
      >
        {self.renderEvents("")}
        {
          selecting &&
          <div className='rbc-slot-selection' style={style}>
              <span>
              { localizer.format(selectDates, selectRangeFormat, culture) }
              </span>
          </div>
        }
      </TimeColumn>
    );

  },

  renderEvents(pk) {
    let {
      events, min, culture, eventPropGetter, view, columnPKs
      , selected, eventTimeRangeFormat, eventComponent
      , eventWrapperComponent: EventWrapper
      , rtl: isRtl
      , step
      , startAccessor, endAccessor, titleAccessor } = this.props;

    let EventComponent = eventComponent;

    let obj = {"isSlots": false};

    if(view === 'day') {
      obj.responsible_person = pk;
    }

    events = _.filter(events, obj);

    events = _.filter(events, function(el, i) {
      var p = '';
      
      if(typeof el.responsible_person !== 'undefined') {
        p = el.responsible_person;
      } else if(typeof el.pk !== 'undefined') {
        p = el.pk;
      }

      return p === '' || columnPKs.indexOf(p) > -1;
    })

    events = getStyledEvents({
      events, startAccessor, endAccessor, min, totalMin: this._totalMin, step
    })

    return events.map(({ event, style }, idx) => {
      let start = get(event, startAccessor)
      let end = get(event, endAccessor)
      
      let title = get(event, titleAccessor)
      let label = localizer.format({ start, end }, eventTimeRangeFormat, culture);
      let _isSelected = isSelected(event, selected);

      if (eventPropGetter)
        var { style: xStyle, className } = eventPropGetter(event, start, end, _isSelected)

      let { height, top, width, xOffset } = style

      event.selected = _isSelected;

      if(view !== 'day' && typeof event.responsible_person !== 'undefined' && event.responsible_person !== '') {
        title = event.responsible_person + '; ' + title;
      }

      return (
        <EventWrapper event={event}>
          <div 
            key={'evt_' + idx}
            style={{
             ...xStyle,
             top: `${top}%`,
             height: `${height}%`,
             [isRtl ? 'right' : 'left']: `${Math.max(0, xOffset)}%`,
             width: `${width}%`,
             backgroundColor: event.color || 'inherit'
            }}
            title={label + ': ' + title.replace(/<\/?[^>]+(>|$)/g, "") }
            onClick={this._select.bind(null, event)}
            className={cn('rbc-event', className, {
              'rbc-selected': _isSelected,
            })}
          >
            <div className='rbc-event-label'>{label}</div>
            <div className='rbc-event-content'>
              { EventComponent
                ? <EventComponent event={event} title={title.replace(/<\/?[^>]+(>|$)/g, "")}/>
                : <div dangerouslySetInnerHTML={{__html: title}}></div>
              }
            </div>
          </div>
        </EventWrapper>
      )
    });
  },

  _slotStyle(startSlot, endSlot){

   
    let top = ((startSlot / this._totalMin) * 100);
    let bottom = ((endSlot / this._totalMin) * 100);
    
    return {
      top: top + '%',
      height: bottom - top + '%',
    }
  },

  _selectable(){
    let node = findDOMNode(this);
    let selector = this._selector = new Selection(()=> findDOMNode(this))

    let maybeSelect = (box) => {
      let onSelecting = this.props.onSelecting
      let current = this.state || {};
      let state = selectionState(box);
      let { startDate: start, endDate: end } = state;

      if (onSelecting) {
        if (
          (dates.eq(current.startDate, start, 'minutes') &&
          dates.eq(current.endDate, end, 'minutes')) ||
          onSelecting({ start, end }) === false
        )
          return
      }

      this.setState(state)
    }

    let selectionState = ({ y }) => {
      let { step, min, max } = this.props;
      let { top, bottom } = getBoundsForNode(node)

      let mins = this._totalMin;

      let range = Math.abs(top - bottom)

      let current = (y - top) / range;

      current = snapToSlot(minToDate(mins * current, min), step)

      if (!this.state.selecting)
        this._initialDateSlot = current

      let initial = this._initialDateSlot;

      if (dates.eq(initial, current, 'minutes'))
        current = dates.add(current, step, 'minutes')

      let start = dates.max(min, dates.min(initial, current))
      let end = dates.min(max, dates.max(initial, current))

      return {
        selecting: true,
        startDate: start,
        endDate: end,
        startSlot: positionFromDate(start, min, step),
        endSlot: positionFromDate(end, min, step)
      }
    }

    selector.on('selecting', maybeSelect)
    selector.on('selectStart', maybeSelect)

    selector
      .on('click', ({ x, y }) => {
        this._clickTimer = setTimeout(()=> {
          this._selectSlot(selectionState({ x, y }))
        })

        this.setState({ selecting: false })
      })

    selector
      .on('select', () => {
        if (this.state.selecting) {
          this._selectSlot(this.state)
          this.setState({ selecting: false })
        }
      })
  },

  _teardownSelectable() {
    if (!this._selector) return
    this._selector.teardown();
    this._selector = null;
  },

  _selectSlot({ startDate, endDate }) {
    let current = startDate
      , slots = [];

    while (dates.lte(current, endDate)) {
      slots.push(current)
      current = dates.add(current, this.props.step, 'minutes')
    }

    notify(this.props.onSelectSlot, {
      slots,
      start: startDate,
      end: endDate
    })
  },

  _select(event){
    clearTimeout(this._clickTimer);
    notify(this.props.onSelectEvent, event)
  }
});


function minToDate(min, date){
  var dt = new Date(date)
    , totalMins = dates.diff(dates.startOf(date, 'day'), date, 'minutes');

  dt = dates.hours(dt, 0);
  dt = dates.minutes(dt, totalMins + min);
  dt = dates.seconds(dt, 0)
  return dates.milliseconds(dt, 0)
}

export default DaySlot;
