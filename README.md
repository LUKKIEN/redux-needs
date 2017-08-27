# redux-needs &middot; [![Build Status](https://travis-ci.org/LUKKIEN/redux-needs.svg?branch=master)](https://travis-ci.org/LUKKIEN/redux-needs) [![codecov](https://codecov.io/gh/LUKKIEN/redux-needs/branch/master/graph/badge.svg)](https://codecov.io/gh/LUKKIEN/redux-needs)

> 🎁 Wrapping everyday data to your containers in need 🎁

Bind actions to changes in your Redux state based on the needs of your active
Redux components.

[Usage](#usage) |
[API](#api) |
[Installation](#installation) |
[License](#license)

## Usage

### Simple binding

Dispatch the `ping` action when `MyComponent` is mounted.

```js
import React from 'react';
import needs from 'redux-needs';

const ping = () => ({
  type: 'PING',
});

const MyComponent = () => (
  <h1>Hello, world!</h1>
);

export default needs([ ping ])(MyComponent);

```

### Complex binding

Dispatch the `ping` action when `MyComponent` is mounted and again every
time the value of the `name` property changes.

```js
import React from 'react';
import needs from 'redux-needs';

const ping = () => ({
  type: 'PING',
});

const MyComponent = ({ name }) => (
  <h1>Hello, { name }!</h1>
);

MyComponent.defaultProps = {
  name: 'world',
};

export default needs({
    props: [ 'name' ],
    action: ping,
})(MyComponent);

```

## API

### const binder = needs(bindings);

Returns a new binder method which, when called with a component, will return the
component wrapped with the configured bindings. This method is compatible with
the [Redux compose](http://redux.js.org/docs/api/compose.html#composefunctions)
method.

- `bindings` (required) - an array containing [bindings](#bindings)

### Bindings

#### Simple bindings

Simple bindings will trigger an action only once: when the component is mounted.

To add a simple binding just add an [action creator](http://redux.js.org/docs/basics/Actions.html#action-creators)
to the array of bindings. When the component is mounted the action creator will
be called with `this.props` and the resulting action will be dispatched.

Go to [the example](#simple-binding).

#### Complex bindings

Complex bindings will trigger an action when the component is mounted and again
when one or more of the bound properties change.

To add a complex binding add an object to array of bindings with two properties:
* `action` - the [action creator](http://redux.js.org/docs/basics/Actions.html#action-creators)
* `props` - an array of strings describing the properties of the component to
watch

The `prop` field can contain nested properties. For example; given the following
object, the `c` property with a value of `3` can be bound to using `a[0].b.c`:

```js
{
  "a": [
    { "b": { "c": 3 } },
    { "b": { "c": 4 } }
  ],
  "d": 5
};
```

When binding to specific values, the action creator will be called with a subset
of `this.props` matching the bound property paths. In the case of the previous
example, this would mean the action creator would be called with the follwing
object:

```js
{
  "a": [
    { "b": { "c": 3 }
  ]
}
```

**Note:** the action creators will sometimes be called even if the action will
not be dispatched. As this could potentially be every time `componentWillUpdate`
is called on your component, your action creators should be lightweigth methods.

Go to [the example](#complex-binding).

## Installation

With [npm](https://npmjs.org/) installed, run

```
$ npm install redux-needs
```

Or with [yarn](https://yarnpkg.com/) installed, run

```
$ yarn add redux-needs
```

## Peer dependencies

This library uses the following peer dependencies, which will probably already
be included in your project if it's uses Redux and React:

* _react_: 15.5.x
* _react-redux_: 5.x.x
* _redux_: 3.7.x

## License

The `redux-needs` package is distributed under the 3-Clause BSD License.
Check the [LICENSE](LICENSE) file for details.