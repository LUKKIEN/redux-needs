import { connect } from 'react-redux';

import needDispatcher from './dispatcher';
import createComponent from './create-component';

export default needs => Component =>
    connect(
        null,
        dispatch => ({
          dispatchNeeds: (props, nextProps) => Promise.all(
                needs.map(needDispatcher(dispatch, props, nextProps)),
            ),
        }),
    )(createComponent(Component));
