jest.dontMock('../lib/chromecaster');

const Chromecaster = require('../lib/chromecaster');

describe('Chromecaster', function() {
    it('should be instantiatable', function() {
        let caster = new Chromecaster();
        expect(caster).not.toBeUndefined();
        expect(caster instanceof Chromecaster).toBe(true);
    });
});
