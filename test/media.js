jest.dontMock('../lib/chromecaster');

// NOTE that ES6 imports with jest-babel don't work with jest.dontMock()
// @see https://github.com/babel/babel-jest/issues/16
const Chromecaster = require('../lib/chromecaster');

describe('Media loading', () => {
    let caster;

    beforeEach(() => {
        caster = new Chromecaster();
    });

    it('should return a promise', () => {
        expect(caster.loadMedia() instanceof Promise).toBe(true);
    });
});
