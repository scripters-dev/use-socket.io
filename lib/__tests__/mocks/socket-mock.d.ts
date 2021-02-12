/// <reference types="jest" />
declare const _default: {
    id: string;
    connected: boolean;
    open: jest.Mock<any, any>;
    emit: jest.Mock<any, any>;
    on: jest.Mock<number, [any]>;
    removeListener: jest.Mock<void, [any]>;
    disconnect: () => void;
    hasListeners: (eventName: string) => boolean;
};
export default _default;
export declare const cleanupListeners: () => void;
