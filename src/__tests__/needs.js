import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import needs from '../needs';

const mockStore = configureMockStore();
const store = mockStore({});
const DummyComponent = jest.fn(() => <div />);
const dispatchNeeds = jest.fn(() => Promise.resolve());

describe('Needs method', () => {
  const props = {
    firstProp: 'test1',
    secondProp: 'test2',
  };

  beforeEach(() => {
    store.clearActions();
    DummyComponent.mockClear();
    dispatchNeeds.mockClear();
  });

  it('Passes all all props to the needy component', () => {
    const WrappedComponent = needs([])(DummyComponent);

    mount(
      <Provider store={store}>
        <WrappedComponent {...props}>My children</WrappedComponent>
      </Provider>,
        );

        // it should be called only once
    expect(DummyComponent.mock.calls.length).toEqual(1);

        // with at least a props argument
    expect(DummyComponent.mock.calls[0].length).toBeGreaterThan(1);

        // check the value of the props
    expect(DummyComponent.mock.calls[0][0]).toEqual({
      ...props,
      children: 'My children',
    });
  });

  it('should still fire the needs if it has no props', () => {
    const WrappedComponent = needs([])(DummyComponent);

    mount(
      <Provider store={store}>
        <WrappedComponent>My children</WrappedComponent>
      </Provider>,
        );

        // it should be called only once
    expect(DummyComponent.mock.calls.length).toEqual(1);

        // with at least a props argument
    expect(DummyComponent.mock.calls[0].length).toBeGreaterThan(1);

        // check the value of the props
    expect(DummyComponent.mock.calls[0][0]).toEqual({
      children: 'My children',
    });
  });

  it('should call funcion-style needs with all props of the component', () => {
    const need1 = jest.fn(() => ({
      type: 'SOME_ACTION',
    }));

    const need2 = jest.fn(() => ({
      type: 'SOME_OTHER_ACTION',
    }));

    const WrappedComponent = needs([
      need1,
      need2,
    ])(DummyComponent);

    mount(
      <Provider store={store}>
        <WrappedComponent {...props}>My children</WrappedComponent>
      </Provider>,
        );

        // all actions should have been called with all props to pass to dispatch
    expect(need1.mock.calls).toEqual([
      [{
        ...props,
        children: 'My children',
      }],
    ]);
    expect(need2.mock.calls).toEqual([
      [{
        ...props,
        children: 'My children',
      }],
    ]);

        // check if the actions have been dispatched
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should call prop-style needs with all props relevant to the need', () => {
    const need1 = jest.fn(() => ({
      type: 'SOME_ACTION',
    }));

    const need2 = jest.fn(() => ({
      type: 'SOME_OTHER_ACTION',
    }));

    const WrappedComponent = needs([
      {
        props: ['firstProp'],
        action: need1,
      },
      {
        props: ['secondProp'],
        action: need2,
      },
    ])(DummyComponent);

    mount(
      <Provider store={store}>
        <WrappedComponent {...props}>My children</WrappedComponent>
      </Provider>,
        );

        // all actions should have been called with all props to pass to dispatch
    expect(need1.mock.calls).toEqual([
      [{
        firstProp: props.firstProp,
      }],
    ]);
    expect(need2.mock.calls).toEqual([
      [{
        secondProp: props.secondProp,
      }],
    ]);

        // check if the actions have been dispatched
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should gracefully handle non-existent props', () => {
    const need1 = jest.fn(() => ({
      type: 'SOME_ACTION',
    }));

    const WrappedComponent = needs([
      {
        props: ['firstProp', 'waitWhat'],
        action: need1,
      },
    ])(DummyComponent);

    mount(
      <Provider store={store}>
        <WrappedComponent {...props}>My children</WrappedComponent>
      </Provider>,
        );

        // all actions should have been called with all props to pass to dispatch
    expect(need1.mock.calls).toEqual([
      [{
        firstProp: props.firstProp,
      }],
    ]);

        // check if the actions have been dispatched
    expect(store.getActions()).toMatchSnapshot();
  });
});
