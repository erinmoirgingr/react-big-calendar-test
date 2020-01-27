"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var EventWrapper = _react["default"].createClass({
  displayName: "EventWrapper",
  render: function render() {
    return this.props.children;
  }
});

var _default = EventWrapper;
exports["default"] = _default;