"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "elementType", {
  enumerable: true,
  get: function get() {
    return _propTypes.elementType;
  }
});
exports.views = exports.accessor = exports.eventComponent = void 0;

var _propTypes = _interopRequireWildcard(require("prop-types"));

var _localizer = _interopRequireDefault(require("../localizer"));

var _all = _interopRequireDefault(require("react-prop-types/lib/all"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import {createChainableTypeChecker} from 'react-prop-types/lib/common';
var eventComponent = _propTypes["default"].oneOfType([_propTypes.elementType, _propTypes["default"].shape({
  month: _propTypes.elementType,
  week: _propTypes.elementType,
  day: _propTypes.elementType,
  agenda: _propTypes.elementType
})]);

exports.eventComponent = eventComponent;
var viewNames = Object.keys(_constants.views).map(function (k) {
  return _constants.views[k];
});

var accessor = _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].func]); // export let dateFormat = createChainableTypeChecker(
//     (...args) => localizer.propType && localizer.propType(...args))


exports.accessor = accessor;

var views = _propTypes["default"].oneOfType([_propTypes["default"].arrayOf(_propTypes["default"].oneOf(viewNames)), (0, _all["default"])([_propTypes["default"].object, function (props, name, component) {
  var prop = props[name],
      err;
  Object.keys(prop).every(function (key) {
    var isBuiltinView = viewNames.indexOf(key) !== -1 && typeof prop[key] === 'boolean';
    return isBuiltinView || !(err = (0, _propTypes.elementType)(prop, key, component));
  });
  return err || null;
}])]);

exports.views = views;