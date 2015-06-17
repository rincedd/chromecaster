import Chromecaster from '../lib/chromecaster';

describe('Media loading', () => {
    let caster;

    beforeEach(() => {
        caster = new Chromecaster();
    });

    it('should return a promise', () => {
        expect(caster.loadMedia()).to.be.an.instanceof(Promise);
    });
});
