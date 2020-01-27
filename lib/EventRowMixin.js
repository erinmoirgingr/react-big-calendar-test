"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _EventCell = _interopRequireDefault(require("./EventCell"));

var _height = _interopRequireDefault(require("dom-helpers/height"));

var _propTypes2 = require("./utils/propTypes");

var _eventLevels = require("./utils/eventLevels");

var _selection = require("./utils/selection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  propType: {
    slots: _propTypes["default"].number.isRequired,
    end: _propTypes["default"].instanceOf(Date),
    start: _propTypes["default"].instanceOf(Date),
    selected: _propTypes["default"].array,
    eventPropGetter: _propTypes["default"].func,
    titleAccessor: _propTypes2.accessor,
    allDayAccessor: _propTypes2.accessor,
    startAccessor: _propTypes2.accessor,
    endAccessor: _propTypes2.accessor,
    eventComponent: _propTypes2.elementType,
    onSelect: _propTypes["default"].func
  },
  getDefaultProps: function getDefaultProps() {
    return {
      segments: [],
      selected: [],
      slots: 7
    };
  },
  renderEvent: function renderEvent(event) {
    var _this$props = this.props,
        eventPropGetter = _this$props.eventPropGetter,
        selected = _this$props.selected,
        start = _this$props.start,
        end = _this$props.end,
        startAccessor = _this$props.startAccessor,
        endAccessor = _this$props.endAccessor,
        titleAccessor = _this$props.titleAccessor,
        allDayAccessor = _this$props.allDayAccessor,
        eventComponent = _this$props.eventComponent,
        eventWrapperComponent = _this$props.eventWrapperComponent,
        onSelect = _this$props.onSelect;
    return _react["default"].createElement(_EventCell["default"], {
      event: event,
      eventWrapperComponent: eventWrapperComponent,
      eventPropGetter: eventPropGetter,
      onSelect: onSelect,
      selected: (0, _selection.isSelected)(event, selected),
      startAccessor: startAccessor,
      endAccessor: endAccessor,
      titleAccessor: titleAccessor,
      allDayAccessor: allDayAccessor,
      slotStart: start,
      slotEnd: end,
      eventComponent: eventComponent
    });
  },
  renderSpan: function renderSpan(len, key) {
    var content = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';
    var slots = this.props.slots;
    return _react["default"].createElement("div", {
      key: key,
      className: "rbc-row-segment",
      style: (0, _eventLevels.segStyle)(Math.abs(len), slots)
    }, content);
  },
  getRowHeight: function getRowHeight() {
    (0, _height["default"])((0, _reactDom.findDOMNode)(this));
  }
};
exports["default"] = _default;