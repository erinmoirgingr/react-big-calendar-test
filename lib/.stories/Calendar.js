"use strict";

var _react = _interopRequireDefault(require("react"));

var _storybook = require("@kadira/storybook");

var _Calendar = _interopRequireDefault(require("../Calendar"));

var _moment = _interopRequireDefault(require("moment"));

var _moment2 = _interopRequireDefault(require("../localizers/moment.js"));

require("../less/styles.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
(0, _moment2["default"])(_moment["default"]); // or globalizeLocalizer

var events = [{
  title: 'test',
  start: (0, _moment["default"])().add(1, 'days').subtract(5, 'hours').toDate(),
  end: (0, _moment["default"])().add(1, 'days').subtract(4, 'hours').toDate(),
  allDay: false
}, {
  title: 'test all day',
  start: (0, _moment["default"])().toDate(),
  end: (0, _moment["default"])().toDate(),
  allDay: true
}];
(0, _storybook.storiesOf)('module.Calendar.week', module).add('default view', function () {
  return _react["default"].createElement("div", {
    style: {
      height: 600
    }
  }, _react["default"].createElement(_Calendar["default"], {
    defaultView: "week",
    min: (0, _moment["default"])('12:00am', 'h:mma').toDate(),
    max: (0, _moment["default"])('11:59pm', 'h:mma').toDate(),
    events: events,
    onSelectEvent: (0, _storybook.action)('event selected'),
    defaultDate: new Date()
  }));
}).add('selectable', function () {
  return _react["default"].createElement("div", {
    style: {
      height: 600
    }
  }, _react["default"].createElement(_Calendar["default"], {
    defaultView: "week",
    selectable: true,
    min: (0, _moment["default"])('12:00am', 'h:mma').toDate(),
    max: (0, _moment["default"])('11:59pm', 'h:mma').toDate(),
    events: events,
    onSelectEvent: (0, _storybook.action)('event selected'),
    onSelectSlot: (0, _storybook.action)('slot selected'),
    defaultDate: new Date()
  }));
}).add('selectable, step 15, 4 timeslots', function () {
  return _react["default"].createElement("div", {
    style: {
      height: 600
    }
  }, _react["default"].createElement(_Calendar["default"], {
    defaultView: "week",
    selectable: true,
    timeslots: 4,
    step: 15,
    min: (0, _moment["default"])('12:00am', 'h:mma').toDate(),
    max: (0, _moment["default"])('11:59pm', 'h:mma').toDate(),
    events: events,
    onSelectEvent: (0, _storybook.action)('event selected'),
    onSelectSlot: (0, _storybook.action)('slot selected'),
    defaultDate: new Date()
  }));
}).add('selectable, step 10, 6 timeslots', function () {
  return _react["default"].createElement("div", {
    style: {
      height: 600
    }
  }, _react["default"].createElement(_Calendar["default"], {
    defaultView: "week",
    selectable: true,
    timeslots: 6,
    step: 10,
    min: (0, _moment["default"])('12:00am', 'h:mma').toDate(),
    max: (0, _moment["default"])('11:59pm', 'h:mma').toDate(),
    events: events,
    onSelectEvent: (0, _storybook.action)('event selected'),
    onSelectSlot: (0, _storybook.action)('slot selected'),
    defaultDate: new Date()
  }));
}).add('selectable, step 5, 6 timeslots', function () {
  return _react["default"].createElement("div", {
    style: {
      height: 600
    }
  }, _react["default"].createElement(_Calendar["default"], {
    defaultView: "week",
    selectable: true,
    timeslots: 6,
    step: 5,
    min: (0, _moment["default"])('12:00am', 'h:mma').toDate(),
    max: (0, _moment["default"])('11:59pm', 'h:mma').toDate(),
    events: events,
    onSelectEvent: (0, _storybook.action)('event selected'),
    onSelectSlot: (0, _storybook.action)('slot selected'),
    defaultDate: new Date()
  }));
}).add('selectable, 3 timeslots', function () {
  return _react["default"].createElement("div", {
    style: {
      height: 600
    }
  }, _react["default"].createElement(_Calendar["default"], {
    defaultView: "week",
    selectable: true,
    timeslots: 3,
    min: (0, _moment["default"])('12:00am', 'h:mma').toDate(),
    max: (0, _moment["default"])('11:59pm', 'h:mma').toDate(),
    events: events,
    onSelectEvent: (0, _storybook.action)('event selected'),
    onSelectSlot: (0, _storybook.action)('slot selected'),
    defaultDate: new Date()
  }));
}).add('selectable, 9 timeslots, force now to 9:30am', function () {
  return _react["default"].createElement("div", {
    style: {
      height: 600
    }
  }, _react["default"].createElement(_Calendar["default"], {
    defaultView: "week",
    selectable: true,
    timeslots: 9,
    now: (0, _moment["default"])('9:30am', 'h:mma').toDate(),
    min: (0, _moment["default"])('12:00am', 'h:mma').toDate(),
    max: (0, _moment["default"])('11:59pm', 'h:mma').toDate(),
    events: events,
    onSelectEvent: (0, _storybook.action)('event selected'),
    onSelectSlot: (0, _storybook.action)('slot selected'),
    defaultDate: new Date()
  }));
});