"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _TimeSlot = _interopRequireDefault(require("./TimeSlot"));

var _dates = _interopRequireDefault(require("./utils/dates.js"));

var _localizer = _interopRequireDefault(require("./localizer"));

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

var TimeSlotGroup =
/*#__PURE__*/
function (_Component) {
  _inherits(TimeSlotGroup, _Component);

  function TimeSlotGroup() {
    _classCallCheck(this, TimeSlotGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(TimeSlotGroup).apply(this, arguments));
  }

  _createClass(TimeSlotGroup, [{
    key: "renderSlice",
    value: function renderSlice(slotNumber, content, value) {
      return _react["default"].createElement(_TimeSlot["default"], {
        key: slotNumber,
        backgroundWrapperComponent: this.props.backgroundWrapperComponent,
        showLabel: this.props.showLabels && !slotNumber,
        content: content,
        culture: this.props.culture,
        isNow: this.props.isNow,
        pk: this.props.pk,
        leeSelectSlot: this.props.leeSelectSlot,
        value: value,
        availability: this.props.availability
      });
    }
  }, {
    key: "renderSlices",
    value: function renderSlices() {
      var ret = [];
      var sliceLength = this.props.step;
      var sliceValue = this.props.value;

      for (var i = 0; i < this.props.timeslots; i++) {
        var content = _localizer["default"].format(sliceValue, this.props.timeGutterFormat, this.props.culture);

        ret.push(this.renderSlice(i, content, sliceValue));
        sliceValue = _dates["default"].add(sliceValue, sliceLength, 'minutes');
      }

      return ret;
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: "rbc-timeslot-group"
      }, this.renderSlices());
    }
  }]);

  return TimeSlotGroup;
}(_react.Component);

exports["default"] = TimeSlotGroup;

_defineProperty(TimeSlotGroup, "propTypes", {
  backgroundWrapperComponent: _propTypes2.elementType,
  timeslots: _propTypes["default"].number.isRequired,
  step: _propTypes["default"].number.isRequired,
  value: _propTypes["default"].instanceOf(Date).isRequired,
  showLabels: _propTypes["default"].bool,
  isNow: _propTypes["default"].bool,
  timeGutterFormat: _propTypes["default"].string,
  culture: _propTypes["default"].string
});

_defineProperty(TimeSlotGroup, "defaultProps", {
  timeslots: 2,
  step: 30,
  isNow: false,
  showLabels: false
});