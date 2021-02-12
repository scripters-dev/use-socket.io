"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const enzyme_1 = require("enzyme");
const provider_1 = require("../provider");
const socket_mock_1 = require("./mocks/socket-mock");
const url = 'http://local.test/';
jest.mock('socket.io-client', () => () => socket_mock_1.default);
describe('Test provider', () => {
    const getWrapper = () => enzyme_1.shallow(React.createElement(provider_1.default, { url: url }, "Test"));
    const getAdvancedWrapper = () => enzyme_1.shallow(React.createElement(provider_1.default, { url: url, options: { forceNew: false }, namespaces: ['test', 'mock'] }, "Test"));
    it('basic example should match snapshot', () => {
        expect(getWrapper()).toMatchSnapshot();
    });
    it('advanced example should match snapshot', () => {
        expect(getAdvancedWrapper()).toMatchSnapshot();
    });
});
