let chrome = {
    cast: {
        media: {
            LoadRequest: sinon.spy(),
            PlayerState: {
                IDLE: 'idle'
            },
            IdleReason: {
                FINISHED: 'finished',
                INTERRUPTED: 'interrupted'
            },
            PlayRequest: sinon.spy(),
            SeekRequest: sinon.spy(),
            PauseRequest: sinon.spy(),
            StopRequest: sinon.spy()
        }
    }
};

export default chrome;
