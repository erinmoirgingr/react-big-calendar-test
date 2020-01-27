"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes2 = require("./utils/propTypes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TimeSlot =
/*#__PURE__*/
function (_Component) {
  _inherits(TimeSlot, _Component);

  function TimeSlot() {
    _classCallCheck(this, TimeSlot);

    return _possibleConstructorReturn(this, _getPrototypeOf(TimeSlot).apply(this, arguments));
  }

  _createClass(TimeSlot, [{
    key: "leeSelectSlot",
    value: function leeSelectSlot(available) {
      this.props.leeSelectSlot(this.props.pk, this.props.value, available);
    }
  }, {
    key: "render",
    value: function render() {
      var BackgroundWrapper = this.props.backgroundWrapperComponent;
      var availability = typeof this.props.availability !== 'undefined' && typeof this.props.pk !== 'undefined' && typeof this.props.availability[this.props.pk] !== 'undefined' ? this.props.availability[this.props.pk] : false;
      var available = false;

      if (availability && typeof availability[this.props.content.toLowerCase()] !== 'undefined' && availability[this.props.content.toLowerCase()]) {
        available = true;
      }

      return _react["default"].createElement(BackgroundWrapper, {
        value: this.props.value,
        pk: this.props.pk,
        available: available,
        type: "TimeSlot"
      }, _react["default"].createElement("div", {
        onClick: this.leeSelectSlot.bind(this, available),
        className: (0, _classnames["default"])('rbc-time-slot', this.props.showLabel && 'rbc-label', this.props.isNow && 'rbc-now', !this.props.showLabel && available && 'rbc-available')
      }, this.props.showLabel && _react["default"].createElement("span", null, this.props.content)));
    }
  }]);

  return TimeSlot;
}(_react.Component);

exports["default"] = TimeSlot;

_defineProperty(TimeSlot, "propTypes", {
  backgroundWrapperComponent: _propTypes2.elementType,
  value: _propTypes["default"].instanceOf(Date).isRequired,
  isNow: _propTypes["default"].bool,
  showLabel: _propTypes["default"].bool,
  content: _propTypes["default"].string,
  culture: _propTypes["default"].string
});

_defineProperty(TimeSlot, "defaultProps", {
  isNow: false,
  showLabel: false,
  content: ''
});