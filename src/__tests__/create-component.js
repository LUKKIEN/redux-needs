import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import PropTypes from 'prop-types';

import createComponent from '../create-component';

const mockStore = configureMockStore();
const store = mockStore({});
const DummyComponent = jest.fn(() => <div />);
const dispatchNeeds = jest.fn(() => Promise.resolve());

describe('Needy component', () => {
  const props = {
    firstProp: 'test1',
    secondProp: 'test2',
  };

  beforeEach(() => {
    store.clearActions();
    DummyComponent.mockClear();
    dispatchNeeds.mockClear();
  });

  it('Should inherit the defaultProps and propTypes of the component', () => {
    const AnotherDummyComponent = () => <div />;

    AnotherDummyComponent.propTypes = {
      myProp: PropTypes.number.isRequired,
    };

    AnotherDummyComponent.defaultProps = {
      myProp: 123,
    };

    const NeedyComponent = createComponent(AnotherDummyComponent);

    expect(NeedyComponent.defaultProps).toBe(AnotherDummyComponent.defaultProps);
    expect(NeedyComponent.propTypes).toEqual({
      ...AnotherDummyComponent.propTypes,
      dispatchNeeds: PropTypes.func.isRequired,
    });
  });

  it('should trigger dispatchNeeds when the props change', () => {
    const NeedyComponent = createComponent(DummyComponent);

    const nextProps = {
      ...props,
      secondProp: 'test3',
      thirdProp: 'test4',
    };

    const wrapper = mount(
      <NeedyComponent
        dispatchNeeds={dispatchNeeds}
        {...props}
      >
                My children
            </NeedyComponent>,
        );

    wrapper.setProps(nextProps);

        // check the value of the props
    expect(dispatchNeeds.mock.calls).toEqual([
      [
        null,
        {
          ...props,
          children: 'My children',
        },
      ],
      [
        {
          ...props,
          children: 'My children',
        },
        {
          ...nextProps,
          children: 'My children',
        },
      ],
    ]);
  });
});
