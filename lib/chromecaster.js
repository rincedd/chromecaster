import { EventEmitter } from 'events';
import MediaManager from './mediamanager';

var waitForCastApi = (maxTries = 3) => {
    return new Promise((resolve, reject) => {
        let numberOfTries = 0,
            checkForChromecast = () => {
                numberOfTries++;
                if (chrome.cast && chrome.cast.isAvailable) {
                    resolve();
                } else if (numberOfTries < maxTries) {
                    setTimeout(checkForChromecast, 1000);
                } else {
                    reject(new Error('Failed to initialize cast API'));
                }
            };
        if (typeof chrome === 'undefined') {
            reject(new Error('Chrome namespace is undefined'));
        } else {
            checkForChromecast(resolve);
        }
    });
};

class Chromecaster extends EventEmitter {
    constructor(appId) {
        super();
        this._appId = appId;
        waitForCastApi().then(() => {
            this._init();
        }).catch((err) => {
            console.error(err);
        });
    }

    _init() {
        let sessionRequest = new chrome.cast.SessionRequest(this._appId);
        let apiConfig = new chrome.cast.ApiConfig(
            sessionRequest,
            this._sessionListener.bind(this),
            this._receiverListener.bind(this),
            chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
        );
        chrome.cast.initialize(apiConfig, () => {
        }, console.error.bind(console));
    }

    _sessionListener(session) {
        this._session = session;
        this._session.addUpdateListener(this._onSessionStatusChanged.bind(this));
        this._mediaManager = new MediaManager(this._session);

        // TODO store session ID here

        this.emit('joinedSession');
    }

    _receiverListener(status) {
        this._castAvailable = status === chrome.cast.ReceiverAvailability.AVAILABLE;
        this.emit('availabilitychange', this._castAvailable);
    }

    _onSessionStatusChanged() {

    }

    get isActive() {
        return !!this._session;
    }

    get isCastAvailable() {
        return this._castAvailable;
    }

    get receiverName() {
        return this._session ? this._session.receiver.friendlyName : '';
    }

    loadMedia(media) {
        return Promise.resolve().then(() => {
            if (this._mediaManager) {
                return this._mediaManager.loadMedia(media);
            }
            throw new Error('No media manager present. Do we have an active cast session?');
        });
    }

    launch() {
        return new Promise((resolve, reject) => {
            chrome.cast.requestSession((session) => {
                this._sessionListener(session);
                resolve(session);
            }, reject);
        });
    }
}

export default Chromecaster;
