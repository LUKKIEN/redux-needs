'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactRedux = require('react-redux');

var _dispatcher = require('./dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

var _createComponent = require('./create-component');

var _createComponent2 = _interopRequireDefault(_createComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (needs) {
    return function (Component) {
        return (0, _reactRedux.connect)(null, function (dispatch) {
            return {
                dispatchNeeds: function dispatchNeeds(props, nextProps) {
                    return Promise.all(needs.map((0, _dispatcher2.default)(dispatch, props, nextProps)));
                }
            };
        })((0, _createComponent2.default)(Component));
    };
};