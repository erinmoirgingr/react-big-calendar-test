"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _dates = _interopRequireDefault(require("./utils/dates"));

var _TimeGrid = _interopRequireDefault(require("./TimeGrid"));

var _constants = require("./utils/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Day = _react["default"].createClass({
  displayName: "Day",
  propTypes: _TimeGrid["default"].propTypes,
  getDefaultProps: function getDefaultProps() {
    return _TimeGrid["default"].defaultProps;
  },
  render: function render() {
    var date = this.props.date;

    var _Day$range = Day.range(date),
        start = _Day$range.start,
        end = _Day$range.end;

    return _react["default"].createElement(_TimeGrid["default"], _extends({}, this.props, {
      start: start,
      end: end,
      eventOffset: 10
    }));
  }
});

Day.navigate = function (date, action) {
  switch (action) {
    case _constants.navigate.PREVIOUS:
      return _dates["default"].add(date, -1, 'day');

    case _constants.navigate.NEXT:
      return _dates["default"].add(date, 1, 'day');

    default:
      return date;
  }
};

Day.range = function (date) {
  date = _dates["default"].startOf(date, 'day');
  return {
    start: date,
    end: date
  };
};

var _default = Day;
exports["default"] = _default;