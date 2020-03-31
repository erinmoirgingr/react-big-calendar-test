"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _EventCell = _interopRequireDefault(require("./EventCell"));

var _selection = require("./utils/selection");

var _localizer = _interopRequireDefault(require("./localizer"));

var _offset2 = _interopRequireDefault(require("dom-helpers/offset"));

var _scrollTop = _interopRequireDefault(require("dom-helpers/scrollTop"));

var _scrollLeft = _interopRequireDefault(require("dom-helpers/scrollLeft"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Popup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Popup, _React$Component);

  function Popup(props) {
    var _this;

    _classCallCheck(this, Popup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Popup).call(this, props));
    _this.refElems = {
      root: _react["default"].createRef()
    };
    return _this;
  }

  _createClass(Popup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props$popupOffs = this.props.popupOffset,
          popupOffset = _this$props$popupOffs === void 0 ? 5 : _this$props$popupOffs,
          _offset = (0, _offset2["default"])(this.refs.root),
          top = _offset.top,
          left = _offset.left,
          width = _offset.width,
          height = _offset.height,
          viewBottom = window.innerHeight + (0, _scrollTop["default"])(window),
          viewRight = window.innerWidth + (0, _scrollLeft["default"])(window),
          bottom = top + height,
          right = left + width;

      if (bottom > viewBottom || right > viewRight) {
        var topOffset, leftOffset;
        if (bottom > viewBottom) topOffset = bottom - viewBottom + (popupOffset.y || +popupOffset || 0);
        if (right > viewRight) leftOffset = right - viewRight + (popupOffset.x || +popupOffset || 0);
        this.setState({
          topOffset: topOffset,
          leftOffset: leftOffset
        }); //eslint-disable-line
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          events = _this$props.events,
          selected = _this$props.selected,
          eventComponent = _this$props.eventComponent,
          eventWrapperComponent = _this$props.eventWrapperComponent,
          props = _objectWithoutProperties(_this$props, ["events", "selected", "eventComponent", "eventWrapperComponent"]);

      var _this$props$position = this.props.position,
          left = _this$props$position.left,
          width = _this$props$position.width,
          top = _this$props$position.top,
          topOffset = (this.state || {}).topOffset || 0,
          leftOffset = (this.state || {}).leftOffset || 0;
      var style = {
        top: top - topOffset,
        left: left - leftOffset,
        minWidth: width + width / 2
      };
      return _react["default"].createElement("div", {
        ref: this.refElems.root,
        style: style,
        className: "rbc-overlay"
      }, _react["default"].createElement("div", {
        className: "rbc-overlay-header"
      }, _localizer["default"].format(props.slotStart, props.dayHeaderFormat, props.culture)), events.map(function (event, idx) {
        return _react["default"].createElement(_EventCell["default"], _extends({
          key: idx
        }, props, {
          event: event,
          eventComponent: eventComponent,
          eventWrapperComponent: eventWrapperComponent,
          selected: (0, _selection.isSelected)(event, selected)
        }));
      }));
    }
  }]);

  return Popup;
}(_react["default"].Component);

var _default = Popup;
exports["default"] = _default;