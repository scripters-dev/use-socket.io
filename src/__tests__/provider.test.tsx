import * as React from 'react';
import { shallow } from 'enzyme';

import Provider from '../provider';
import mockSocket from './mocks/socket-mock';

const url = 'http://local.test/';

jest.mock('socket.io-client', () =>
    () =>
        mockSocket);

describe('Test provider', () => {
    const getWrapper = () =>
        shallow(
            <Provider url={url}>
        Test
            </Provider>,
        );

    it('should match snapshot', () => {
        expect(getWrapper()).toMatchSnapshot();
    });
});
