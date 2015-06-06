class Chromecaster {
    get isActive() {
        return !!this.session;
    }

    loadMedia() {
        return Promise.resolve();
    }
}

export default Chromecaster;
