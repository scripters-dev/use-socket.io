import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import Provider from '../provider';
import useSocket from '../useSocket';
import mockSocket from './mocks/socket-mock';

const url = 'http://local.test/';

jest.mock('socket.io-client', () => () => mockSocket);

describe('Test useSocket', () => {
    it('should be called', () => {
        const wrapper = ({ children }: any) => (<Provider url={url}>{children}</Provider>);
        const { result } = renderHook(() => useSocket(), { wrapper });

        expect(result.current).toBeInstanceOf(Object);
        expect(result.current).toEqual(mockSocket);
    });
});
