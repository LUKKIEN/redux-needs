import get from 'lodash.get';
import set from 'lodash.set';

export default (paramKeys, params) =>
    paramKeys.reduce((acc, key) => set({ ...acc }, key, get(params, key)), {});
