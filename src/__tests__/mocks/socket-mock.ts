let connected = true;
let listeners: Array<string> = [];

export default ({
    id: 'test',
    connected,
    open: jest.fn(),
    emit: jest.fn(),
    on: jest.fn((eventName) => listeners.push(eventName)),
    removeListener: jest.fn((eventName) => {
        listeners = listeners.filter((event) => event !== eventName);
    }),
    disconnect: () => { connected = false; },
    hasListeners: (eventName: string) => listeners.includes(eventName),
});

export const cleanupListeners = () => {
    listeners = [];
};
