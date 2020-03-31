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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function wrapComponent(Component) {
  var EventRowWrapper =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(EventRowWrapper, _React$Component);

    function EventRowWrapper() {
      _classCallCheck(this, EventRowWrapper);

      return _possibleConstructorReturn(this, _getPrototypeOf(EventRowWrapper).apply(this, arguments));
    }

    _createClass(EventRowWrapper, [{
      key: "renderEvent",
      value: function renderEvent(event) {
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
      }
    }, {
      key: "renderSpan",
      value: function renderSpan(len, key) {
        var content = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';
        var slots = this.props.slots;
        return _react["default"].createElement("div", {
          key: key,
          className: "rbc-row-segment",
          style: (0, _eventLevels.segStyle)(Math.abs(len), slots)
        }, content);
      }
    }, {
      key: "getRowHeight",
      value: function getRowHeight() {
        (0, _height["default"])((0, _reactDom.findDOMNode)(this));
      }
    }, {
      key: "render",
      value: function render() {
        return _react["default"].createElement(Component, _extends({}, this.props, {
          renderSpan: this.renderSpan,
          renderEvent: this.renderEvent,
          getRowHeight: this.getRowHeight
        }));
      }
    }]);

    return EventRowWrapper;
  }(_react["default"].Component);

  EventRowWrapper.propTypes = {
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
  };
  EventRowWrapper.defaultProps = {
    segments: [],
    selected: [],
    slots: 7
  };
  return EventRowWrapper;
}

var _default = wrapComponent;
exports["default"] = _default;