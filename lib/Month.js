"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _classnames = _interopRequireDefault(require("classnames"));

var _dates2 = _interopRequireDefault(require("./utils/dates"));

var _localizer = _interopRequireDefault(require("./localizer"));

var _lodash = _interopRequireDefault(require("lodash"));

var _constants = require("./utils/constants");

var _helpers = require("./utils/helpers");

var _height = _interopRequireDefault(require("dom-helpers/height"));

var _position2 = _interopRequireDefault(require("dom-helpers/position"));

var _animationFrame = require("dom-helpers/animationFrame");

var _EventRow = _interopRequireDefault(require("./EventRow"));

var _EventEndingRow = _interopRequireDefault(require("./EventEndingRow"));

var _Popup = _interopRequireDefault(require("./Popup"));

var _BackgroundCells = _interopRequireDefault(require("./BackgroundCells"));

var _propTypes2 = require("./utils/propTypes");

var _eventLevels2 = require("./utils/eventLevels");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var eventsForWeek = function eventsForWeek(evts, start, end, props) {
  return evts.filter(function (e) {
    return (0, _eventLevels2.inRange)(e, start, end, props);
  });
};

var isSegmentInSlot = function isSegmentInSlot(seg, slot) {
  return seg.left <= slot && seg.right >= slot;
};

var propTypes = _objectSpread({}, _EventRow["default"].PropTypes, {
  culture: _propTypes["default"].string,
  date: _propTypes["default"].instanceOf(Date),
  min: _propTypes["default"].instanceOf(Date),
  max: _propTypes["default"].instanceOf(Date),
  dateFormat: _propTypes2.dateFormat,
  weekdayFormat: _propTypes2.dateFormat,
  popup: _propTypes["default"].bool,
  popupOffset: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].shape({
    x: _propTypes["default"].number,
    y: _propTypes["default"].number
  })]),
  onSelectEvent: _propTypes["default"].func,
  onSelectSlot: _propTypes["default"].func
});

