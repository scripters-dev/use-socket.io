/// <reference types="socket.io-client" />
import * as React from 'react';
interface ProviderProps {
    url: string;
    namespaces?: Array<string>;
    options?: object;
}
interface ProviderState {
    socket: SocketIOClient.Socket;
    namespaces: {
        [namespace: string]: SocketIOClient.Socket;
    };
}
declare class Provider extends React.Component<ProviderProps, ProviderState> {
    constructor(props: ProviderProps);
    render(): JSX.Element;
}
export default Provider;
