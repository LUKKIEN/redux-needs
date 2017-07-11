import shallowEqual from 'react-redux/lib/utils/shallowEqual';
import mapParams from './map-params';

export default (dispatch, props, nextProps) => (need) => {
  if (typeof need === 'function') {
        // need without props, will only fire on componentDidMount
    if (props) {
      return Promise.resolve();
    }

    return dispatch(need({
      ...nextProps,
      dispatchNeeds: undefined,
    }));
  }

  const nextNeedProps = mapParams(need.props || [], nextProps);
  const action = need.action(nextNeedProps);

  if (!props) {
        // componentDidMount, so we should always dispatch
    return dispatch(action);
  }

  const needProps = mapParams(need.props || [], props);

    // re-fire if props have changed, or no explicit props are mentioned
  if (!need.props || !shallowEqual(needProps, nextNeedProps)) {
    return dispatch(action);
  }

  return Promise.resolve();
};
