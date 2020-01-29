"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactDom = require("react-dom");

var _dates = _interopRequireDefault(require("./utils/dates"));

var _localizer = _interopRequireDefault(require("./localizer"));

var _DayColumn = _interopRequireDefault(require("./DayColumn"));

var _EventRow = _interopRequireDefault(require("./EventRow"));

var _TimeColumn = _interopRequireDefault(require("./TimeColumn"));

var _BackgroundCells = _interopRequireDefault(require("./BackgroundCells"));

var _width = _interopRequireDefault(require("dom-helpers/width"));

var _scrollbarSize = _interopRequireDefault(require("dom-helpers/scrollbarSize"));

var _messages = _interopRequireDefault(require("./utils/messages"));

var _propTypes2 = require("./utils/propTypes");

var _helpers = require("./utils/helpers");

var _constants = require("./utils/constants");

var _accessors = require("./utils/accessors");

var _eventLevels2 = require("./utils/eventLevels");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MIN_ROWS = 2;

var TimeGrid =
/*#__PURE__*/
function (_Component) {
  _inherits(TimeGrid, _Component);

  function TimeGrid(props) {
    var _this;

    _classCallCheck(this, TimeGrid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TimeGrid).call(this, props));
    _this.state = {
      gutterWidth: undefined,
      isOverflowing: null
    };
    _this._selectEvent = _this._selectEvent.bind(_assertThisInitialized(_this));
    _this._headerClick = _this._headerClick.bind(_assertThisInitialized(_this));
    _this._gutters = [];
    _this.refElems = {
      content: (0, _react.createRef)(),
      allDay: (0, _react.createRef)(),
      headerCell: (0, _react.createRef)()
    };
    return _this;
  }

  _createClass(TimeGrid, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.checkOverflow();

      if (this.props.width == null) {
        this.measureGutter();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.props.width == null && !this.state.gutterWidth) {
        this.measureGutter();
      } //this.checkOverflow()

    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          events = _this$props.events,
          start = _this$props.start,
          end = _this$props.end,
          width = _this$props.width,
          startAccessor = _this$props.startAccessor,
          endAccessor = _this$props.endAccessor,
          allDayAccessor = _this$props.allDayAccessor;
      width = width || this.state.gutterWidth;

      var range = _dates["default"].range(start, end, 'day');

      this._slots = range.length;
      var allDayEvents = [],
          rangeEvents = [];
      events.forEach(function (event) {
        if ((0, _eventLevels2.inRange)(event, start, end, _this2.props)) {
          var eStart = (0, _accessors.accessor)(event, startAccessor),
              eEnd = (0, _accessors.accessor)(event, endAccessor);

          if ((0, _accessors.accessor)(event, allDayAccessor) || !_dates["default"].eq(eStart, eEnd, 'day') || _dates["default"].isJustDate(eStart) && _dates["default"].isJustDate(eEnd)) {
            allDayEvents.push(event);
          } else rangeEvents.push(event);
        }
      });
      allDayEvents.sort(function (a, b) {
        return (0, _eventLevels2.sortEvents)(a, b, _this2.props);
      });

      var _endOfRange = (0, _eventLevels2.endOfRange)(range),
          first = _endOfRange.first,
          last = _endOfRange.last;

      var segments = allDayEvents.map(function (evt) {
        return (0, _eventLevels2.eventSegments)(evt, first, last, _this2.props);
      });

      var gutterRef = function gutterRef(ref) {
        return _this2._gutters[1] = ref && (0, _reactDom.findDOMNode)(ref);
      };

      return _react["default"].createElement("div", {
        className: "rbc-time-view"
      }, this.renderHeader(range, segments, width), _react["default"].createElement("div", {
        ref: this.refElems.content,
        className: "rbc-time-content"
      }, _react["default"].createElement(_TimeColumn["default"], _extends({}, this.props, {
        showLabels: true,
        style: {
          width: width
        },
        ref: gutterRef,
        className: "rbc-time-gutter"
      })), this.renderEvents(range, rangeEvents, this.props.now)));
    }
  }, {
    key: "renderEvents",
    value: function renderEvents(range, events, today) {
      var _this3 = this;

      var _this$props2 = this.props,
          min = _this$props2.min,
          max = _this$props2.max,
          endAccessor = _this$props2.endAccessor,
          startAccessor = _this$props2.startAccessor,
          components = _this$props2.components;
      return range.map(function (date, idx) {
        var daysEvents = events.filter(function (event) {
          return _dates["default"].inRange(date, (0, _accessors.accessor)(event, startAccessor), (0, _accessors.accessor)(event, endAccessor), 'day');
        });
        return _react["default"].createElement(_DayColumn["default"], _extends({}, _this3.props, {
          min: _dates["default"].merge(date, min),
          max: _dates["default"].merge(date, max),
          eventComponent: components.event,
          eventWrapperComponent: components.eventWrapper,
          backgroundWrapperComponent: components.backgroundWrapper,
          className: (0, _classnames["default"])({
            'rbc-now': _dates["default"].eq(date, today, 'day')
          }),
          style: (0, _eventLevels2.segStyle)(1, _this3._slots),
          key: idx,
          date: date,
          events: daysEvents
        }));
      });
    }
  }, {
    key: "renderAllDayEvents",
    value: function renderAllDayEvents(range, levels) {
      var _this4 = this;

      var _endOfRange2 = (0, _eventLevels2.endOfRange)(range),
          first = _endOfRange2.first,
          last = _endOfRange2.last;

      while (levels.length < MIN_ROWS) {
        levels.push([]);
      }

      return levels.map(function (segs, idx) {
        return _react["default"].createElement(_EventRow["default"], {
          eventComponent: _this4.props.components.event,
          eventWrapperComponent: _this4.props.components.eventWrapper,
          titleAccessor: _this4.props.titleAccessor,
          startAccessor: _this4.props.startAccessor,
          endAccessor: _this4.props.endAccessor,
          allDayAccessor: _this4.props.allDayAccessor,
          eventPropGetter: _this4.props.eventPropGetter,
          onSelect: _this4._selectEvent,
          slots: _this4._slots,
          key: idx,
          segments: segs,
          start: first,
          end: last
        });
      });
    }
  }, {
    key: "renderHeader",
    value: function renderHeader(range, segments, width) {
      var _this5 = this;

      var _this$props3 = this.props,
          messages = _this$props3.messages,
          rtl = _this$props3.rtl;

      var _ref = this.state || {},
          isOverflowing = _ref.isOverflowing;

      var _eventLevels = (0, _eventLevels2.eventLevels)(segments),
          levels = _eventLevels.levels;

      var style = {};
      if (isOverflowing) style[rtl ? 'marginLeft' : 'marginRight'] = (0, _scrollbarSize["default"])() + 'px';
      return _react["default"].createElement("div", {
        ref: this.refElems.headerCell,
        className: (0, _classnames["default"])('rbc-time-header', isOverflowing && 'rbc-overflowing'),
        style: style
      }, _react["default"].createElement("div", {
        className: "rbc-row"
      }, _react["default"].createElement("div", {
        className: "rbc-label rbc-header-gutter",
        style: {
          width: width
        }
      }), this.renderHeaderCells(range)), _react["default"].createElement("div", {
        className: "rbc-row"
      }, _react["default"].createElement("div", {
        ref: function ref(_ref2) {
          return _this5._gutters[0] = _ref2;
        },
        className: "rbc-label rbc-header-gutter",
        style: {
          width: width
        }
      }, (0, _messages["default"])(messages).allDay), _react["default"].createElement("div", {
        ref: this.refElems.allDay,
        className: "rbc-allday-cell"
      }, _react["default"].createElement(_BackgroundCells["default"], {
        backgroundWrapperComponent: this.props.components.backgroundWrapper,
        slots: range.length,
        values: range,
        type: "AllDay",
        container: function container() {
          return _this5.refElems.allDay.current;
        },
        selectable: this.props.selectable
      }), _react["default"].createElement("div", {
        className: "rbc-allday-events"
      }, this.renderAllDayEvents(range, levels)))));
    }
  }, {
    key: "renderHeaderCells",
    value: function renderHeaderCells(range) {
      var _this6 = this;

      var _this$props4 = this.props,
          dayFormat = _this$props4.dayFormat,
          culture = _this$props4.culture;
      return range.map(function (date, i) {
        return _react["default"].createElement("div", {
          key: i,
          className: "rbc-header",
          style: (0, _eventLevels2.segStyle)(1, _this6._slots)
        }, _react["default"].createElement("a", {
          href: "#",
          onClick: _this6._headerClick.bind(null, date)
        }, _localizer["default"].format(date, dayFormat, culture)));
      });
    }
  }, {
    key: "_headerClick",
    value: function _headerClick(date, e) {
      e.preventDefault();
      (0, _helpers.notify)(this.props.onNavigate, [_constants.navigate.DATE, date]);
    }
  }, {
    key: "_selectEvent",
    value: function _selectEvent() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (0, _helpers.notify)(this.props.onSelectEvent, args);
    }
  }, {
    key: "measureGutter",
    value: function measureGutter() {
      var width = this.state.gutterWidth;
      var gutterCells = this._gutters;

      if (!width) {
        width = Math.max.apply(Math, _toConsumableArray(gutterCells.map(function (node) {
          return node.clientWidth;
        })));

        if (width) {
          this.setState({
            gutterWidth: width
          });
        }
      }
    }
  }, {
    key: "checkOverflow",
    value: function checkOverflow() {
      var _this7 = this;

      if (this._updatingOverflow) return;
      var isOverflowing = this.refElems.content.current.scrollHeight > this.refElems.content.current.clientHeight;

      if (this.setState.isOverflowing !== isOverflowing) {
        this._updatingOverflow = true;
        this.setState({
          isOverflowing: isOverflowing
        }, function () {
          _this7._updatingOverflow = false;
        });
      }
    }
  }]);

  return TimeGrid;
}(_react.Component);

exports["default"] = TimeGrid;

_defineProperty(TimeGrid, "propTypes", _objectSpread({}, _DayColumn["default"].propTypes, {}, _TimeColumn["default"].propTypes, {
  step: _propTypes["default"].number,
  min: _propTypes["default"].instanceOf(Date),
  max: _propTypes["default"].instanceOf(Date),
  dayFormat: _propTypes2.dateFormat,
  rtl: _propTypes["default"].bool
}));

_defineProperty(TimeGrid, "defaultProps", _objectSpread({}, _DayColumn["default"].defaultProps, {}, _TimeColumn["default"].defaultProps, {
  step: 30,
  min: _dates["default"].startOf(new Date(), 'day'),
  max: _dates["default"].endOf(new Date(), 'day'),

  /* these 2 are needed to satisfy requirements from TimeColumn required props
   * There is a strange bug in React, using ...TimeColumn.defaultProps causes weird crashes
   */
  type: 'gutter',
  now: new Date()
}));