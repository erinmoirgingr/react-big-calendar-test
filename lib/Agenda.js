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

var Agenda = _react["default"].createClass({
  displayName: "Agenda",
  propTypes: {
    messages: _propTypes["default"].shape({
      date: _propTypes["default"].string,
      time: _propTypes["default"].string,
      event: _propTypes["default"].string
    })
  },
  getDefaultProps: function getDefaultProps() {
    return {
      length: 30
    };
  },
  componentDidMount: function componentDidMount() {
    this._adjustHeader();
  },
  componentDidUpdate: function componentDidUpdate() {
    this._adjustHeader();
  },
  render: function render() {
    var _this = this;

    var _this$props = this.props,
        length = _this$props.length,
        date = _this$props.date,
        events = _this$props.events,
        startAccessor = _this$props.startAccessor;
    var messages = (0, _messages["default"])(this.props.messages);

    var end = _dates["default"].add(date, length, 'day');

    var range = _dates["default"].range(date, end, 'day');

    events = events.filter(function (event) {
      return (0, _eventLevels.inRange)(event, date, end, _this.props);
    });
    events.sort(function (a, b) {
      return +(0, _accessors.accessor)(a, startAccessor) - +(0, _accessors.accessor)(b, startAccessor);
    });
    return _react["default"].createElement("div", {
      className: "rbc-agenda-view"
    }, _react["default"].createElement("table", {
      ref: "header"
    }, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", {
      className: "rbc-header",
      ref: "dateCol"
    }, messages.date), _react["default"].createElement("th", {
      className: "rbc-header",
      ref: "timeCol"
    }, messages.time), _react["default"].createElement("th", {
      className: "rbc-header"
    }, messages.event)))), _react["default"].createElement("div", {
      className: "rbc-agenda-content",
      ref: "content"
    }, _react["default"].createElement("table", null, _react["default"].createElement("tbody", {
      ref: "tbody"
    }, range.map(function (day, idx) {
      return _this.renderDay(day, events, idx);
    })))));
  },
  renderDay: function renderDay(day, events, dayKey) {
    var _this2 = this;

    var _this$props2 = this.props,
        culture = _this$props2.culture,
        components = _this$props2.components,
        titleAccessor = _this$props2.titleAccessor,
        agendaDateFormat = _this$props2.agendaDateFormat;
    var EventComponent = components.event;
    var DateComponent = components.date;
    events = events.filter(function (e) {
      return (0, _eventLevels.inRange)(e, day, day, _this2.props);
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
      }, _this2.timeRangeLabel(day, event)), _react["default"].createElement("td", {
        className: "rbc-agenda-event-cell"
      }, EventComponent ? _react["default"].createElement(EventComponent, {
        event: event,
        title: title
      }) : title));
    }, []);
  },
  timeRangeLabel: function timeRangeLabel(day, event) {
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
  },
  _adjustHeader: function _adjustHeader() {
    var header = this.refs.header;
    var firstRow = this.refs.tbody.firstChild;
    if (!firstRow) return;
    var isOverflowing = this.refs.content.scrollHeight > this.refs.content.clientHeight;
    var widths = this._widths || [];
    this._widths = [(0, _width["default"])(firstRow.children[0]), (0, _width["default"])(firstRow.children[1])];

    if (widths[0] !== this._widths[0] || widths[1] !== this._widths[1]) {
      this.refs.dateCol.style.width = this._widths[0] + 'px';
      this.refs.timeCol.style.width = this._widths[1] + 'px';
    }

    if (isOverflowing) {
      (0, _addClass["default"])(header, 'rbc-header-overflowing');
      header.style.marginRight = (0, _scrollbarSize["default"])() + 'px';
    } else {
      (0, _removeClass["default"])(header, 'rbc-header-overflowing');
    }
  }
});

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