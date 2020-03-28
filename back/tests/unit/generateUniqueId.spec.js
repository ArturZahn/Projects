const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate unique ID', () => {
    it('shoud have 8 characters',() => {
        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    })
});