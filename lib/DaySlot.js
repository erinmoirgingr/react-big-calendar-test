"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _Selection = _interopRequireWildcard(require("./Selection"));

var _classnames = _interopRequireDefault(require("classnames"));

var _dates = _interopRequireDefault(require("./utils/dates"));

var _selection = require("./utils/selection");

var _localizer = _interopRequireDefault(require("./localizer"));

var _helpers = require("./utils/helpers");

var _propTypes2 = require("./utils/propTypes");

var _accessors = require("./utils/accessors");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function snapToSlot(date, step) {
  var roundTo = 1000 * 60 * step;
  return new Date(Math.floor(date.getTime() / roundTo) * roundTo);
}

function positionFromDate(date, min, step) {
  return _dates["default"].diff(min, _dates["default"].merge(min, date), 'minutes');
}

function overlaps(event, events, _ref, last) {
  var startAccessor = _ref.startAccessor,
      endAccessor = _ref.endAccessor;
  var eStart = (0, _accessors.accessor)(event, startAccessor);
  var offset = last;

  function overlap(eventB) {
    return _dates["default"].lt(eStart, (0, _accessors.accessor)(eventB, endAccessor));
  }

  if (!events.length) return last - 1;
  events.reverse().some(function (prevEvent) {
    if (overlap(prevEvent)) return true;
    offset = offset - 1;
  });
  return offset;
}

