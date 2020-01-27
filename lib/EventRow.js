"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _EventRowMixin = _interopRequireDefault(require("./EventRowMixin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var EventRow = _react["default"].createClass({
  displayName: 'EventRow',
  propTypes: {
    segments: _propTypes["default"].array
  },
  mixins: [_EventRowMixin["default"]],
  render: function render() {
    var _this = this;

    var _this$props = this.props,
        segments = _this$props.segments,
        columnPKs = _this$props.columnPKs;
    var lastEnd = 1;
    return _react["default"].createElement("div", {
      className: "rbc-row"
    }, segments.reduce(function (row, _ref, li) {
      var event = _ref.event,
          left = _ref.left,
          right = _ref.right,
          span = _ref.span;
      var key = '_lvl_' + li;
      var gap = left - lastEnd;

      var content = _this.renderEvent(event);

      if (gap) row.push(_this.renderSpan(gap, key + '_gap'));
      row.push(_this.renderSpan(span, key, content));
      lastEnd = right + 1;
      return row;
    }, []));
  }
});

var _default = EventRow;
exports["default"] = _default;