class MediaController {
    constructor(media) {
        this._media = media;
    }

    play() {
        return new Promise((resolve, reject) => {
            this._media.play(new chrome.cast.media.PlayRequest(), resolve, reject);
        });
    }

    pause() {
        return new Promise((resolve, reject) => {
            this._media.pause(new chrome.cast.media.PauseRequest(), resolve, reject);
        });
    }

    stop() {
        return new Promise((resolve, reject) => {
            this._media.stop(new chrome.cast.media.StopRequest(), resolve, reject);
        });
    }

    seek(pos) {
        return new Promise((resolve, reject) => {
            let request = new chrome.cast.media.SeekRequest();
            request.currentTime = pos || 0;
            this._media.seek(request, resolve, reject);
        });
    }
}

export default MediaController;
