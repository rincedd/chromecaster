import MediaController from '../lib/mediacontroller';

describe('The media controller', () => {
    let media, mediaController;

    beforeEach(() => {
        media = {};
        mediaController = new MediaController(media);
    });

    it('should start playback on play()', () => {
        return expect(mediaController.play()).to.be.resolved;
    });
});
