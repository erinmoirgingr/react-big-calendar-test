"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
exports.formats = void 0;

var _dates = _interopRequireDefault(require("../utils/dates"));

var _formats = require("../formats");

var _localizer = require("../localizer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var dateRangeFormat = function dateRangeFormat(_ref, culture, local) {
  var start = _ref.start,
      end = _ref.end;
  return local.format(start, 'd', culture) + ' — ' + local.format(end, 'd', culture);
};

var timeRangeFormat = function timeRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
      end = _ref2.end;
  return local.format(start, 't', culture) + ' — ' + local.format(end, 't', culture);
};

var weekRangeFormat = function weekRangeFormat(_ref3, culture, local) {
  var start = _ref3.start,
      end = _ref3.end;
  return local.format(start, 'MMM dd', culture) + ' - ' + local.format(end, _dates["default"].eq(start, end, 'month') ? 'dd' : 'MMM dd', culture);
};

var formats = {
  dateFormat: 'dd',
  dayFormat: 'ddd dd/MM',
  weekdayFormat: 'ddd',
  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  timeGutterFormat: 't',
  monthHeaderFormat: 'Y',
  dayHeaderFormat: 'dddd MMM dd',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,
  agendaDateFormat: 'ddd MMM dd',
  agendaTimeFormat: 't',
  agendaTimeRangeFormat: timeRangeFormat
};
exports.formats = formats;

function _default(globalize) {
  function getCulture(culture) {
    return culture ? globalize.findClosestCulture(culture) : globalize.culture();
  }

  function firstOfWeek(culture) {
    culture = getCulture(culture);
    return culture && culture.calendar.firstDay || 0;
  }

  (0, _formats.set)(formats);
  return (0, _localizer.set)({
    firstOfWeek: firstOfWeek,
    parse: function parse(value, format, culture) {
      return globalize.parseDate(value, format, culture);
    },
    format: function format(value, _format, culture) {
      return globalize.format(value, _format, culture);
    }
  });
}