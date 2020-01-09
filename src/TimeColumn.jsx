import React, { Component, PropTypes } from 'react'
import cn from 'classnames';

import dates from './utils/dates';

import TimeSlotGroup from './TimeSlotGroup'

export default class TimeColumn extends Component {
  static propTypes = {
    step: PropTypes.number.isRequired,
    timeslots: PropTypes.number.isRequired,
    now: PropTypes.instanceOf(Date).isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    showLabels: PropTypes.bool,
    timeGutterFormat: PropTypes.string,
    type: PropTypes.string.isRequired,
    className: PropTypes.string
  }
  static defaultProps = {
    step: 30,
    timeslots: 2,
    showLabels: false,
    type: 'day',
    className: ''
  }

  renderTimeSliceGroup(key, isNow, date) {
    return (
      <TimeSlotGroup
        backgroundWrapperComponent={this.props.components.backgroundWrapper}
        key={key}
        isNow={isNow}
        timeslots={this.props.timeslots}
        step={this.props.step}
        showLabels={this.props.showLabels}
        timeGutterFormat={this.props.timeGutterFormat}
        value={date}
        pk={this.props.pk}
        leeSelectSlot={this.props.leeSelectSlot}
        availability={this.props.availability}
      />
    )
  }

  render() {
    const totalMin = dates.diff(this.props.min, this.props.max, 'minutes')
    let numGroups  = Math.ceil(totalMin / (this.props.step * this.props.timeslots))
    const timeslots = []
    const groupLengthInMinutes = this.props.step * this.props.timeslots;

    if(numGroups > 24) {
      numGroups = 24;
    }

    let date = this.props.min
    let next = date
    let isNow = false

    if(this.props.view === 'day') {
      if(this.props.extraColumnSlots > 0) {
        for (var i = 0; i < this.props.extraColumnSlots; i++) {
          timeslots.push(
            <div key={"time-gutter-extra-slot-" + i} className={cn('rbc-time-slot specialist-time-slot' + (i === 0 ? ' rbc-day-column-pk-name' : ''))}>{(i === 0 ? 'Slots' : '\u00a0')}</div>
          );
        };
      }

      timeslots.push(
        <div key="time-gutter-person" className={cn('rbc-time-slot time-gutter-person')}>{'\u00a0'}</div>
      );
    }

    for (var i = 0; i < numGroups; i++) {
      isNow = dates.inRange(
          this.props.now
        , date
        , dates.add(next, groupLengthInMinutes - 1, 'minutes')
        , 'minutes'
      )

      next = dates.add(date, groupLengthInMinutes, 'minutes');
      timeslots.push(this.renderTimeSliceGroup(i, isNow, date))

      date = next
    }

    return (
      <div
        className={cn(this.props.className, 'rbc-time-column')}
        style={this.props.style}
      >
        {timeslots}
        {this.props.children}
      </div>
    )
  }
}
