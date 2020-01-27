"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _dates = _interopRequireDefault(require("./utils/dates"));

var _localizer = _interopRequireDefault(require("./localizer"));

var _constants = require("./utils/constants");

var _TimeGrid = _interopRequireDefault(require("./TimeGrid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Week = _react["default"].createClass({
  displayName: "Week",
  propTypes: _TimeGrid["default"].propTypes,
  getDefaultProps: function getDefaultProps() {
    return _TimeGrid["default"].defaultProps;
  },
  render: function render() {
    var date = this.props.date;

    var _Week$range = Week.range(date, this.props),
        start = _Week$range.start,
        end = _Week$range.end;

    return _react["default"].createElement(_TimeGrid["default"], _extends({}, this.props, {
      start: start,
      end: end,
      eventOffset: 15
    }));
  }
});

Week.navigate = function (date, action) {
  switch (action) {
    case _constants.navigate.PREVIOUS:
      return _dates["default"].add(date, -1, 'week');

    case _constants.navigate.NEXT:
      return _dates["default"].add(date, 1, 'week');

    default:
      return date;
  }
};

Week.range = function (date, _ref) {
  var culture = _ref.culture;

  var firstOfWeek = _localizer["default"].startOfWeek(culture);

  var start = _dates["default"].startOf(date, 'week', firstOfWeek);

  var end = _dates["default"].endOf(date, 'week', firstOfWeek);

  return {
    start: start,
    end: end
  };
};

var _default = Week;
exports["default"] = _default;