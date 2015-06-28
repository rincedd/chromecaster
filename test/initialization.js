import Chromecaster from '../lib/chromecaster';
import chrome from './mocks/chromecast';

describe('Chromecaster', () => {
    let caster;

    beforeEach(() => {
        global.chrome = chrome;
        caster = new Chromecaster();
    });

    afterEach(() => {
        global.chrome = undefined;
    });

    it('should be instantiatable', () => {
        expect(caster).to.exist;
        expect(caster).to.be.an.instanceof(Chromecaster);
    });

    it('should not have an active cast session by default', () => {
        expect(caster.isActive).to.be.false;
    });
});
