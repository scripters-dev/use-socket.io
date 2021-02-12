"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let connected = true;
let listeners = [];
exports.default = ({
    id: 'test',
    connected,
    open: jest.fn(),
    emit: jest.fn(),
    on: jest.fn((eventName) => listeners.push(eventName)),
    removeListener: jest.fn((eventName) => {
        listeners = listeners.filter((event) => event !== eventName);
    }),
    disconnect: () => { connected = false; },
    hasListeners: (eventName) => listeners.includes(eventName),
});
exports.cleanupListeners = () => {
    listeners = [];
};
