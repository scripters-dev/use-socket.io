/// <reference types="socket.io-client" />
import * as React from 'react';
declare const _default: React.Context<{
    socket: SocketIOClient.Socket | null;
    namespaces: {
        [namespace: string]: SocketIOClient.Socket;
    };
}>;
export default _default;
