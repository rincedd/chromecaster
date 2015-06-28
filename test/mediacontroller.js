import MediaController from '../lib/mediacontroller';
import chrome from './mocks/chromecast';

describe('The media controller', () => {
    let media, mediaController;

    beforeEach(() => {
        global.chrome = chrome;
        media = {
            play: sinon.stub().callsArg(1),
            pause: sinon.stub().callsArg(1),
            seek: sinon.stub().callsArg(1),
            stop: sinon.stub().callsArg(1)
        };
        mediaController = new MediaController(media);
    });

    afterEach(() => {
        global.chrome = undefined;
    });

    it('should start playback on play()', (done) => {
        mediaController.play().then(() => {
            expect(media.play).to.have.been.called;
            done();
        }).catch(done);
    });
});
