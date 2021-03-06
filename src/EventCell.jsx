import React from 'react';
import cn from 'classnames';
import dates from './utils/dates';
import { accessor as get } from './utils/accessors';

class EventCell extends React.Component {
  render() {
    let {
        className, event, selected, eventPropGetter
      , startAccessor, endAccessor, titleAccessor
      , slotStart, slotEnd, onSelect
      , eventComponent: Event, eventWrapperComponent: EventWrapper
      , ...props } = this.props;

    let title = get(event, titleAccessor)
      , end = get(event, endAccessor)
      , start = get(event, startAccessor)
      , isAllDay = get(event, props.allDayAccessor)
      , continuesPrior = dates.lt(start, slotStart, 'day')
      , continuesAfter = dates.gt(end, slotEnd, 'day')

    if (eventPropGetter)
      var { style, className: xClassName } = eventPropGetter(event, start, end, selected);

    event.selected = selected;

    if(typeof event.responsible_person !== 'undefined' && event.responsible_person !== '') {
      title = event.responsible_person + '; ' + title;
    }

    return (
      <EventWrapper event={event}>
        <div
          {...props}
          style={{...props.style, ...style, backgroundColor: this.props.event.color || 'inherit'}}
          className={cn('rbc-event', className, xClassName, {
            'rbc-selected': selected,
            'rbc-event-allday': isAllDay || dates.diff(start, dates.ceil(end, 'day'), 'day') > 1,
            'rbc-event-continues-prior': continuesPrior,
            'rbc-event-continues-after': continuesAfter
          })}
          onClick={()=> onSelect(event)}
        >
          <div className='rbc-event-content' title={title.replace(/<\/?[^>]+(>|$)/g, "")}>
            { Event
              ? <Event event={event} title={title.replace(/<\/?[^>]+(>|$)/g, "")}/>
              : <div dangerouslySetInnerHTML={{__html: title}}></div>
            }
          </div>
        </div>
      </EventWrapper>
    );
  }
}

export default EventCell
