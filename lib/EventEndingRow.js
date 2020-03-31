"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _EventRowMixin = _interopRequireDefault(require("./EventRowMixin"));

var _eventLevels = require("./utils/eventLevels");

var _messages = _interopRequireDefault(require("./utils/messages"));

var _lodash = _interopRequireDefault(require("lodash"));

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

var isSegmentInSlot = function isSegmentInSlot(seg, slot) {
  return seg.left <= slot && seg.right >= slot;
};

var eventsInSlot = function eventsInSlot(segments, slot) {
  return segments.filter(function (seg) {
    return isSegmentInSlot(seg, slot);
  }).length;
};

var EventRow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EventRow, _React$Component);

  function EventRow() {
    _classCallCheck(this, EventRow);

    return _possibleConstructorReturn(this, _getPrototypeOf(EventRow).apply(this, arguments));
  }

  _createClass(EventRow, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          segments = _this$props.segments,
          slotCount = _this$props.slots;
      var rowSegments = (0, _eventLevels.eventLevels)(segments).levels[0];
      var current = 1,
          lastEnd = 1,
          row = [];

      while (current <= slotCount) {
        var key = '_lvl_' + current;

        var _ref = rowSegments.filter(function (seg) {
          return isSegmentInSlot(seg, current);
        })[0] || {},
            event = _ref.event,
            left = _ref.left,
            right = _ref.right,
            span = _ref.span; //eslint-disable-line


        if (!event) {
          current++;
          continue;
        }

        var gap = Math.max(0, left - lastEnd);

        if (this.canRenderSlotEvent(left, span)) {
          var content = this.renderEvent(event);
          if (gap) row.push(this.renderSpan(gap, key + '_gap'));
          row.push(this.renderSpan(span, key, content));
          lastEnd = current = right + 1;
        } else {
          if (gap) row.push(this.renderSpan(gap, key + '_gap'));
          row.push(this.renderSpan(1, key, this.renderShowMore(segments, current)));
          lastEnd = current = current + 1;
        }
      }

      return _react["default"].createElement("div", {
        className: "rbc-row"
      }, row);
    }
  }, {
    key: "canRenderSlotEvent",
    value: function canRenderSlotEvent(slot, span) {
      var segments = this.props.segments;
      return _lodash["default"].range(slot, slot + span).every(function (s) {
        var count = eventsInSlot(segments, s);
        return count === 1;
      });
    }
  }, {
    key: "renderShowMore",
    value: function renderShowMore(segments, slot) {
      var messages = (0, _messages["default"])(this.props.messages);
      var count = eventsInSlot(segments, slot);
      return count ? _react["default"].createElement("a", {
        key: 'sm_' + slot,
        href: "#",
        className: 'rbc-show-more',
        onClick: this._showMore.bind(null, slot)
      }, messages.showMore(count)) : false;
    }
  }, {
    key: "_showMore",
    value: function _showMore(slot, e) {
      e.preventDefault();
      this.props.onShowMore(slot);
    }
  }]);

  return EventRow;
}(_react["default"].Component);

EventRow.displayName = 'EventRow';
EventRow.propTypes = {
  segments: _propTypes["default"].array,
  slots: _propTypes["default"].number
};

var _default = (0, _EventRowMixin["default"])(EventRow);

exports["default"] = _default;