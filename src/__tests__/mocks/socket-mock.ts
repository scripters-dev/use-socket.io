let connected = true;

export default jest.mock('socket.io-client', () => () => ({
    id: 'test',
    connected,
    open: () => {},
    emit: () => {},
    on: () => {},
    disconnect: () => { connected = false; },
}));
