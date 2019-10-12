let connected = true;

export default ({
    id: 'test',
    connected,
    open: () => {},
    emit: () => {},
    on: () => {},
    disconnect: () => { connected = false; },
    hasListeners: () => false,
});
