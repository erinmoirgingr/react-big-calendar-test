"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _EventRowMixin = _interopRequireDefault(require("./EventRowMixin"));

var _eventLevels = require("./utils/eventLevels");

var _messages = _interopRequireDefault(require("./utils/messages"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isSegmentInSlot = function isSegmentInSlot(seg, slot) {
  return seg.left <= slot && seg.right >= slot;
};

var eventsInSlot = function eventsInSlot(segments, slot) {
  return segments.filter(function (seg) {
    return isSegmentInSlot(seg, slot);
  }).length;
};

var EventRow = _react["default"].createClass({
  displayName: 'EventRow',
  propTypes: {
    segments: _propTypes["default"].array,
    slots: _propTypes["default"].number
  },
  mixins: [_EventRowMixin["default"]],
  render: function render() {
    var _this$props = this.props,
        segments = _this$props.segments,
        slotCount = _this$props.slots;
    var rowSegments = (0, _eventLevels.eventLevels)(segments).levels[0];
    var current = 1,
        lastEnd = 1,
        row = [];

    while (current <= slotCount) {
      var key = '_lvl_' + current;

      var _ref = rowSegments.filter(function (seg) {
        return isSegmentInSlot(seg, current);
      })[0] || {},
          event = _ref.event,
          left = _ref.left,
          right = _ref.right,
          span = _ref.span; //eslint-disable-line


      if (!event) {
        current++;
        continue;
      }

      var gap = Math.max(0, left - lastEnd);

      if (this.canRenderSlotEvent(left, span)) {
        var content = this.renderEvent(event);
        if (gap) row.push(this.renderSpan(gap, key + '_gap'));
        row.push(this.renderSpan(span, key, content));
        lastEnd = current = right + 1;
      } else {
        if (gap) row.push(this.renderSpan(gap, key + '_gap'));
        row.push(this.renderSpan(1, key, this.renderShowMore(segments, current)));
        lastEnd = current = current + 1;
      }
    }

    return _react["default"].createElement("div", {
      className: "rbc-row"
    }, row);
  },
  canRenderSlotEvent: function canRenderSlotEvent(slot, span) {
    var segments = this.props.segments;
    return _lodash["default"].range(slot, slot + span).every(function (s) {
      var count = eventsInSlot(segments, s);
      return count === 1;
    });
  },
  renderShowMore: function renderShowMore(segments, slot) {
    var messages = (0, _messages["default"])(this.props.messages);
    var count = eventsInSlot(segments, slot);
    return count ? _react["default"].createElement("a", {
      key: 'sm_' + slot,
      href: "#",
      className: 'rbc-show-more',
      onClick: this._showMore.bind(null, slot)
    }, messages.showMore(count)) : false;
  },
  _showMore: function _showMore(slot, e) {
    e.preventDefault();
    this.props.onShowMore(slot);
  }
});

var _default = EventRow;
exports["default"] = _default;