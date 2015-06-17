import { expect } from 'chai';
import Chromecaster from '../lib/chromecaster';

describe('Chromecaster', () => {
    let caster;

    beforeEach(() => {
        caster = new Chromecaster();
    });

    it('should be instantiatable', () => {
        expect(caster).to.exist;
        expect(caster).to.be.an.instanceof(Chromecaster);
    });

    it('should not have an active cast session by default', () => {
        expect(caster.isActive).to.be.false;
    });
});
