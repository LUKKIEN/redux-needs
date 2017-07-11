import mapParams from '../map-params';

describe('mapParams', () => {
    const originalObject = {
        key1: 'hello',
        key2: 'world',
        key3: 'test',
    };

    it('should return a new object containing the property keys', () => {
        const keys = ['key1', 'key2'];
        const object = { ...originalObject };
        const result = mapParams(keys, object);

        expect(object).toEqual(originalObject);
        expect(result).toEqual({
            key1: 'hello',
            key2: 'world',
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