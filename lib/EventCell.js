"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _dates = _interopRequireDefault(require("./utils/dates"));

var _accessors = require("./utils/accessors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var EventCell = _react["default"].createClass({
  displayName: "EventCell",
  render: function render() {
    var _this$props = this.props,
        className = _this$props.className,
        event = _this$props.event,
        selected = _this$props.selected,
        eventPropGetter = _this$props.eventPropGetter,
        startAccessor = _this$props.startAccessor,
        endAccessor = _this$props.endAccessor,
        titleAccessor = _this$props.titleAccessor,
        slotStart = _this$props.slotStart,
        slotEnd = _this$props.slotEnd,
        onSelect = _this$props.onSelect,
        Event = _this$props.eventComponent,
        EventWrapper = _this$props.eventWrapperComponent,
        props = _objectWithoutProperties(_this$props, ["className", "event", "selected", "eventPropGetter", "startAccessor", "endAccessor", "titleAccessor", "slotStart", "slotEnd", "onSelect", "eventComponent", "eventWrapperComponent"]);

    var title = (0, _accessors.accessor)(event, titleAccessor),
        end = (0, _accessors.accessor)(event, endAccessor),
        start = (0, _accessors.accessor)(event, startAccessor),
        isAllDay = (0, _accessors.accessor)(event, props.allDayAccessor),
        continuesPrior = _dates["default"].lt(start, slotStart, 'day'),
        continuesAfter = _dates["default"].gt(end, slotEnd, 'day');

    if (eventPropGetter) var _eventPropGetter = eventPropGetter(event, start, end, selected),
        style = _eventPropGetter.style,
        xClassName = _eventPropGetter.className;
    event.selected = selected;

    if (typeof event.responsible_person !== 'undefined' && event.responsible_person !== '') {
      title = event.responsible_person + '; ' + title;
    }

    return _react["default"].createElement(EventWrapper, {
      event: event
    }, _react["default"].createElement("div", _extends({}, props, {
      style: _objectSpread({}, props.style, {}, style, {
        backgroundColor: this.props.event.color || 'inherit'
      }),
      className: (0, _classnames["default"])('rbc-event', className, xClassName, {
        'rbc-selected': selected,
        'rbc-event-allday': isAllDay || _dates["default"].diff(start, _dates["default"].ceil(end, 'day'), 'day') > 1,
        'rbc-event-continues-prior': continuesPrior,
        'rbc-event-continues-after': continuesAfter
      }),
      onClick: function onClick() {
        return onSelect(event);
      }
    }), _react["default"].createElement("div", {
      className: "rbc-event-content",
      title: title.replace(/<\/?[^>]+(>|$)/g, "")
    }, Event ? _react["default"].createElement(Event, {
      event: event,
      title: title.replace(/<\/?[^>]+(>|$)/g, "")
    }) : _react["default"].createElement("div", {
      dangerouslySetInnerHTML: {
        __html: title
      }
    }))));
  }
});

var _default = EventCell;
exports["default"] = _default;