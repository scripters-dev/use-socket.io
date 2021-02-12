"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_hooks_1 = require("@testing-library/react-hooks");
const provider_1 = require("../provider");
const useListener_1 = require("../useListener");
const socket_mock_1 = require("./mocks/socket-mock");
const url = 'http://local.test/';
jest.mock('socket.io-client', () => () => socket_mock_1.default);
describe('Test useSocket', () => {
    beforeEach(() => {
        socket_mock_1.default.on.mockClear();
        socket_mock_1.default.removeListener.mockClear();
        socket_mock_1.cleanupListeners();
    });
    it('should be automatically called', () => {
        const wrapper = ({ children }) => (React.createElement(provider_1.default, { url: url }, children));
        const { result } = react_hooks_1.renderHook(() => useListener_1.default('test', () => { }), { wrapper });
        expect(result.current).toBeInstanceOf(Array);
        expect(socket_mock_1.default.on).toBeCalledTimes(1);
        expect(socket_mock_1.default.removeListener).toBeCalledTimes(0);
        expect(result.current[0]).toBeInstanceOf(Function);
        expect(result.current[1]).toBeInstanceOf(Function);
    });
    it('should not be automatically called', () => {
        const wrapper = ({ children }) => (React.createElement(provider_1.default, { url: url }, children));
        const { result } = react_hooks_1.renderHook(() => useListener_1.default('test', () => { }, { autoSubscribe: false }), { wrapper });
        expect(result.current).toBeInstanceOf(Array);
        expect(socket_mock_1.default.on).toBeCalledTimes(0);
        expect(socket_mock_1.default.removeListener).toBeCalledTimes(0);
        expect(result.current[0]).toBeInstanceOf(Function);
        expect(result.current[1]).toBeInstanceOf(Function);
    });
    it('should be called after subscribe function call', () => {
        const wrapper = ({ children }) => (React.createElement(provider_1.default, { url: url }, children));
        const { result } = react_hooks_1.renderHook(() => useListener_1.default('test', () => { }, { autoSubscribe: false }), { wrapper });
        expect(result.current).toBeInstanceOf(Array);
        result.current[0]();
        expect(socket_mock_1.default.on).toBeCalledTimes(1);
        expect(socket_mock_1.default.removeListener).toBeCalledTimes(0);
        expect(result.current[0]).toBeInstanceOf(Function);
        expect(result.current[1]).toBeInstanceOf(Function);
    });
    it('should be subscribed and unsubscribed after functions calls', () => {
        const wrapper = ({ children }) => (React.createElement(provider_1.default, { url: url }, children));
        const { result } = react_hooks_1.renderHook(() => useListener_1.default('test-failed', () => { }, { autoSubscribe: false }), { wrapper });
        expect(result.current).toBeInstanceOf(Array);
        result.current[0]();
        result.current[1]();
        expect(socket_mock_1.default.on).toBeCalledTimes(1);
        expect(socket_mock_1.default.removeListener).toBeCalledTimes(1);
        expect(result.current[0]).toBeInstanceOf(Function);
        expect(result.current[1]).toBeInstanceOf(Function);
    });
    it('should be subscribed only once', () => {
        const wrapper = ({ children }) => (React.createElement(provider_1.default, { url: url }, children));
        const { result } = react_hooks_1.renderHook(() => useListener_1.default('test-failed', () => { }, { autoSubscribe: false }), { wrapper });
        expect(result.current).toBeInstanceOf(Array);
        result.current[0]();
        result.current[0]();
        result.current[0]();
        expect(socket_mock_1.default.on).toBeCalledTimes(1);
        expect(socket_mock_1.default.removeListener).toBeCalledTimes(0);
        expect(result.current[0]).toBeInstanceOf(Function);
        expect(result.current[1]).toBeInstanceOf(Function);
    });
    it('should be subscribed and unsubscribed few times', () => {
        const wrapper = ({ children }) => (React.createElement(provider_1.default, { url: url }, children));
        const { result } = react_hooks_1.renderHook(() => useListener_1.default('test-failed', () => { }), { wrapper });
        expect(result.current).toBeInstanceOf(Array);
        result.current[0]();
        result.current[1]();
        result.current[0]();
        result.current[1]();
        result.current[0]();
        expect(socket_mock_1.default.on).toBeCalledTimes(3);
        expect(socket_mock_1.default.removeListener).toBeCalledTimes(2);
        expect(result.current[0]).toBeInstanceOf(Function);
        expect(result.current[1]).toBeInstanceOf(Function);
    });
});
