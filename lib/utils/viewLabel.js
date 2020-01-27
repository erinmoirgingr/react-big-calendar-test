"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = viewLabel;

var _constants = require("./constants");

var _formats = _interopRequireDefault(require("../formats"));

var _localizer = _interopRequireDefault(require("../localizer"));

var _Views = _interopRequireDefault(require("../Views"));

var _Formats;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Formats = (_Formats = {}, _defineProperty(_Formats, _constants.views.MONTH, 'monthHeaderFormat'), _defineProperty(_Formats, _constants.views.WEEK, 'dayRangeHeaderFormat'), _defineProperty(_Formats, _constants.views.DAY, 'dayHeaderFormat'), _defineProperty(_Formats, _constants.views.AGENDA, 'agendaHeaderFormat'), _Formats);

function viewLabel(date, view, formats, culture) {
  var View = _Views["default"][view];
  var headerSingle = view === _constants.views.MONTH || view === _constants.views.DAY;
  formats = (0, _formats["default"])(formats || {});
  var headerFormat = formats[Formats[view]];
  return headerSingle ? _localizer["default"].format(date, headerFormat, culture) : _localizer["default"].format(View.range(date, {
    culture: culture
  }), headerFormat, culture);
}