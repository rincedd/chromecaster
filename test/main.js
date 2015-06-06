jest.dontMock('../index.js');

import Chromecaster from '../index';

describe('Media loading', function() {
    let caster;

    beforeEach(() => {
        caster = new Chromecaster();
    });

    it('should return a promise', function() {
        expect(caster.loadMedia() instanceof Promise).toBe(true);
    });
});