var DaySlot =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DaySlot, _React$Component);

  function DaySlot(props) {
    var _this;

    _classCallCheck(this, DaySlot);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DaySlot).call(this, props));
    _this.state = {
      selecting: false
    };
    return _this;
  }

  _createClass(DaySlot, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.selectable && this._selectable();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._teardownSelectable();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.selectable && !this.props.selectable) this._selectable();
      if (!nextProps.selectable && this.props.selectable) this._teardownSelectable();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          min = _this$props.min,
          max = _this$props.max,
          step = _this$props.step,
          start = _this$props.start,
          end = _this$props.end,
          selectRangeFormat = _this$props.selectRangeFormat,
          culture = _this$props.culture,
          props = _objectWithoutProperties(_this$props, ["min", "max", "step", "start", "end", "selectRangeFormat", "culture"]);

      var totalMin = _dates["default"].diff(min, max, 'minutes');

      var numSlots = Math.ceil(totalMin / step);
      var children = [];

      for (var i = 0; i < numSlots; i++) {
        children.push(_react["default"].createElement("div", {
          key: i,
          className: "rbc-time-slot"
        }));
      }

      this._totalMin = totalMin;

      var _this$state = this.state,
          selecting = _this$state.selecting,
          startSlot = _this$state.startSlot,
          endSlot = _this$state.endSlot,
          style = this._slotStyle(startSlot, endSlot, 0);

      var selectDates = {
        start: this.state.startDate,
        end: this.state.endDate
      };
      return _react["default"].createElement("div", _extends({}, props, {
        className: (0, _classnames["default"])('rbc-day-slot', props.className)
      }), children, this.renderEvents(numSlots, totalMin), selecting && _react["default"].createElement("div", {
        className: "rbc-slot-selection",
        style: style
      }, _react["default"].createElement("span", null, _localizer["default"].format(selectDates, selectRangeFormat, culture))));
    }
  }, {
    key: "renderEvents",
    value: function renderEvents(numSlots, totalMin) {
      var _this2 = this;

      var _this$props2 = this.props,
          events = _this$props2.events,
          step = _this$props2.step,
          min = _this$props2.min,
          culture = _this$props2.culture,
          eventPropGetter = _this$props2.eventPropGetter,
          selected = _this$props2.selected,
          eventTimeRangeFormat = _this$props2.eventTimeRangeFormat,
          eventComponent = _this$props2.eventComponent,
          startAccessor = _this$props2.startAccessor,
          endAccessor = _this$props2.endAccessor,
          titleAccessor = _this$props2.titleAccessor;
      var EventComponent = eventComponent,
          lastLeftOffset = 0;
      events.sort(function (a, b) {
        return +(0, _accessors.accessor)(a, startAccessor) - +(0, _accessors.accessor)(b, startAccessor);
      });
      return _.filter(events, {
        isSlots: false
      }).map(function (event, idx) {
        var start = (0, _accessors.accessor)(event, startAccessor);
        var end = (0, _accessors.accessor)(event, endAccessor);
        var startSlot = positionFromDate(start, min, step);
        var endSlot = positionFromDate(end, min, step);
        lastLeftOffset = Math.max(0, overlaps(event, events.slice(0, idx), _this2.props, lastLeftOffset + 1));

        var style = _this2._slotStyle(startSlot, endSlot, lastLeftOffset);

        var title = (0, _accessors.accessor)(event, titleAccessor);

        var label = _localizer["default"].format({
          start: start,
          end: end
        }, eventTimeRangeFormat, culture);

        var _isSelected = (0, _selection.isSelected)(event, selected);

        if (eventPropGetter) var _eventPropGetter = eventPropGetter(event, start, end, _isSelected),
            xStyle = _eventPropGetter.style,
            className = _eventPropGetter.className;
        return _react["default"].createElement("div", {
          key: 'evt_' + idx,
          style: _objectSpread({}, xStyle, {}, style),
          title: label + ': ' + title.replace(/<\/?[^>]+(>|$)/g, ""),
          onClick: _this2._select.bind(null, event),
          className: (0, _classnames["default"])('rbc-event', className, {
            'rbc-selected': _isSelected,
            'rbc-event-overlaps': lastLeftOffset !== 0
          })
        }, _react["default"].createElement("div", {
          className: "rbc-event-label"
        }, label), _react["default"].createElement("div", {
          className: "rbc-event-content"
        }, EventComponent ? _react["default"].createElement(EventComponent, {
          event: event,
          title: title.replace(/<\/?[^>]+(>|$)/g, "")
        }) : _react["default"].createElement("div", {
          dangerouslySetInnerHTML: {
            __html: title
          }
        })));
      });
    }
  }, {
    key: "_slotStyle",
    value: function _slotStyle(startSlot, endSlot, leftOffset) {
      var _ref2;

      endSlot = Math.max(endSlot, startSlot + this.props.step); //must be at least one `step` high

      var eventOffset = this.props.eventOffset || 10,
          isRtl = this.props.rtl;
      var top = startSlot / this._totalMin * 100;
      var bottom = endSlot / this._totalMin * 100;
      var per = leftOffset === 0 ? 0 : leftOffset * eventOffset;
      var rightDiff = eventOffset / (leftOffset + 1);
      return _ref2 = {
        top: top + '%',
        height: bottom - top + '%'
      }, _defineProperty(_ref2, isRtl ? 'right' : 'left', per + '%'), _defineProperty(_ref2, "width", (leftOffset === 0 ? 100 - eventOffset : 100 - per - rightDiff) + '%'), _ref2;
    }
  }, {
    key: "_selectable",
    value: function _selectable() {
      var _this3 = this;

      var node = (0, _reactDom.findDOMNode)(this);
      var selector = this._selector = new _Selection["default"](function () {
        return (0, _reactDom.findDOMNode)(_this3);
      });

      var selectionState = function selectionState(_ref3) {
        var x = _ref3.x,
            y = _ref3.y;
        var _this3$props = _this3.props,
            step = _this3$props.step,
            min = _this3$props.min,
            max = _this3$props.max;

        var _getBoundsForNode = (0, _Selection.getBoundsForNode)(node),
            top = _getBoundsForNode.top,
            bottom = _getBoundsForNode.bottom;

        var mins = _this3._totalMin;
        var range = Math.abs(top - bottom);
        var current = (y - top) / range;
        current = snapToSlot(minToDate(mins * current, min), step);
        if (!_this3.state.selecting) _this3._initialDateSlot = current;
        var initial = _this3._initialDateSlot;
        if (_dates["default"].eq(initial, current, 'minutes')) current = _dates["default"].add(current, step, 'minutes');

        var start = _dates["default"].max(min, _dates["default"].min(initial, current));

        var end = _dates["default"].min(max, _dates["default"].max(initial, current));

        return {
          selecting: true,
          startDate: start,
          endDate: end,
          startSlot: positionFromDate(start, min, step),
          endSlot: positionFromDate(end, min, step)
        };
      };

      selector.on('selecting', function (box) {
        return _this3.setState(selectionState(box));
      });
      selector.on('selectStart', function (box) {
        return _this3.setState(selectionState(box));
      });
      selector.on('click', function (_ref4) {
        var x = _ref4.x,
            y = _ref4.y;
        _this3._clickTimer = setTimeout(function () {
          _this3._selectSlot(selectionState({
            x: x,
            y: y
          }));
        });

        _this3.setState({
          selecting: false
        });
      });
      selector.on('select', function () {
        _this3._selectSlot(_this3.state);

        _this3.setState({
          selecting: false
        });
      });
    }
  }, {
    key: "_teardownSelectable",
    value: function _teardownSelectable() {
      if (!this._selector) return;

      this._selector.teardown();

      this._selector = null;
    }
  }, {
    key: "_selectSlot",
    value: function _selectSlot(_ref5) {
      var startDate = _ref5.startDate,
          endDate = _ref5.endDate,
          endSlot = _ref5.endSlot,
          startSlot = _ref5.startSlot;
      var current = startDate,
          slots = [];

      while (_dates["default"].lte(current, endDate)) {
        slots.push(current);
        current = _dates["default"].add(current, this.props.step, 'minutes');
      }

      (0, _helpers.notify)(this.props.onSelectSlot, {
        slots: slots,
        start: startDate,
        end: endDate
      });
    }
  }, {
    key: "_select",
    value: function _select(event) {
      clearTimeout(this._clickTimer);
      (0, _helpers.notify)(this.props.onSelectEvent, event);
    }
  }]);

  return DaySlot;
}(_react["default"].Component);

;
DaySlot.propTypes = {
  events: _propTypes["default"].array.isRequired,
  step: _propTypes["default"].number.isRequired,
  min: _propTypes["default"].instanceOf(Date).isRequired,
  max: _propTypes["default"].instanceOf(Date).isRequired,
  allDayAccessor: _propTypes2.accessor.isRequired,
  startAccessor: _propTypes2.accessor.isRequired,
  endAccessor: _propTypes2.accessor.isRequired,
  selectable: _propTypes["default"].bool,
  eventOffset: _propTypes["default"].number,
  onSelectSlot: _propTypes["default"].func.isRequired,
  onSelectEvent: _propTypes["default"].func.isRequired
};

function minToDate(min, date) {
  var dt = new Date(date),
      totalMins = _dates["default"].diff(_dates["default"].startOf(date, 'day'), date, 'minutes');

  dt = _dates["default"].hours(dt, 0);
  dt = _dates["default"].minutes(dt, totalMins + min);
  dt = _dates["default"].seconds(dt, 0);
  return _dates["default"].milliseconds(dt, 0);
}

var _default = DaySlot;
exports["default"] = _default;