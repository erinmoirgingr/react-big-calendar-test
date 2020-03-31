"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _uncontrollable = require("uncontrollable");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes2 = require("./utils/propTypes");

var _localizer = _interopRequireDefault(require("./localizer"));

var _helpers = require("./utils/helpers");

var _constants = require("./utils/constants");

var _dates = _interopRequireDefault(require("./utils/dates"));

var _formats = _interopRequireDefault(require("./formats"));

var _viewLabel = _interopRequireDefault(require("./utils/viewLabel"));

var _move = _interopRequireDefault(require("./utils/move"));

var _Views = _interopRequireDefault(require("./Views"));

var _Toolbar = _interopRequireDefault(require("./Toolbar"));

var _EventWrapper = _interopRequireDefault(require("./EventWrapper"));

var _BackgroundWrapper = _interopRequireDefault(require("./BackgroundWrapper"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function viewNames(_views) {
  return !Array.isArray(_views) ? Object.keys(_views) : _views;
}

function isValidView(view, _ref) {
  var _views = _ref.views;
  var names = viewNames(_views);
  return names.indexOf(view) !== -1;
}

var now = new Date();
/**
 * react-big-calendar is full featured Calendar component for managing events and dates. It uses
 * modern `flexbox` for layout making it super responsive and performant. Leaving most of the layout heavy lifting
 * to the browser. __note:__ The default styles use `height: 100%` which means your container must set an explicit
 * height (feel free to adjust the styles to suit your specific needs).
 *
 * Big Calendar is unopiniated about editing and moving events, prefering to let you implement it in a way that makes
 * the most sense to your app. It also tries not to be prescriptive about your event data structures, just tell it
 * how to find the start and end datetimes and you can pass it whatever you want.
 *
 * One thing to note is that, `react-big-calendar` treats event start/end dates as an _exclusive_ range.
 * which means that the event spans up to, but not including, the end date. In the case
 * of displaying events on whole days, end dates are rounded _up_ to the next day. So an
 * event ending on `Apr 8th 12:00:00 am` will not appear on the 8th, whereas one ending
 * on `Apr 8th 12:01:00 am` will. If you want _inclusive_ ranges consider providing a
 * function `endAccessor` that returns the end date + 1 day for those events that end at midnight.
 */

var Calendar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar(props) {
    var _this;

    _classCallCheck(this, Calendar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Calendar).call(this, props));
    _this._navigate = _this._navigate.bind(_assertThisInitialized(_this));
    _this._headerClick = _this._headerClick.bind(_assertThisInitialized(_this));
    _this._select = _this._select.bind(_assertThisInitialized(_this));
    _this._selectSlot = _this._selectSlot.bind(_assertThisInitialized(_this));
    _this._view = _this._view.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Calendar, [{
    key: "getDefaultProps",
    value: function getDefaultProps() {
      return {
        popup: false,
        toolbar: true,
        view: _constants.views.MONTH,
        views: [_constants.views.MONTH, _constants.views.WEEK, _constants.views.DAY, _constants.views.AGENDA],
        date: now,
        step: 30,
        titleAccessor: 'title',
        allDayAccessor: 'allDay',
        startAccessor: 'start',
        endAccessor: 'end'
      };
    }
  }, {
    key: "getViews",
    value: function getViews() {
      var views = this.props.views;

      if (Array.isArray(views)) {
        return _lodash["default"].transform(views, function (obj, name) {
          return obj[name] = _Views["default"][name];
        }, {});
      }

      if (_typeof(views) === 'object') {
        return _lodash["default"].mapValues(views, function (value, key) {
          if (value === true) {
            return _Views["default"][key];
          }

          return value;
        });
      }

      return _Views["default"];
    }
  }, {
    key: "getView",
    value: function getView() {
      var views = this.getViews();
      return views[this.props.view];
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          view = _this$props.view,
          toolbar = _this$props.toolbar,
          events = _this$props.events,
          culture = _this$props.culture,
          _this$props$component = _this$props.components,
          components = _this$props$component === void 0 ? {} : _this$props$component,
          _this$props$formats = _this$props.formats,
          formats = _this$props$formats === void 0 ? {} : _this$props$formats,
          style = _this$props.style,
          className = _this$props.className,
          current = _this$props.date,
          props = _objectWithoutProperties(_this$props, ["view", "toolbar", "events", "culture", "components", "formats", "style", "className", "date"]);

      formats = (0, _formats["default"])(formats);
      var View = this.getView();
      var names = viewNames(this.props.views);

      var elementProps = _lodash["default"].omit(this.props, Object.keys(Calendar.propTypes));

      var viewComponents = _lodash["default"].defaults(components[view] || {}, _lodash["default"].omit(components, names), {
        eventWrapper: _EventWrapper["default"],
        backgroundWrapper: _BackgroundWrapper["default"]
      });

      var ToolbarToRender = components.toolbar || _Toolbar["default"];
      return _react["default"].createElement("div", _extends({}, elementProps, {
        className: (0, _classnames["default"])('rbc-calendar', className, {
          'rbc-rtl': props.rtl
        }),
        style: style
      }), toolbar && _react["default"].createElement(ToolbarToRender, {
        date: current,
        view: view,
        views: names,
        label: (0, _viewLabel["default"])(current, view, formats, culture),
        onViewChange: this._view,
        onNavigate: this._navigate,
        messages: this.props.messages
      }), _react["default"].createElement(View, _extends({}, props, formats, {
        culture: culture,
        formats: undefined,
        events: events,
        date: current,
        components: viewComponents,
        onNavigate: this._navigate,
        onHeaderClick: this._headerClick,
        onSelectEvent: this._select,
        onSelectSlot: this._selectSlot,
        view: this.props.view
      })));
    }
  }, {
    key: "_navigate",
    value: function _navigate(action, newDate) {
      var _this$props2 = this.props,
          view = _this$props2.view,
          date = _this$props2.date,
          onNavigate = _this$props2.onNavigate;
      date = (0, _move["default"])(action, newDate || date, view);
      onNavigate(date, view);
      if (action === _constants.navigate.DATE) this._viewNavigate(date);
    }
  }, {
    key: "_viewNavigate",
    value: function _viewNavigate(nextDate) {
      var _this$props3 = this.props,
          view = _this$props3.view,
          date = _this$props3.date,
          culture = _this$props3.culture;

      if (_dates["default"].eq(date, nextDate, view, _localizer["default"].startOfWeek(culture))) {
        this._view(_constants.views.DAY);
      }
    }
  }, {
    key: "_view",
    value: function _view(view) {
      if (view !== this.props.view && isValidView(view, this.props)) this.props.onView(view);
    }
  }, {
    key: "_select",
    value: function _select(event) {
      (0, _helpers.notify)(this.props.onSelectEvent, event);
    }
  }, {
    key: "_selectSlot",
    value: function _selectSlot(slotInfo) {
      (0, _helpers.notify)(this.props.onSelectSlot, slotInfo);
    }
  }, {
    key: "_headerClick",
    value: function _headerClick(date) {
      var view = this.props.view;
      if (view === _constants.views.MONTH || view === _constants.views.WEEK) this._view(_constants.views.day);

      this._navigate(_constants.navigate.DATE, date);
    }
  }]);

  return Calendar;
}(_react["default"].Component);

