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

    const getAdvancedWrapper = () =>
        shallow(
            <Provider url={url} options={{ forceNew: false }} namespaces={['test', 'mock']}>
                Test
            </Provider>,
        );

    it('basic example should match snapshot', () => {
        expect(getWrapper()).toMatchSnapshot();
    });

    it('advanced example should match snapshot', () => {
        expect(getAdvancedWrapper()).toMatchSnapshot();
    });
});
