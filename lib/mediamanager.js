import { EventEmitter } from 'events';
import MediaController from './mediacontroller';

let onMediaDiscovered = function onMediaDiscovered(media) {
    if (this._currentMedia) {
        this._currentMedia.removeUpdateListener(this._mediaUpdateListener);
    }
    this._currentMedia = media;
    this._mediaController = new MediaController(this._currentMedia);
    this._currentPlaybackTime = this._currentMedia.getEstimatedTime();
    this._mediaUpdateListener = onMediaStateUpdate.bind(this);
    this._currentMedia.addUpdateListener(this._mediaUpdateListener);
};

let onMediaStateUpdate = function(mediaIsAlive) {
    if (this._currentMedia.playerState === chrome.cast.media.PlayerState.IDLE) {
        if (this._currentMedia.idleReason === chrome.cast.media.IdleReason.FINISHED) {
            this._currentMedia.currentTime = this._currentMedia.media.duration;
            //this.emitMediaState();
            this.emit('ended');
        } else if (this._currentMedia.idleReason === chrome.cast.media.IdleReason.INTERRUPTED) {
            // work around currentTime being set to zero by the cast extension when cast is interrupted
            // by other sender
            this._currentMedia.currentTime = this._currentPlaybackTime;
            //this.emitMediaState();
            if (!this._isLoadingMedia) {
                this.emit('interrupted');
            }
        }
    } else if (mediaIsAlive) {
        //this.emitMediaState();
    }
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
                resolve(this.mediaController);
                this.emit('mediaLoaded', media);
            }, (error) => {
                this.isLoadingMedia = false;
                reject(error);
            });
        });
    }

    get mediaController() {
        return this._mediaController;
    }

    clear() {
        this._session.removeMediaListener(this._mediaListener);
        if (this._currentMedia) {
            this._currentMedia.removeUpdateListener(this._mediaUpdateListener);
        }
    }
}

export default MediaManager;
