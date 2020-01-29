import PropTypes from 'prop-types';
import React from 'react';
import { findDOMNode } from 'react-dom';
import EventCell from './EventCell';
import height from 'dom-helpers/height';
import { accessor, elementType } from './utils/propTypes';
import { segStyle } from './utils/eventLevels';
import { isSelected } from './utils/selection';


function wrapComponent(Component) {
  class EventRowWrapper extends React.Component {
    renderEvent(event){
      let {
          eventPropGetter, selected, start, end
        , startAccessor, endAccessor, titleAccessor
        , allDayAccessor, eventComponent
        , eventWrapperComponent
        , onSelect } = this.props;

      return (
        <EventCell
          event={event}
          eventWrapperComponent={eventWrapperComponent}
          eventPropGetter={eventPropGetter}
          onSelect={onSelect}
          selected={isSelected(event, selected)}
          startAccessor={startAccessor}
          endAccessor={endAccessor}
          titleAccessor={titleAccessor}
          allDayAccessor={allDayAccessor}
          slotStart={start}
          slotEnd={end}
          eventComponent={eventComponent}
        />
      )
    }

    renderSpan(len, key, content = ' '){
      let { slots } = this.props;

      return (
        <div key={key} className='rbc-row-segment' style={segStyle(Math.abs(len), slots)}>
          {content}
        </div>
      )
    }

    getRowHeight(){
      height(findDOMNode(this))
    }

    render() {
      return (
        <Component
          {...this.props}
          renderSpan={this.renderSpan}
          renderEvent={this.renderEvent}
          getRowHeight={this.getRowHeight}
        />
      )
    }
  }

  EventRowWrapper.propTypes = {
    slots: PropTypes.number.isRequired,
    end: PropTypes.instanceOf(Date),
    start: PropTypes.instanceOf(Date),

    selected: PropTypes.array,
    eventPropGetter: PropTypes.func,
    titleAccessor: accessor,
    allDayAccessor: accessor,
    startAccessor: accessor,
    endAccessor: accessor,

    eventComponent: elementType,
    onSelect: PropTypes.func
  }

  EventRowWrapper.defaultProps = {
    segments: [],
    selected: [],
    slots: 7
  }

  return EventRowWrapper;
}

export default wrapComponent;
