"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _messages = _interopRequireDefault(require("./utils/messages"));

var _localizer = _interopRequireDefault(require("./localizer"));

var _dates = _interopRequireDefault(require("./utils/dates"));

var _constants = require("./utils/constants");

var _accessors = require("./utils/accessors");

var _addClass = _interopRequireDefault(require("dom-helpers/addClass"));

var _removeClass = _interopRequireDefault(require("dom-helpers/removeClass"));

var _width = _interopRequireDefault(require("dom-helpers/width"));

var _scrollbarSize = _interopRequireDefault(require("dom-helpers/scrollbarSize"));

var _eventLevels = require("./utils/eventLevels");

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

var Agenda =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Agenda, _React$Component);

  function Agenda(props) {
    var _this;

    _classCallCheck(this, Agenda);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Agenda).call(this, props));
    var fields = ["header", "dateCol", "timeCol", "content", "tbody"];
    _this.refElems = {};
    fields.forEach(function (field) {
      return _this.refElems[field] = _react["default"].createRef();
    });
    return _this;
  }

  _createClass(Agenda, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._adjustHeader();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._adjustHeader();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          length = _this$props.length,
          date = _this$props.date,
          events = _this$props.events,
          startAccessor = _this$props.startAccessor;
      var messages = (0, _messages["default"])(this.props.messages);

      var end = _dates["default"].add(date, length, 'day');

      var range = _dates["default"].range(date, end, 'day');

      events = events.filter(function (event) {
        return (0, _eventLevels.inRange)(event, date, end, _this2.props);
      });
      events.sort(function (a, b) {
        return +(0, _accessors.accessor)(a, startAccessor) - +(0, _accessors.accessor)(b, startAccessor);
      });
      return _react["default"].createElement("div", {
        className: "rbc-agenda-view"
      }, _react["default"].createElement("table", {
        ref: this.refElems.header
      }, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
        className: "rbc-header",
        ref: this.refElems.dateCol
      }, messages.date), _react["default"].createElement("th", {
        className: "rbc-header",
        ref: this.refElems.timeCol
      }, messages.time), _react["default"].createElement("th", {
        className: "rbc-header"
      }, messages.event)))), _react["default"].createElement("div", {
        className: "rbc-agenda-content",
        ref: this.refElems.content
      }, _react["default"].createElement("table", null, _react["default"].createElement("tbody", {
        ref: this.refElems.tbody
      }, range.map(function (day, idx) {
        return _this2.renderDay(day, events, idx);
      })))));
    }
  }, {
    key: "renderDay",
    value: function renderDay(day, events, dayKey) {
      var _this3 = this;

      var _this$props2 = this.props,
          culture = _this$props2.culture,
          components = _this$props2.components,
          titleAccessor = _this$props2.titleAccessor,
          agendaDateFormat = _this$props2.agendaDateFormat;
      var EventComponent = components.event;
      var DateComponent = components.date;
      events = events.filter(function (e) {
        return (0, _eventLevels.inRange)(e, day, day, _this3.props);
      });
      return events.map(function (event, idx) {
        var dateLabel = idx === 0 && _localizer["default"].format(day, agendaDateFormat, culture);

        var first = idx === 0 ? _react["default"].createElement("td", {
          rowSpan: events.length,
          className: "rbc-agenda-date-cell"
        }, DateComponent ? _react["default"].createElement(DateComponent, {
          day: day,
          label: dateLabel
        }) : dateLabel) : false;
        var title = (0, _accessors.accessor)(event, titleAccessor);
        return _react["default"].createElement("tr", {
          key: dayKey + '_' + idx
        }, first, _react["default"].createElement("td", {
          className: "rbc-agenda-time-cell"
        }, _this3.timeRangeLabel(day, event)), _react["default"].createElement("td", {
          className: "rbc-agenda-event-cell"
        }, EventComponent ? _react["default"].createElement(EventComponent, {
          event: event,
          title: title
        }) : title));
      }, []);
    }
  }, {
    key: "timeRangeLabel",
    value: function timeRangeLabel(day, event) {
      var _this$props3 = this.props,
          endAccessor = _this$props3.endAccessor,
          startAccessor = _this$props3.startAccessor,
          allDayAccessor = _this$props3.allDayAccessor,
          culture = _this$props3.culture,
          messages = _this$props3.messages,
          components = _this$props3.components;
      var labelClass = '',
          TimeComponent = components.time,
          label = (0, _messages["default"])(messages).allDay;
      var start = (0, _accessors.accessor)(event, startAccessor);
      var end = (0, _accessors.accessor)(event, endAccessor);

      if (!(0, _accessors.accessor)(event, allDayAccessor)) {
        if (_dates["default"].eq(start, end, 'day')) {
          label = _localizer["default"].format({
            start: start,
            end: end
          }, this.props.agendaTimeRangeFormat, culture);
        } else if (_dates["default"].eq(day, start, 'day')) {
          label = _localizer["default"].format(start, this.props.agendaTimeFormat, culture);
        } else if (_dates["default"].eq(day, end, 'day')) {
          label = _localizer["default"].format(start, this.props.agendaTimeFormat, culture);
        }
      }

      if (_dates["default"].gt(day, start, 'day')) labelClass = 'rbc-continues-prior';
      if (_dates["default"].lt(day, end, 'day')) labelClass += ' rbc-continues-after';
      return _react["default"].createElement("span", {
        className: labelClass.trim()
      }, TimeComponent ? _react["default"].createElement(TimeComponent, {
        event: event,
        label: label
      }) : label);
    }
  }, {
    key: "_adjustHeader",
    value: function _adjustHeader() {
      var header = this.refElems.header.current;
      var firstRow = this.refElems.tbody.current.firstChild;
      if (!firstRow) return;
      var isOverflowing = this.refElems.content.current.scrollHeight > this.refElems.content.current.clientHeight;
      var widths = this._widths || [];
      this._widths = [(0, _width["default"])(firstRow.children[0]), (0, _width["default"])(firstRow.children[1])];

      if (widths[0] !== this._widths[0] || widths[1] !== this._widths[1]) {
        this.refElems.dateCol.current.style.width = this._widths[0] + 'px';
        this.refElems.timeCol.current.style.width = this._widths[1] + 'px';
      }

      if (isOverflowing) {
        (0, _addClass["default"])(header, 'rbc-header-overflowing');
        header.style.marginRight = (0, _scrollbarSize["default"])() + 'px';
      } else {
        (0, _removeClass["default"])(header, 'rbc-header-overflowing');
      }
    }
  }]);

  return Agenda;
}(_react["default"].Component);

Agenda.propTypes = {
  messages: _propTypes["default"].shape({
    date: _propTypes["default"].string,
    time: _propTypes["default"].string,
    event: _propTypes["default"].string
  })
};
Agenda.defaultProps = {
  length: 30
};

Agenda.navigate = function (date, action) {
  switch (action) {
    case _constants.navigate.PREVIOUS:
      return _dates["default"].add(date, -1, 'day');

    case _constants.navigate.NEXT:
      return _dates["default"].add(date, 1, 'day');

    default:
      return date;
  }
};

Agenda.range = function (start, _ref) {
  var _ref$length = _ref.length,
      length = _ref$length === void 0 ? Agenda.defaultProps.length : _ref$length;

  var end = _dates["default"].add(start, length, 'day');

  return {
    start: start,
    end: end
  };
};

var _default = Agenda;
exports["default"] = _default;