Calendar.propTypes = {
  /**
   * The current date value of the calendar. Determines the visible view range
   *
   * @controllable onNavigate
   */
  date: _propTypes["default"].instanceOf(Date),

  /**
   * The current view of the calendar.
   *
   * @default 'month'
   * @controllable onView
   */
  view: _propTypes["default"].string,

  /**
   * An array of event objects to display on the calendar
   */
  events: _propTypes["default"].arrayOf(_propTypes["default"].object),

  /**
   * Callback fired when the `date` value changes.
   *
   * @controllable date
   */
  onNavigate: _propTypes["default"].func,

  /**
   * Callback fired when the `view` value changes.
   *
   * @controllable date
   */
  onView: _propTypes["default"].func,

  /**
   * A callback fired when a date selection is made. Only fires when `selectable` is `true`.
   *
   * ```js
   * function(
   *   slotInfo: object {
   *     start: date,
   *     end: date,
   *     slots: array<date>
   *   }
   * )
   * ```
   */
  onSelectSlot: _propTypes["default"].func,

  /**
   * Callback fired when a calendar event is selected.
   *
   * ```js
   * function(event: object)
   * ```
   */
  onSelectEvent: _propTypes["default"].func,

  /**
   * Callback fired when dragging a selection in the Time views.
   *
   * Returning `false` from the handler will prevent a selection.
   *
   * ```js
   * function ({ start: Date, end: Date }) : boolean
   * ```
   */
  onSelecting: _propTypes["default"].func,

  /**
   * An array of built-in view names to allow the calendar to display.
   *
   * @type Calendar.views
   * @default ['month', 'week', 'day', 'agenda']
   */
  views: _propTypes2.views,

  /**
   * Determines whether the toolbar is displayed
   */
  toolbar: _propTypes["default"].bool,

  /**
   * Show truncated events in an overlay when you click the "+_x_ more" link.
   */
  popup: _propTypes["default"].bool,

  /**
   * Distance in pixels, from the edges of the viewport, the "show more" overlay should be positioned.
   *
   * ```js
   * <BigCalendar popupOffset={30}/>
   * <BigCalendar popupOffset={{x: 30, y: 20}}/>
   * ```
   */
  popupOffset: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].shape({
    x: _propTypes["default"].number,
    y: _propTypes["default"].number
  })]),

  /**
   * Allows mouse selection of ranges of dates/times.
   */
  selectable: _propTypes["default"].bool,

  /**
   * Determines the selectable time increments in week and day views
   */
  step: _propTypes["default"].number,

  /**
   * switch the calendar to a `right-to-left` read direction.
   */
  rtl: _propTypes["default"].bool,

  /**
   * Optionally provide a function that returns an object of className or style props
   * to be applied to the the event node.
   *
   * ```js
   * function(
   * 	event: object,
   * 	start: date,
   * 	end: date,
   * 	isSelected: bool
   * ) -> { className: string?, style: object? }
   * ```
   */
  eventPropGetter: _propTypes["default"].func,

  /**
   * Accessor for the event title, used to display event information. Should
   * resolve to a `renderable` value.
   *
   * @type {(func|string)}
   */
  titleAccessor: _propTypes2.accessor,

  /**
   * Determines whether the event should be considered an "all day" event and ignore time.
   * Must resolve to a `boolean` value.
   *
   * @type {(func|string)}
   */
  allDayAccessor: _propTypes2.accessor,

  /**
   * The start date/time of the event. Must resolve to a JavaScript `Date` object.
   *
   * @type {(func|string)}
   */
  startAccessor: _propTypes2.accessor,

  /**
   * The end date/time of the event. Must resolve to a JavaScript `Date` object.
   *
   * @type {(func|string)}
   */
  endAccessor: _propTypes2.accessor,

  /**
   * Constrains the minimum _time_ of the Day and Week views.
   */
  min: _propTypes["default"].instanceOf(Date),

  /**
   * Constrains the maximum _time_ of the Day and Week views..
   */
  max: _propTypes["default"].instanceOf(Date),

  /**
   * Localizer specific formats, tell the Calendar how to format and display dates.
   */
  formats: _propTypes["default"].shape({
    /**
     * Format for the day of the month heading in the Month view.
     */
    dateFormat: _propTypes2.dateFormat,

    /**
     * A day of the week format for Week and Day headings
     */
    dayFormat: _propTypes2.dateFormat,

    /**
     * Week day name format for the Month week day headings.
     */
    weekdayFormat: _propTypes2.dateFormat,

    /**
     * Toolbar header format for the Month view.
     */
    monthHeaderFormat: _propTypes2.dateFormat,

    /**
     * Toolbar header format for the Week views.
     */
    weekHeaderFormat: _propTypes2.dateFormat,

    /**
     * Toolbar header format for the Day view.
     */
    dayHeaderFormat: _propTypes2.dateFormat,

    /**
     * Toolbar header format for the Agenda view.
     */
    agendaHeaderFormat: _propTypes2.dateFormat,

    /**
     * A time range format for selecting time slots.
     */
    selectRangeFormat: _propTypes2.dateFormat,
    agendaDateFormat: _propTypes2.dateFormat,
    agendaTimeFormat: _propTypes2.dateFormat,
    agendaTimeRangeFormat: _propTypes2.dateFormat
  }),

  /**
   * Customize how different sections of the calendar render by providing custom Components.
   * In particular the `Event` component can be specified for the entire calendar, or you can
   * provide an individual component for each view type.
   *
   * ```jsx
   * let components = {
   *   event: MyEvent, // used by each view (Month, Day, Week)
   *   toolbar: MyToolbar,
   *   agenda: {
   *   	 event: MyAgendaEvent // with the agenda view use a different component to render events
   *   }
   * }
   * <Calendar components={components} />
   * ```
   */
  components: _propTypes["default"].shape({
    event: _propTypes2.elementType,
    eventWrapper: _propTypes2.elementType,
    backgroundWrapper: _propTypes2.elementType,
    toolbar: _propTypes2.elementType,
    agenda: _propTypes["default"].shape({
      date: _propTypes2.elementType,
      time: _propTypes2.elementType,
      event: _propTypes2.elementType
    }),
    day: _propTypes["default"].shape({
      event: _propTypes2.elementType
    }),
    week: _propTypes["default"].shape({
      event: _propTypes2.elementType
    }),
    month: _propTypes["default"].shape({
      event: _propTypes2.elementType
    })
  }),

  /**
   * String messages used throughout the component, override to provide localizations
   */
  messages: _propTypes["default"].shape({
    allDay: _propTypes["default"].node,
    previous: _propTypes["default"].node,
    next: _propTypes["default"].node,
    today: _propTypes["default"].node,
    month: _propTypes["default"].node,
    week: _propTypes["default"].node,
    day: _propTypes["default"].node,
    agenda: _propTypes["default"].node,
    showMore: _propTypes["default"].func
  })
};

var _default = (0, _uncontrollable.uncontrollable)(Calendar, {
  view: 'onView',
  date: 'onNavigate',
  selected: 'onSelectEvent'
});

exports["default"] = _default;