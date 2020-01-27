"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _messages = _interopRequireDefault(require("./utils/messages"));

var _constants = require("./utils/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Toolbar = _react["default"].createClass({
  displayName: "Toolbar",
  render: function render() {
    var _this$props = this.props,
        messages = _this$props.messages,
        label = _this$props.label;
    messages = (0, _messages["default"])(messages);
    return _react["default"].createElement("div", {
      className: "rbc-toolbar"
    }, _react["default"].createElement("span", {
      className: "rbc-btn-group"
    }, _react["default"].createElement("button", {
      type: "button",
      onClick: this.navigate.bind(null, _constants.navigate.TODAY)
    }, messages.today), _react["default"].createElement("button", {
      type: "button",
      onClick: this.navigate.bind(null, _constants.navigate.PREVIOUS)
    }, messages.previous), _react["default"].createElement("button", {
      type: "button",
      onClick: this.navigate.bind(null, _constants.navigate.NEXT)
    }, messages.next)), _react["default"].createElement("span", {
      className: "rbc-toolbar-label"
    }, _react["default"].createElement("i", {
      className: "fa fa-calendar"
    }), " ", label), _react["default"].createElement("span", {
      className: "rbc-btn-group"
    }, this.viewNamesGroup(messages)));
  },
  navigate: function navigate(action) {
    this.props.onNavigate(action);
  },
  view: function view(_view) {
    this.props.onViewChange(_view);
  },
  viewNamesGroup: function viewNamesGroup(messages) {
    var _this = this;

    var viewNames = this.props.views;
    var view = this.props.view;

    if (viewNames.length > 1) {
      return viewNames.map(function (name) {
        return _react["default"].createElement("button", {
          type: "button",
          key: name,
          className: (0, _classnames["default"])({
            'rbc-active': view === name
          }),
          onClick: _this.view.bind(null, name)
        }, messages[name]);
      });
    }
  }
});

var _default = Toolbar;
exports["default"] = _default;