var MonthView = _react["default"].createClass({
  displayName: 'MonthView',
  propTypes: propTypes,
  getInitialState: function getInitialState() {
    return {
      rowLimit: 5,
      needLimitMeasure: true
    };
  },
  componentWillMount: function componentWillMount() {
    this._bgRows = [];
    this._pendingSelection = [];
  },
  componentWillReceiveProps: function componentWillReceiveProps(_ref) {
    var date = _ref.date;
    this.setState({
      needLimitMeasure: !_dates2["default"].eq(date, this.props.date)
    });
  },
  componentDidMount: function componentDidMount() {
    var _this = this;

    var running;
    if (this.state.needLimitMeasure) this._measureRowLimit(this.props);
    window.addEventListener('resize', this._resizeListener = function () {
      if (!running) {
        (0, _animationFrame.request)(function () {
          running = false;

          _this.setState({
            needLimitMeasure: true
          }); //eslint-disable-line

        });
      }
    }, false);
  },
  componentDidUpdate: function componentDidUpdate() {
    if (this.state.needLimitMeasure) this._measureRowLimit(this.props);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.removeEventListener('resize', this._resizeListener, false);
  },
  render: function render() {
    var _this2 = this;

    var _this$props = this.props,
        date = _this$props.date,
        culture = _this$props.culture,
        weekdayFormat = _this$props.weekdayFormat,
        month = _dates2["default"].visibleDays(date, culture),
        weeks = _lodash["default"].chunk(month, 7);

    var measure = this.state.needLimitMeasure;
    this._weekCount = weeks.length;

    var elementProps = _lodash["default"].omit(this.props, Object.keys(propTypes));

    return _react["default"].createElement("div", _extends({}, elementProps, {
      className: (0, _classnames["default"])('rbc-month-view', elementProps.className)
    }), _react["default"].createElement("div", {
      className: "rbc-row rbc-month-header"
    }, this._headers(weeks[0], weekdayFormat, culture)), weeks.map(function (week, idx) {
      return _this2.renderWeek(week, idx, measure && _this2._renderMeasureRows);
    }));
  },
  renderWeek: function renderWeek(week, weekIdx, content) {
    var _this3 = this;

    var _endOfRange = (0, _eventLevels2.endOfRange)(week),
        first = _endOfRange.first,
        last = _endOfRange.last;

    var columnPKs = this.props.columnPKs;
    var evts = eventsForWeek(this.props.events, week[0], week[week.length - 1], this.props);
    evts = _lodash["default"].filter(evts, function (event, i) {
      var p = '';

      if (typeof event.responsible_person !== 'undefined') {
        p = event.responsible_person;
      } else if (typeof event.pk !== 'undefined') {
        p = event.pk;
      }

      return p === '' || columnPKs.indexOf(p) > -1;
    });
    evts.sort(function (a, b) {
      return (0, _eventLevels2.sortEvents)(a, b, _this3.props);
    });
    var segments = evts = evts.map(function (evt) {
      return (0, _eventLevels2.eventSegments)(evt, first, last, _this3.props);
    });
    var limit = this.state.rowLimit - 1 || 1;

    var _eventLevels = (0, _eventLevels2.eventLevels)(segments, limit),
        levels = _eventLevels.levels,
        extra = _eventLevels.extra;

    content = content || function (lvls, wk) {
      return lvls.map(function (lvl, idx) {
        return _this3.renderRowLevel(lvl, wk, idx);
      });
    };

    return _react["default"].createElement("div", {
      key: 'week_' + weekIdx,
      className: "rbc-month-row",
      ref: !weekIdx && function (r) {
        return _this3._firstRow = r;
      }
    }, this.renderBackground(week, weekIdx), _react["default"].createElement("div", {
      className: "rbc-row-content"
    }, _react["default"].createElement("div", {
      className: "rbc-row",
      ref: !weekIdx && function (r) {
        return _this3._firstDateRow = r;
      }
    }, this._dates(week)), content(levels, week, weekIdx), !!extra.length && this.renderShowMore(segments, extra, week, weekIdx, levels.length)), this.props.popup && this._renderOverlay());
  },
  renderBackground: function renderBackground(row, idx) {
    var _this4 = this;

    var self = this;

    function onSelectSlot(_ref2) {
      var start = _ref2.start,
          end = _ref2.end;
      self._pendingSelection = self._pendingSelection.concat(row.slice(start, end + 1));
      clearTimeout(self._selectTimer);
      self._selectTimer = setTimeout(function () {
        return self._selectDates();
      });
    }

    return _react["default"].createElement(_BackgroundCells["default"], {
      backgroundWrapperComponent: this.props.components.backgroundWrapper,
      container: function container() {
        return (0, _reactDom.findDOMNode)(_this4);
      },
      selectable: this.props.selectable,
      slots: 7,
      values: row,
      type: "Day",
      ref: function ref(r) {
        return _this4._bgRows[idx] = r;
      },
      onSelectSlot: onSelectSlot
    });
  },
  renderRowLevel: function renderRowLevel(segments, week, idx) {
    var _endOfRange2 = (0, _eventLevels2.endOfRange)(week),
        first = _endOfRange2.first,
        last = _endOfRange2.last;

    return _react["default"].createElement(_EventRow["default"], _extends({}, this.props, {
      eventComponent: this.props.components.event,
      eventWrapperComponent: this.props.components.eventWrapper,
      onSelect: this._selectEvent,
      key: idx,
      segments: segments,
      start: first,
      end: last
    }));
  },
  renderShowMore: function renderShowMore(segments, extraSegments, week, weekIdx) {
    var _this5 = this;

    var _endOfRange3 = (0, _eventLevels2.endOfRange)(week),
        first = _endOfRange3.first,
        last = _endOfRange3.last;

    var onClick = function onClick(slot) {
      return _this5._showMore(segments, week[slot - 1], weekIdx, slot);
    };

    return _react["default"].createElement(_EventEndingRow["default"], _extends({}, this.props, {
      eventComponent: this.props.components.event,
      eventWrapperComponent: this.props.components.eventWrapper,
      onSelect: this._selectEvent,
      onShowMore: onClick,
      key: 'last_row_' + weekIdx,
      segments: extraSegments,
      start: first,
      end: last
    }));
  },
  _dates: function _dates(row) {
    var _this6 = this;

    return row.map(function (day, colIdx) {
      var offRange = _dates2["default"].month(day) !== _dates2["default"].month(_this6.props.date);

      return _react["default"].createElement("div", {
        key: 'header_' + colIdx,
        style: (0, _eventLevels2.segStyle)(1, 7),
        className: (0, _classnames["default"])('rbc-date-cell', {
          'rbc-off-range': offRange,
          'rbc-now': _dates2["default"].eq(day, new Date(), 'day'),
          'rbc-current': _dates2["default"].eq(day, _this6.props.date, 'day')
        })
      }, _react["default"].createElement("a", {
        href: "#",
        onClick: _this6._dateClick.bind(null, day)
      }, _localizer["default"].format(day, _this6.props.dateFormat, _this6.props.culture)));
    });
  },
  _headers: function _headers(row, format, culture) {
    var first = row[0];
    var last = row[row.length - 1];
    return _dates2["default"].range(first, last, 'day').map(function (day, idx) {
      return _react["default"].createElement("div", {
        key: 'header_' + idx,
        className: "rbc-header",
        style: (0, _eventLevels2.segStyle)(1, 7)
      }, _localizer["default"].format(day, format, culture));
    });
  },
  _renderMeasureRows: function _renderMeasureRows(levels, row, idx) {
    var _this7 = this;

    var first = idx === 0;
    return first ? _react["default"].createElement("div", {
      className: "rbc-row"
    }, _react["default"].createElement("div", {
      className: "rbc-row-segment",
      style: (0, _eventLevels2.segStyle)(1, 7)
    }, _react["default"].createElement("div", {
      ref: function ref(r) {
        return _this7._measureEvent = r;
      },
      className: (0, _classnames["default"])('rbc-event')
    }, _react["default"].createElement("div", {
      className: "rbc-event-content"
    }, "\xA0")))) : _react["default"].createElement("span", null);
  },
  _renderOverlay: function _renderOverlay() {
    var overlay = this.state && this.state.overlay || {};
    return _react["default"].createElement(_Popup["default"], _extends({}, this.props, {
      eventComponent: this.props.components.event,
      eventWrapperComponent: this.props.components.eventWrapper,
      position: overlay.position,
      events: overlay.events,
      slotStart: overlay.date,
      slotEnd: overlay.end,
      onSelect: this._selectEvent
    })) // <Overlay
    //   rootClose
    //   placement='bottom'
    //   container={this}
    //   show={!!overlay.position}
    //   onHide={() => this.setState({ overlay: null })}
    // >
    //
    // </Overlay>
    ;
  },
  _measureRowLimit: function _measureRowLimit() {
    var eventHeight = (0, _height["default"])(this._measureEvent);
    var labelHeight = (0, _height["default"])(this._firstDateRow);
    var eventSpace = (0, _height["default"])(this._firstRow) - labelHeight;
    this._needLimitMeasure = false;
    this.setState({
      needLimitMeasure: false,
      rowLimit: Math.max(Math.floor(eventSpace / eventHeight), 1)
    });
  },
  _dateClick: function _dateClick(date, e) {
    e.preventDefault();
    this.clearSelection();
    (0, _helpers.notify)(this.props.onNavigate, [_constants.navigate.DATE, date]);
  },
  _selectEvent: function _selectEvent() {
    //cancel any pending selections so only the event click goes through.
    this.clearSelection();

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    (0, _helpers.notify)(this.props.onSelectEvent, args);
  },
  _selectDates: function _selectDates() {
    var slots = this._pendingSelection.slice();

    this._pendingSelection = [];
    slots.sort(function (a, b) {
      return +a - +b;
    });
    (0, _helpers.notify)(this.props.onSelectSlot, {
      slots: slots,
      start: slots[0],
      end: slots[slots.length - 1]
    });
  },
  _showMore: function _showMore(segments, date, weekIdx, slot) {
    var cell = (0, _reactDom.findDOMNode)(this._bgRows[weekIdx]).children[slot - 1];
    var events = segments.filter(function (seg) {
      return isSegmentInSlot(seg, slot);
    }).map(function (seg) {
      return seg.event;
    }); //cancel any pending selections so only the event click goes through.

    this.clearSelection();

    if (this.props.popup) {
      var _position = _position(cell, (0, _reactDom.findDOMNode)(this));

      this.setState({
        overlay: {
          date: date,
          events: events,
          position: _position
        }
      });
    } else {
      (0, _helpers.notify)(this.props.onNavigate, [_constants.navigate.DATE, date]);
    }

    (0, _helpers.notify)(this.props.onShowMore, [events, date, slot]);
  },
  clearSelection: function clearSelection() {
    clearTimeout(this._selectTimer);
    this._pendingSelection = [];
  }
});

MonthView.navigate = function (date, action) {
  switch (action) {
    case _constants.navigate.PREVIOUS:
      return _dates2["default"].add(date, -1, 'month');

    case _constants.navigate.NEXT:
      return _dates2["default"].add(date, 1, 'month');

    default:
      return date;
  }
};

MonthView.range = function (date, _ref3) {
  var culture = _ref3.culture;

  var start = _dates2["default"].firstVisibleDay(date, culture);

  var end = _dates2["default"].lastVisibleDay(date, culture);

  return {
    start: start,
    end: end
  };
};

var _default = MonthView;
exports["default"] = _default;