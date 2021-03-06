import MediaManager from '../lib/mediamanager';
import chrome from './mocks/chromecast';

describe('Media loading', () => {
    let manager, session, media = {};

    beforeEach(() => {
        media = {
            addUpdateListener: sinon.spy(),
            removeUpdateListener: sinon.spy(),
            getEstimatedTime: sinon.spy()
        };
        session = {
            media: [],
            addMediaListener: sinon.spy(),
            loadMedia: sinon.stub().callsArgWith(1, media)
        };
        global.chrome = chrome;
        manager = new MediaManager(session);
    });

    afterEach(() => {
        global.chrome = undefined;
    });

    it('should return a promise', () => {
        expect(manager.loadMedia()).to.be.an.instanceof(Promise);
    });

    it('should call loadMedia on the cast session', function() {
        manager.loadMedia();
        expect(session.loadMedia).to.have.been.called;
    });

    describe('mediaLoaded event', () => {
        let listener;

        beforeEach(() => {
            listener = sinon.spy();
            manager.on('mediaLoaded', listener);
        });

        it('should emit mediaLoaded on success', () => {
            let promise = manager.loadMedia();
            expect(listener).to.have.been.called;
            return expect(promise).to.eventually.have.property('_media', media);
        });

        it('should not emit mediaLoaded event on failure', () => {
            session.loadMedia = sinon.stub().callsArgWith(2, new Error('Fail'));

            let promise = manager.loadMedia();
            expect(listener).not.to.have.been.called;
            return expect(promise).to.be.rejected;
        });
    });
});
