import PropTypes from 'prop-types';
import React from 'react';
import wrapComponent from "./EventRowMixin";

class EventRow extends React.Component {
  render(){
    let { segments, columnPKs } = this.props;

    let lastEnd = 1;

    return (
      <div className='rbc-row'>
      {
        segments.reduce((row, { event, left, right, span }, li) => {
          let key = '_lvl_' + li;
          let gap = left - lastEnd;

          let content = this.props.renderEvent(event)

          if (gap)
            row.push(this.props.renderSpan(gap, key + '_gap'))

          row.push(
            this.props.renderSpan(span, key, content)
          )

          lastEnd = (right + 1);

          return row;
        }, [])
      }
      </div>
    )
  }
}

EventRow.propTypes = {
  segments: PropTypes.array
}

EventRow.displayName = 'EventRow';

export default wrapComponent(EventRow);
