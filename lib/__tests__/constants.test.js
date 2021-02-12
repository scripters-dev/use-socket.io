"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
describe('Test constants', () => {
    it('EVENTS is object', () => {
        expect(constants_1.EVENTS).toBeInstanceOf(Object);
    });
    it('EVENTS match proper strings', () => {
        expect(constants_1.EVENTS.CONNECT).toEqual('connect');
        expect(constants_1.EVENTS.CONNECT_ERROR).toEqual('connect_error');
        expect(constants_1.EVENTS.CONNECT_TIMEOUT).toEqual('connect_timeout');
        expect(constants_1.EVENTS.DISCONNECT).toEqual('disconnect');
        expect(constants_1.EVENTS.ERROR).toEqual('error');
        expect(constants_1.EVENTS.RECONNECT).toEqual('reconnect');
        expect(constants_1.EVENTS.RECONNECT_ATTEMPT).toEqual('reconnect_attempt');
        expect(constants_1.EVENTS.RECONNECT_ERROR).toEqual('reconnect_error');
        expect(constants_1.EVENTS.RECONNECT_FAILED).toEqual('reconnect_failed');
        expect(constants_1.EVENTS.PING).toEqual('ping');
        expect(constants_1.EVENTS.PONG).toEqual('pong');
    });
});
