import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import Provider from '../provider';
import useEmit from '../useEmit';
import mockSocket from './mocks/socket-mock';

const url = 'http://local.test/';

jest.mock('socket.io-client', () =>
    () =>
        mockSocket);

describe('Test useEmit', () => {
    it('should be called', () => {
        const wrapper = ({ children }: any) =>
            (<Provider url={url}>{children}</Provider>);
        const { result } = renderHook(() =>
            useEmit(), { wrapper });

        expect(result.current).toBeInstanceOf(Function);
        expect(result.current('event', 'test')).toBeUndefined();
    });
});
