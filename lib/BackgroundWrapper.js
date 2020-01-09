'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BackgroundWrapper = _react2.default.createClass({
  displayName: 'BackgroundWrapper',
  render: function render() {
    return this.props.children;
  }
});

exports.default = BackgroundWrapper;
module.exports = exports['default'];