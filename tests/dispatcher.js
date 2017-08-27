import needDispatcher from '../src/dispatcher';

describe('needDispatcher', () => {
  const dispatch = jest.fn(() => Promise.resolve());
  const props = {
    firstProp: 'test1',
    secondProp: 'test2',
  };

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('should re-dispatch needs if (and only if) their relevant props have changed', () => {
    const need1 = {
      props: ['firstProp'],
      action: jest.fn(() => ({
        type: 'ACTION_NEED_1',
      })),
    };

    const need2 = {
      props: ['secondProp', 'firstProp'],
      action: jest.fn(() => ({
        type: 'ACTION_NEED_2',
      })),
    };

    const need3 = {
      props: ['secondProp'],
      action: jest.fn(() => ({
        type: 'ACTION_NEED_3',
      })),
    };

    const need4 = {
      action: jest.fn(() => ({
        type: 'ACTION_NEED_4',
      })),
    };

    const nextProps = {
      ...props,
      firstProp: 'test2',
    };

        // initial load, no props, only nextProps
    [need1, need2, need3, need4]
            .forEach(needDispatcher(dispatch, null, props));

        // initial load, changing firstProp
    [need1, need2, need3, need4]
            .forEach(needDispatcher(dispatch, props, nextProps));

    expect(need1.action.mock.calls).toEqual([
      [
                { firstProp: props.firstProp },
      ],
      [
                { firstProp: nextProps.firstProp },
      ],
    ]);

    expect(need2.action.mock.calls).toEqual([
      [
        {
          firstProp: props.firstProp,
          secondProp: props.secondProp,
        },
      ],
      [
        {
          firstProp: nextProps.firstProp,
          secondProp: nextProps.secondProp,
        },
      ],
    ]);

    expect(need3.action.mock.calls).toEqual([
      [
                { secondProp: props.secondProp },
      ],
      [
                { secondProp: nextProps.secondProp },
      ],
    ]);

    expect(need4.action.mock.calls).toEqual([
      [
                {},
      ],
      [
                {},
      ],
    ]);

    expect(dispatch.mock.calls).toEqual([
            // initial needs should be dispatched
      [
                { type: 'ACTION_NEED_1' },
      ],
      [
                { type: 'ACTION_NEED_2' },
      ],
      [
                { type: 'ACTION_NEED_3' },
      ],
      [
                { type: 'ACTION_NEED_4' },
      ],

            // only needs relying on firstProp should re-fire
      [
                { type: 'ACTION_NEED_1' },
      ],
      [
                { type: 'ACTION_NEED_2' },
      ],
      [
                { type: 'ACTION_NEED_4' },
      ],
    ]);
  });

  it('should not re-dispatch function-style needs on prop change', () => {
    const need1 = jest.fn(() => ({
      type: 'ACTION_NEED_1',
    }));

    const nextProps = {
      ...props,
      firstProp: 'test2',
    };

        // initial load, no props, only nextProps
    needDispatcher(dispatch, null, props)(need1);

        // initial load, changing firstProp
    needDispatcher(dispatch, props, nextProps)(need1);

    expect(need1.mock.calls).toEqual([
      [
        props,
      ],
    ]);

    expect(dispatch.mock.calls).toEqual([
      [
                { type: 'ACTION_NEED_1' },
      ],
    ]);
  });
});
