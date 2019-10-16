import * as React from 'react';
import * as io from 'socket.io-client';

import Context from './context';

interface ProviderProps {
    url: string,
    namespaces?: Array<string>
    options?: object,
}

interface ProviderState {
    socket: SocketIOClient.Socket,
    namespaces: { [namespace: string]: SocketIOClient.Socket }
}

const getUrlOrigin = (url: string) =>
    new URL(url).origin;

const generateNamespaces = (props: ProviderProps) =>
    (result: object, namespace: string) =>
        ({ ...result, [namespace]: io(`${getUrlOrigin(props.url)}/${namespace}`, props.options) });

class Provider extends React.Component<ProviderProps, ProviderState> {
    constructor(props: ProviderProps) {
        super(props);
        const { url, options = {}, namespaces = [] } = props;

        this.state = {
            socket: io(url, options),
            namespaces: namespaces.reduce(generateNamespaces(props), {}),
        };
    }

    render() {
        const { children } = this.props;
        const { socket, namespaces } = this.state;

        return (
            <Context.Provider value={{ socket, namespaces }}>
                {children}
            </Context.Provider>
        );
    }
}

export default Provider;
