import PropTypes from 'prop-types';
import React from 'react';

export default (Component) => {
  class NeedyComponent extends React.Component {
    componentDidMount() {
      const props = {
        ...this.props,
        dispatchNeeds: undefined,
      };

      this.props.dispatchNeeds(null, props);
    }

    componentWillUpdate(nextProps) {
      this.props.dispatchNeeds(
        {
          ...this.props,
          dispatchNeeds: undefined,
        },
        {
          ...nextProps,
          dispatchNeeds: undefined,
        },
            );
    }

    render() {
      const otherProps = {
        ...this.props,
        dispatchNeeds: undefined,
      };
      return <Component {...otherProps} />;
    }
    }

  if (Component.defaultProps) {
    NeedyComponent.defaultProps = Component.defaultProps;
  }

  NeedyComponent.propTypes = {
    ...(Component.propTypes || {}),
    dispatchNeeds: PropTypes.func.isRequired,
  };

  return NeedyComponent;
};
