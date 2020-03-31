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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Toolbar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar() {
    _classCallCheck(this, Toolbar);

    return _possibleConstructorReturn(this, _getPrototypeOf(Toolbar).apply(this, arguments));
  }

  _createClass(Toolbar, [{
    key: "render",
    value: function render() {
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
        onClick: this.navigate.bind(this, _constants.navigate.TODAY)
      }, messages.today), _react["default"].createElement("button", {
        type: "button",
        onClick: this.navigate.bind(this, _constants.navigate.PREVIOUS)
      }, messages.previous), _react["default"].createElement("button", {
        type: "button",
        onClick: this.navigate.bind(this, _constants.navigate.NEXT)
      }, messages.next)), _react["default"].createElement("span", {
        className: "rbc-toolbar-label"
      }, _react["default"].createElement("i", {
        className: "fa fa-calendar"
      }), " ", label), _react["default"].createElement("span", {
        className: "rbc-btn-group"
      }, this.viewNamesGroup(messages)));
    }
  }, {
    key: "navigate",
    value: function navigate(action) {
      this.props.onNavigate(action);
    }
  }, {
    key: "view",
    value: function view(_view) {
      this.props.onViewChange(_view);
    }
  }, {
    key: "viewNamesGroup",
    value: function viewNamesGroup(messages) {
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
  }]);

  return Toolbar;
}(_react["default"].Component);

;
var _default = Toolbar;
exports["default"] = _default;