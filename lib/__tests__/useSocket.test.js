"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_hooks_1 = require("@testing-library/react-hooks");
const provider_1 = require("../provider");
const useSocket_1 = require("../useSocket");
const socket_mock_1 = require("./mocks/socket-mock");
const url = 'http://local.test/';
jest.mock('socket.io-client', () => () => socket_mock_1.default);
describe('Test useSocket', () => {
    it('should be called', () => {
        const wrapper = ({ children }) => (React.createElement(provider_1.default, { url: url }, children));
        const { result } = react_hooks_1.renderHook(() => useSocket_1.default(), { wrapper });
        expect(result.current).toBeInstanceOf(Object);
        expect(result.current).toEqual(socket_mock_1.default);
    });
    it('should be called with namespaces', () => {
        const wrapper = ({ children }) => (React.createElement(provider_1.default, { url: url, namespaces: ['test'] }, children));
        const { result } = react_hooks_1.renderHook(() => useSocket_1.default('test'), { wrapper });
        expect(result.current).toBeInstanceOf(Object);
        expect(result.current).toEqual(socket_mock_1.default);
    });
});
