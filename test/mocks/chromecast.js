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
            }
        }
    }
};

export default chrome;
