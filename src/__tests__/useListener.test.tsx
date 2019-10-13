import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import Provider from '../provider';
import useListener from '../useListener';
import mockSocket from './mocks/socket-mock';

const url = 'http://local.test/';

jest.mock('socket.io-client', () => () => mockSocket);

describe('Test useSocket', () => {
    beforeEach(() => {
        mockSocket.on.mockClear();
        mockSocket.removeListener.mockClear();
    });

    it('should be automatically called', () => {
        const wrapper = ({ children }: any) => (<Provider url={url}>{children}</Provider>);
        const { result } = renderHook(() => useListener('test', () => {}), { wrapper });

        expect(result.current).toBeInstanceOf(Array);
        expect(mockSocket.on).toBeCalledTimes(1);
        expect(mockSocket.removeListener).toBeCalledTimes(0);
        expect(result.current[0]).toBeInstanceOf(Function);
        expect(result.current[1]).toBeInstanceOf(Function);
    });

    it('should not be automatically called', () => {
        const wrapper = ({ children }: any) => (<Provider url={url}>{children}</Provider>);
        const { result } = renderHook(
            () => useListener('test', () => {}, { autoSubscribe: false }),
            { wrapper },
        );

        expect(result.current).toBeInstanceOf(Array);
        expect(mockSocket.on).toBeCalledTimes(0);
        expect(mockSocket.removeListener).toBeCalledTimes(0);
        expect(result.current[0]).toBeInstanceOf(Function);
        expect(result.current[1]).toBeInstanceOf(Function);
    });

    it('should be called after subscribe function call', () => {
        const wrapper = ({ children }: any) => (<Provider url={url}>{children}</Provider>);
        const { result } = renderHook(
            () => useListener('test', () => {}, { autoSubscribe: false }),
            { wrapper },
        );

        expect(result.current).toBeInstanceOf(Array);
        result.current[0]();

        expect(mockSocket.on).toBeCalledTimes(1);
        expect(mockSocket.removeListener).toBeCalledTimes(0);
        expect(result.current[0]).toBeInstanceOf(Function);
        expect(result.current[1]).toBeInstanceOf(Function);
    });

    it('should be subscribed and unsubscribed after functions calls', () => {
        const wrapper = ({ children }: any) => (<Provider url={url}>{children}</Provider>);
        const { result } = renderHook(
            () => useListener('test-failed', () => {}, { autoSubscribe: false }),
            { wrapper },
        );

        expect(result.current).toBeInstanceOf(Array);
        result.current[1]();

        expect(mockSocket.on).toBeCalledTimes(0);
        expect(mockSocket.removeListener).toBeCalledTimes(1);
        expect(result.current[0]).toBeInstanceOf(Function);
        expect(result.current[1]).toBeInstanceOf(Function);
    });
});
