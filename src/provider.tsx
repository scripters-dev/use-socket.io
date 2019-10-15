import * as React from 'react';
import * as io from 'socket.io-client';

import Context from './context';

interface ProviderProps {
    url: string,
    namespaces: Array<string>
    options?: object,
}

interface ProviderState {
    socket: SocketIOClient.Socket,
    namespaces: { [namespace: string]: SocketIOClient.Socket }
}

const generateNamespaces = (props: ProviderProps) =>
    (result: object, namespace: string) =>
        ({ ...result, [namespace]: io(`${props.url}/${namespace}`, props.options) });

class Provider extends React.Component<ProviderProps, ProviderState> {
    constructor(props: ProviderProps) {
        super(props);
        this.state = {
            socket: io(props.url, props.options || {}),
            namespaces: props.namespaces.reduce(generateNamespaces(props), {}),
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
