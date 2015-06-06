jest.dontMock('../index.js');

import Chromecaster from '../index.js';

describe('Chromecaster', function() {
    it('should be instantiatable', function() {
        let caster = new Chromecaster();
        expect(caster).not.toBeUndefined();
        expect(caster instanceof Chromecaster).toBe(true);
    });
});
