import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import Provider from '../provider';
import useListener from '../useListener';
import mockSocket from './mocks/socket-mock';

const url = 'http://local.test/';

jest.mock('socket.io-client', () => () => mockSocket);

describe('Test useSocket', () => {
    it('should be called', () => {
        const wrapper = ({ children }: any) => (<Provider url={url}>{children}</Provider>);
        const { result } = renderHook(() => useListener('test', () => {}), { wrapper });

        expect(result.current).toBeInstanceOf(Object);
        expect(result.current[0]).toBeInstanceOf(Function);
        expect(result.current[1]).toBeInstanceOf(Function);
    });
});
