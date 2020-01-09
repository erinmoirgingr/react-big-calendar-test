'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('./utils/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeSlot = function (_Component) {
  _inherits(TimeSlot, _Component);

  function TimeSlot() {
    _classCallCheck(this, TimeSlot);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  TimeSlot.prototype.leeSelectSlot = function leeSelectSlot(available) {
    this.props.leeSelectSlot(this.props.pk, this.props.value, available);
  };

  TimeSlot.prototype.render = function render() {
    var BackgroundWrapper = this.props.backgroundWrapperComponent;
    var availability = typeof this.props.availability !== 'undefined' && typeof this.props.pk !== 'undefined' && typeof this.props.availability[this.props.pk] !== 'undefined' ? this.props.availability[this.props.pk] : false;
    var available = false;

    if (availability && typeof availability[this.props.content.toLowerCase()] !== 'undefined' && availability[this.props.content.toLowerCase()]) {
      available = true;
    }

    return _react2.default.createElement(
      BackgroundWrapper,
      { value: this.props.value, pk: this.props.pk, available: available, type: 'TimeSlot' },
      _react2.default.createElement(
        'div',
        {
          onClick: this.leeSelectSlot.bind(this, available),
          className: (0, _classnames2.default)('rbc-time-slot', this.props.showLabel && 'rbc-label', this.props.isNow && 'rbc-now', !this.props.showLabel && available && 'rbc-available')
        },
        this.props.showLabel && _react2.default.createElement(
          'span',
          null,
          this.props.content
        )
      )
    );
  };

  return TimeSlot;
}(_react.Component);

TimeSlot.propTypes = {
  backgroundWrapperComponent: _propTypes.elementType,
  value: _react.PropTypes.instanceOf(Date).isRequired,
  isNow: _react.PropTypes.bool,
  showLabel: _react.PropTypes.bool,
  content: _react.PropTypes.string,
  culture: _react.PropTypes.string
};
TimeSlot.defaultProps = {
  isNow: false,
  showLabel: false,
  content: ''
};
exports.default = TimeSlot;
module.exports = exports['default'];