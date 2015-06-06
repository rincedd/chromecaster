jest.dontMock('../lib/chromecaster');

const Chromecaster = require('../lib/chromecaster');

describe('Chromecaster', () => {
    let caster;

    beforeEach(() => {
        caster = new Chromecaster();
    });

    it('should be instantiatable', () => {
        expect(caster).not.toBeUndefined();
        expect(caster instanceof Chromecaster).toBe(true);
    });

    it('should not have an active cast session by default', () => {
        expect(caster.isActive).toBe(false);
    });
});
