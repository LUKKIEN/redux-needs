export default (paramKeys, params) =>
    paramKeys.reduce((acc, key) => ({ ...acc, [key]: params[key] }), {});
