'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _mapParams = require('./map-params');

var _mapParams2 = _interopRequireDefault(_mapParams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (dispatch, props, nextProps) {
  return function (need) {
    if (typeof need === 'function') {
      // need without props, will only fire on componentDidMount
      if (props) {
        return Promise.resolve();
      }

      return dispatch(need(_extends({}, nextProps, {
        dispatchNeeds: undefined
      })));
    }

    var nextNeedProps = (0, _mapParams2.default)(need.props || [], nextProps);
    var action = need.action(nextNeedProps);

    if (!props) {
      // componentDidMount, so we should always dispatch
      return dispatch(action);
    }

    var needProps = (0, _mapParams2.default)(need.props || [], props);

    // re-fire if props have changed, or no explicit props are mentioned
    if (!need.props || !(0, _shallowequal2.default)(needProps, nextNeedProps)) {
      return dispatch(action);
    }

    return Promise.resolve();
  };
};