import React from 'react';
import EventCell from './EventCell';
import { isSelected } from './utils/selection';
import localizer from './localizer';
import offset from 'dom-helpers/offset';
import scrollTop from 'dom-helpers/scrollTop';
import scrollLeft from 'dom-helpers/scrollLeft';

class Popup extends React.Component {

  constructor(props) {
    super(props);
    this.refElems = {
      root: React.createRef(),
    }
  }

  componentDidMount(){
    let { popupOffset = 5 } = this.props
      , { top, left, width, height } = offset(this.refElems.root.current)
      , viewBottom = window.innerHeight + scrollTop(window)
      , viewRight = window.innerWidth + scrollLeft(window)
      , bottom = top + height
      , right = left + width

    if (bottom > viewBottom || right > viewRight) {
      let topOffset, leftOffset;

      if (bottom > viewBottom)
        topOffset = bottom - viewBottom + (popupOffset.y || +popupOffset || 0)
      if (right > viewRight)
        leftOffset = right - viewRight + (popupOffset.x || +popupOffset || 0)

      this.setState({ topOffset, leftOffset }) //eslint-disable-line
    }
  }

  render() {
    let { events, selected, eventComponent, eventWrapperComponent, ...props } = this.props;

    let { left, width, top } = (this.props.position || {})
      , topOffset = (this.state || {}).topOffset || 0
      , leftOffset = (this.state || {}).leftOffset || 0;

    let style = {
      top: top - topOffset,
      left: left - leftOffset,
      minWidth: width + (width / 2)
    }

    return (
      <div ref={this.refElems.root} style={style} className='rbc-overlay'>
        <div className='rbc-overlay-header'>
          { localizer.format(props.slotStart, props.dayHeaderFormat, props.culture) }
        </div>
        {
          events && events.map((event, idx) =>
            <EventCell key={idx}
              {...props}
              event={event}
              eventComponent={eventComponent}
              eventWrapperComponent={eventWrapperComponent}
              selected={isSelected(event, selected)}
            />
          )
        }
      </div>
    )
  }
}

export default Popup;
