"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _classnames = _interopRequireDefault(require("classnames"));

var _Selection = _interopRequireWildcard(require("./Selection"));

var _dates = _interopRequireDefault(require("./utils/dates"));

var _selection = require("./utils/selection");

var _localizer = _interopRequireDefault(require("./localizer"));

var _helpers = require("./utils/helpers");

var _propTypes2 = require("./utils/propTypes");

var _accessors = require("./utils/accessors");

var _dayViewLayout = _interopRequireWildcard(require("./utils/dayViewLayout"));

var _TimeColumn = _interopRequireDefault(require("./TimeColumn"));

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

<<<<<<< HEAD
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

=======
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

>>>>>>> 11be8754aec782b3a0b8b83d1043ea89eabd9537
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function snapToSlot(date, step) {
  var roundTo = 1000 * 60 * step;
  return new Date(Math.floor(date.getTime() / roundTo) * roundTo);
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
<<<<<<< HEAD
    _this._select = _this._select.bind(_assertThisInitialized(_this));
=======
>>>>>>> 11be8754aec782b3a0b8b83d1043ea89eabd9537
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
          timeslots = _this$props.timeslots,
          now = _this$props.now,
          selectRangeFormat = _this$props.selectRangeFormat,
          culture = _this$props.culture,
          props = _objectWithoutProperties(_this$props, ["min", "max", "step", "timeslots", "now", "selectRangeFormat", "culture"]);

      this._totalMin = _dates["default"].diff(min, max, 'minutes');

      var _this$state = this.state,
          selecting = _this$state.selecting,
          startSlot = _this$state.startSlot,
          endSlot = _this$state.endSlot,
          style = this._slotStyle(startSlot, endSlot);

      var selectDates = {
        start: this.state.startDate,
        end: this.state.endDate
      };
      var self = this;

      if (this.props.view === 'day') {
        return _react["default"].createElement("div", {
          style: {
            display: 'flex',
            flexGrow: '1'
          }
        }, _.map(this.props.columnPKs, function (pk, i) {
          return _react["default"].createElement("div", {
            className: "rbc-day-column-pk"
          }, !_.isUndefined(props.components.SpecialistSlot) ? _react["default"].createElement(props.components.SpecialistSlot, {
            pk: pk,
            key: 'specialist-slots-' + pk,
            now: now,
            min: min,
            max: max,
            step: step,
            numberSlots: props.extraColumnSlots,
            eventComponent: props.eventComponent,
            eventWrapper: props.components.eventWrapper
          }) : null, _react["default"].createElement(_TimeColumn["default"], _extends({}, props, {
            className: "rbc-day-slot",
            timeslots: timeslots,
            now: now,
            min: min,
            max: max,
            step: step,
            key: pk,
            pk: pk,
            extraColumnSlots: 0
          }), self.renderEvents(pk), selecting && _react["default"].createElement("div", {
            className: "rbc-slot-selection",
            style: style
          }, _react["default"].createElement("span", null, _localizer["default"].format(selectDates, selectRangeFormat, culture)))));
        }));
      }

      return _react["default"].createElement(_TimeColumn["default"], _extends({}, props, {
        className: "rbc-day-slot",
        timeslots: timeslots,
        now: now,
        min: min,
        max: max,
        step: step
      }), self.renderEvents(""), selecting && _react["default"].createElement("div", {
        className: "rbc-slot-selection",
        style: style
      }, _react["default"].createElement("span", null, _localizer["default"].format(selectDates, selectRangeFormat, culture))));
    }
  }, {
    key: "renderEvents",
    value: function renderEvents(pk) {
      var _this2 = this;

      var _this$props2 = this.props,
          events = _this$props2.events,
          min = _this$props2.min,
          culture = _this$props2.culture,
          eventPropGetter = _this$props2.eventPropGetter,
          view = _this$props2.view,
          columnPKs = _this$props2.columnPKs,
          selected = _this$props2.selected,
          eventTimeRangeFormat = _this$props2.eventTimeRangeFormat,
          eventComponent = _this$props2.eventComponent,
          EventWrapper = _this$props2.eventWrapperComponent,
          isRtl = _this$props2.rtl,
          step = _this$props2.step,
          startAccessor = _this$props2.startAccessor,
          endAccessor = _this$props2.endAccessor,
          titleAccessor = _this$props2.titleAccessor;
      var EventComponent = eventComponent;
      var obj = {
        "isSlots": false
      };

      if (view === 'day') {
        obj.responsible_person = pk;
      }

      events = _.filter(events, obj);
      events = _.filter(events, function (el, i) {
        var p = '';

        if (typeof el.responsible_person !== 'undefined') {
          p = el.responsible_person;
        } else if (typeof el.pk !== 'undefined') {
          p = el.pk;
        }

        return p === '' || columnPKs.indexOf(p) > -1;
      });
      events = (0, _dayViewLayout["default"])({
        events: events,
        startAccessor: startAccessor,
        endAccessor: endAccessor,
        min: min,
        totalMin: this._totalMin,
        step: step
      });
      return events.map(function (_ref2, idx) {
        var _objectSpread2;

        var event = _ref2.event,
            style = _ref2.style;
        var start = (0, _accessors.accessor)(event, startAccessor);
        var end = (0, _accessors.accessor)(event, endAccessor);
        var title = (0, _accessors.accessor)(event, titleAccessor);

        var label = _localizer["default"].format({
          start: start,
          end: end
        }, eventTimeRangeFormat, culture);

        var _isSelected = (0, _selection.isSelected)(event, selected);

        if (eventPropGetter) var _eventPropGetter = eventPropGetter(event, start, end, _isSelected),
            xStyle = _eventPropGetter.style,
            className = _eventPropGetter.className;
        var height = style.height,
            top = style.top,
            width = style.width,
            xOffset = style.xOffset;
        event.selected = _isSelected;

        if (view !== 'day' && typeof event.responsible_person !== 'undefined' && event.responsible_person !== '') {
          title = event.responsible_person + '; ' + title;
        }

        return _react["default"].createElement(EventWrapper, {
          event: event
        }, _react["default"].createElement("div", {
          key: 'evt_' + idx,
          style: _objectSpread({}, xStyle, (_objectSpread2 = {
            top: "".concat(top, "%"),
            height: "".concat(height, "%")
          }, _defineProperty(_objectSpread2, isRtl ? 'right' : 'left', "".concat(Math.max(0, xOffset), "%")), _defineProperty(_objectSpread2, "width", "".concat(width, "%")), _defineProperty(_objectSpread2, "backgroundColor", event.color || 'inherit'), _objectSpread2)),
          title: label + ': ' + title.replace(/<\/?[^>]+(>|$)/g, ""),
          onClick: _this2._select.bind(null, event),
          className: (0, _classnames["default"])('rbc-event', className, {
            'rbc-selected': _isSelected
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
        }))));
      });
    }
  }, {
    key: "_slotStyle",
    value: function _slotStyle(startSlot, endSlot) {
      var top = startSlot / this._totalMin * 100;
      var bottom = endSlot / this._totalMin * 100;
      return {
        top: top + '%',
        height: bottom - top + '%'
      };
    }
  }, {
    key: "_selectable",
    value: function _selectable() {
      var _this3 = this;

      var node = (0, _reactDom.findDOMNode)(this);
      var selector = this._selector = new _Selection["default"](function () {
        return (0, _reactDom.findDOMNode)(_this3);
      });

      var maybeSelect = function maybeSelect(box) {
        var onSelecting = _this3.props.onSelecting;
        var current = _this3.state || {};
        var state = selectionState(box);
        var start = state.startDate,
            end = state.endDate;

        if (onSelecting) {
          if (_dates["default"].eq(current.startDate, start, 'minutes') && _dates["default"].eq(current.endDate, end, 'minutes') || onSelecting({
            start: start,
            end: end
          }) === false) return;
        }

        _this3.setState(state);
      };

      var selectionState = function selectionState(_ref3) {
        var y = _ref3.y;
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
          startSlot: (0, _dayViewLayout.positionFromDate)(start, min, step),
          endSlot: (0, _dayViewLayout.positionFromDate)(end, min, step)
        };
      };

      selector.on('selecting', maybeSelect);
      selector.on('selectStart', maybeSelect);
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
        if (_this3.state.selecting) {
          _this3._selectSlot(_this3.state);

          _this3.setState({
            selecting: false
          });
        }
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
          endDate = _ref5.endDate;
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
  onSelecting: _propTypes["default"].func,
  onSelectSlot: _propTypes["default"].func.isRequired,
  onSelectEvent: _propTypes["default"].func.isRequired,
  className: _propTypes["default"].string
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