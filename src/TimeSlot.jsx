import React, { PropTypes, Component } from 'react'
import cn from 'classnames'
import { elementType } from './utils/propTypes'


export default class TimeSlot extends Component {
  static propTypes = {
    backgroundWrapperComponent: elementType,
    value: PropTypes.instanceOf(Date).isRequired,
    isNow: PropTypes.bool,
    showLabel: PropTypes.bool,
    content: PropTypes.string,
    culture: PropTypes.string
  }

  static defaultProps = {
    isNow: false,
    showLabel: false,
    content: ''
  }

  leeSelectSlot(available) {
    this.props.leeSelectSlot(this.props.pk, this.props.value, available);
  }

  render() {
    const BackgroundWrapper = this.props.backgroundWrapperComponent;
    let availability        = (typeof this.props.availability !== 'undefined' && typeof this.props.pk !== 'undefined' && typeof this.props.availability[this.props.pk] !== 'undefined' ? this.props.availability[this.props.pk] : false);
    let available           = false;

    if(availability && typeof availability[this.props.content.toLowerCase()] !== 'undefined' && availability[this.props.content.toLowerCase()]) {
      available = true;
    }

    return (
      <BackgroundWrapper value={this.props.value} pk={this.props.pk} available={available} type='TimeSlot'>
        <div
          onClick={this.leeSelectSlot.bind(this, available)}
          className={cn(
            'rbc-time-slot',
            this.props.showLabel && 'rbc-label',
            this.props.isNow && 'rbc-now',
            !this.props.showLabel && available && 'rbc-available'
          )}
        >
        {this.props.showLabel &&
          <span>{this.props.content}</span>
        }
        </div>
      </BackgroundWrapper>
    )
  }
}
