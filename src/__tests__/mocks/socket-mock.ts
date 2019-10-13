let connected = true;

export default ({
    id: 'test',
    connected,
    open: jest.fn(),
    emit: jest.fn(),
    on: jest.fn(),
    removeListener: jest.fn(),
    disconnect: () => { connected = false; },
    hasListeners: (value: string) => value !== 'test',
});
