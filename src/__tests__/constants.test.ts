import { EVENTS } from '../constants';

describe('Test constants', () => {
    it('EVENTS is object', () => {
        expect(EVENTS).toBeInstanceOf(Object);
    });

    it('EVENTS match proper strings', () => {
        expect(EVENTS.CONNECT).toEqual('connect');
        expect(EVENTS.CONNECT_ERROR).toEqual('connect_error');
        expect(EVENTS.CONNECT_TIMEOUT).toEqual('connect_timeout');
        expect(EVENTS.DISCONNECT).toEqual('disconnect');
        expect(EVENTS.ERROR).toEqual('error');
        expect(EVENTS.RECONNECT).toEqual('reconnect');
        expect(EVENTS.RECONNECT_ATTEMPT).toEqual('reconnect_attempt');
        expect(EVENTS.RECONNECT_ERROR).toEqual('reconnect_error');
        expect(EVENTS.RECONNECT_FAILED).toEqual('reconnect_failed');
        expect(EVENTS.PING).toEqual('ping');
        expect(EVENTS.PONG).toEqual('pong');
    });
});
