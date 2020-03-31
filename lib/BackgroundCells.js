"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _classnames = _interopRequireDefault(require("classnames"));

var _eventLevels = require("./utils/eventLevels");

var _helpers = require("./utils/helpers");

var _propTypes2 = require("./utils/propTypes");

var _selection = require("./utils/selection");

var _Selection = _interopRequireWildcard(require("./Selection"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DisplayCells =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DisplayCells, _React$Component);

  function DisplayCells() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DisplayCells);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DisplayCells)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      selecting: false
    });

    return _this;
  }

  _createClass(DisplayCells, [{
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
          slots = _this$props.slots,
          values = _this$props.values,
          type = _this$props.type,
          BackgroundWrapper = _this$props.backgroundWrapperComponent;
      var _this$state = this.state,
          selecting = _this$state.selecting,
          startIdx = _this$state.startIdx,
          endIdx = _this$state.endIdx;
      var children = [];

      for (var i = 0; i < slots; i++) {
        children.push(_react["default"].createElement(BackgroundWrapper, {
          key: 'bg_' + i,
          value: values[i],
          type: type
        }, _react["default"].createElement("div", {
          style: (0, _eventLevels.segStyle)(1, slots),
          className: (0, _classnames["default"])('rbc-day-bg', {
            'rbc-selected-cell': selecting && i >= startIdx && i <= endIdx
          })
        })));
      }

      return _react["default"].createElement("div", {
        className: "rbc-row-bg"
      }, children);
    }
  }, {
    key: "_selectable",
    value: function _selectable() {
      var _this2 = this;

      var node = (0, _reactDom.findDOMNode)(this);
      var selector = this._selector = new _Selection["default"](this.props.container);
      selector.on('selecting', function (box) {
        var slots = _this2.props.slots;
        var startIdx = -1;
        var endIdx = -1;

        if (!_this2.state.selecting) {
          (0, _helpers.notify)(_this2.props.onSelectStart, [box]);
          _this2._initial = {
            x: box.x,
            y: box.y
          };
        }

        if (selector.isSelected(node)) {
          var nodeBox = (0, _Selection.getBoundsForNode)(node);

          var _dateCellSelection = (0, _selection.dateCellSelection)(_this2._initial, nodeBox, box, slots);

          startIdx = _dateCellSelection.startIdx;
          endIdx = _dateCellSelection.endIdx;
        }

        _this2.setState({
          selecting: true,
          startIdx: startIdx,
          endIdx: endIdx
        });
      });
      selector.on('click', function (point) {
        var rowBox = (0, _Selection.getBoundsForNode)(node);

        if ((0, _selection.pointInBox)(rowBox, point)) {
          var width = (0, _selection.slotWidth)((0, _Selection.getBoundsForNode)(node), _this2.props.slots);
          var currentCell = (0, _selection.getCellAtX)(rowBox, point.x, width);

          _this2._selectSlot({
            startIdx: currentCell,
            endIdx: currentCell
          });
        }

        _this2._initial = {};

        _this2.setState({
          selecting: false
        });
      });
      selector.on('select', function () {
        _this2._selectSlot(_this2.state);

        _this2._initial = {};

        _this2.setState({
          selecting: false
        });

        (0, _helpers.notify)(_this2.props.onSelectEnd, [_this2.state]);
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
    value: function _selectSlot(_ref) {
      var endIdx = _ref.endIdx,
          startIdx = _ref.startIdx;
      this.props.onSelectSlot && this.props.onSelectSlot({
        start: startIdx,
        end: endIdx
      });
    }
  }]);

  return DisplayCells;
}(_react["default"].Component);

_defineProperty(DisplayCells, "propTypes", {
  backgroundWrapperComponent: _propTypes2.elementType,
  selectable: _propTypes["default"].bool,
  onSelect: _propTypes["default"].func,
  slots: _propTypes["default"].number,
  values: _propTypes["default"].arrayOf(_propTypes["default"].instanceOf(Date)),
  type: _propTypes["default"].string
});

var _default = DisplayCells;
exports["default"] = _default;