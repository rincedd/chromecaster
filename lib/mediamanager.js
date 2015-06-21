import { EventEmitter } from 'events';

let onMediaDiscovered = function onMediaDiscovered(media) {
    this._currentMedia = media;
    this._currentPlaybackTime = this._currentMedia.currentTime;
    this._mediaUpdateListener = onMediaStateUpdate.bind(this);
    this._currentMedia.addUpdateListener(this._mediaUpdateListener);
    this._startProgressTimer();
};

let onMediaStateUpdate = function() {

};

class MediaManager extends EventEmitter {
    constructor(castSession) {
        super();
        this._session = castSession;
        this._mediaListener = onMediaDiscovered.bind(this);
        this._session.addMediaListener(this._mediaListener);
        if (this._session.media.length > 0) {
            this._mediaListener(this._session.media[0]);
        }
    }

    _startProgressTimer() {

    }

    loadMedia(mediaInfo, customData = null, currentTime = 0, autoplay = true) {
        let loadRequest = new chrome.cast.media.LoadRequest(mediaInfo);
        loadRequest.autoplay = autoplay;
        loadRequest.currentTime = currentTime;
        loadRequest.customData = customData;
        this._isLoadingMedia = true;
        return new Promise((resolve, reject) => {
            this._session.loadMedia(loadRequest, (media) => {
                this._mediaListener(media);
                this._mediaUpdateListener(true);
                this._isLoadingMedia = false;
                resolve(media);
                this.emit('mediaLoaded', media);
            }, (error) => {
                this.isLoadingMedia = false;
                reject(error);
            });
        });
    }

    clear() {
        this._session.removeMediaListener(this._mediaListener);
        if (this._currentMedia) {
            this._currentMedia.removeUpdateListener(this._mediaUpdateListener);
        }
    }
}

export default MediaManager;
