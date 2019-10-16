import * as React from 'react';

export default React.createContext<{
    socket: SocketIOClient.Socket | null,
    namespaces: { [namespace: string]: SocketIOClient.Socket}
}>({ socket: null, namespaces: {} });
