"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_hooks_1 = require("@testing-library/react-hooks");
const provider_1 = require("../provider");
const useEmit_1 = require("../useEmit");
const socket_mock_1 = require("./mocks/socket-mock");
const url = 'http://local.test/';
jest.mock('socket.io-client', () => () => socket_mock_1.default);
describe('Test useEmit', () => {
    it('should be called', () => {
        const wrapper = ({ children }) => (React.createElement(provider_1.default, { url: url }, children));
        const { result } = react_hooks_1.renderHook(() => useEmit_1.default(), { wrapper });
        expect(result.current).toBeInstanceOf(Function);
        expect(result.current('event', 'test')).toBeUndefined();
    });
});
