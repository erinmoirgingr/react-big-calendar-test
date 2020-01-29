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

var Week =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Week, _React$Component);

  function Week() {
    _classCallCheck(this, Week);

    return _possibleConstructorReturn(this, _getPrototypeOf(Week).apply(this, arguments));
  }

  _createClass(Week, [{
    key: "render",
    value: function render() {
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
  }]);

  return Week;
}(_react["default"].Component);

;
Week.propTypes = _TimeGrid["default"].propTypes;
Week.defaultProps = _TimeGrid["default"].defaultProps;

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