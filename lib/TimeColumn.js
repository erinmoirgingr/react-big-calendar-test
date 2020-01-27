"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _dates = _interopRequireDefault(require("./utils/dates"));

var _TimeSlotGroup = _interopRequireDefault(require("./TimeSlotGroup"));

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

var TimeColumn =
/*#__PURE__*/
function (_Component) {
  _inherits(TimeColumn, _Component);

  function TimeColumn() {
    _classCallCheck(this, TimeColumn);

    return _possibleConstructorReturn(this, _getPrototypeOf(TimeColumn).apply(this, arguments));
  }

  _createClass(TimeColumn, [{
    key: "renderTimeSliceGroup",
    value: function renderTimeSliceGroup(key, isNow, date) {
      return _react["default"].createElement(_TimeSlotGroup["default"], {
        backgroundWrapperComponent: this.props.components.backgroundWrapper,
        key: key,
        isNow: isNow,
        timeslots: this.props.timeslots,
        step: this.props.step,
        showLabels: this.props.showLabels,
        timeGutterFormat: this.props.timeGutterFormat,
        value: date,
        pk: this.props.pk,
        leeSelectSlot: this.props.leeSelectSlot,
        availability: this.props.availability
      });
    }
  }, {
    key: "render",
    value: function render() {
      var totalMin = _dates["default"].diff(this.props.min, this.props.max, 'minutes');

      var numGroups = Math.ceil(totalMin / (this.props.step * this.props.timeslots));
      var timeslots = [];
      var groupLengthInMinutes = this.props.step * this.props.timeslots;

      if (numGroups > 24) {
        numGroups = 24;
      }

      var date = this.props.min;
      var next = date;
      var isNow = false;

      if (this.props.view === 'day') {
        if (this.props.extraColumnSlots > 0) {
          for (var i = 0; i < this.props.extraColumnSlots; i++) {
            timeslots.push(_react["default"].createElement("div", {
              key: "time-gutter-extra-slot-" + i,
              className: (0, _classnames["default"])('rbc-time-slot specialist-time-slot' + (i === 0 ? ' rbc-day-column-pk-name' : ''))
            }, i === 0 ? 'Slots' : "\xA0"));
          }

          ;
        }

        timeslots.push(_react["default"].createElement("div", {
          key: "time-gutter-person",
          className: (0, _classnames["default"])('rbc-time-slot time-gutter-person')
        }, "\xA0"));
      }

      for (var i = 0; i < numGroups; i++) {
        isNow = _dates["default"].inRange(this.props.now, date, _dates["default"].add(next, groupLengthInMinutes - 1, 'minutes'), 'minutes');
        next = _dates["default"].add(date, groupLengthInMinutes, 'minutes');
        timeslots.push(this.renderTimeSliceGroup(i, isNow, date));
        date = next;
      }

      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(this.props.className, 'rbc-time-column'),
        style: this.props.style
      }, timeslots, this.props.children);
    }
  }]);

  return TimeColumn;
}(_react.Component);

exports["default"] = TimeColumn;

_defineProperty(TimeColumn, "propTypes", {
  step: _propTypes["default"].number.isRequired,
  timeslots: _propTypes["default"].number.isRequired,
  now: _propTypes["default"].instanceOf(Date).isRequired,
  min: _propTypes["default"].instanceOf(Date).isRequired,
  max: _propTypes["default"].instanceOf(Date).isRequired,
  showLabels: _propTypes["default"].bool,
  timeGutterFormat: _propTypes["default"].string,
  type: _propTypes["default"].string.isRequired,
  className: _propTypes["default"].string
});

_defineProperty(TimeColumn, "defaultProps", {
  step: 30,
  timeslots: 2,
  showLabels: false,
  type: 'day',
  className: ''
});