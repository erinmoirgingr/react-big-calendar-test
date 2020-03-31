"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = moveDate;

var _constants = require("./constants");

var _Views = _interopRequireDefault(require("../Views"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function moveDate(action, date, view) {
  switch (action) {
    case _constants.navigate.TODAY:
      date = new Date();
      break;

    case _constants.navigate.DATE:
      break;

    default:
      date = _Views["default"][view].navigate(date, action);
  }

  return date;
}