import mapParams from '../src/map-params';

describe('mapParams', () => {
  const originalObject = {
    key1: 'hello',
    key2: 'world',
    key3: 'test',
    key4: {
      deep: 'props',
      with: 'multiple',
    },
  };

  it('should return a new object containing the property keys', () => {
    const keys = ['key1', 'key2', 'key4.deep'];
    const object = { ...originalObject };
    const result = mapParams(keys, object);

    expect(object).toEqual(originalObject);
    expect(result).toEqual({
      key1: 'hello',
      key2: 'world',
      key4: {
        deep: 'props',
      },
    });
  });

  it('should return an empty object if no keys are provided', () => {
    const keys = [];
    const object = { ...originalObject };
    const result = mapParams(keys, object);

    expect(object).toEqual(originalObject);
    expect(result).toEqual({});
  });

  it('should ignore keys that are not set on the object', () => {
    const keys = ['key1', 'myKey'];
    const object = { ...originalObject };
    const result = mapParams(keys, object);

    expect(object).toEqual(originalObject);
    expect(result).toEqual({
      key1: 'hello',
    });
  });
});
