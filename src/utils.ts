interface contextParams {
    socket: SocketIOClient.Socket | null,
    namespaces?: { [namespace: string]: SocketIOClient.Socket },
};

type getSocketConnectionType = (params: contextParams) => (namespace?: string) => SocketIOClient.Socket | null;

// eslint-disable-next-line
export const getSocketConnection: getSocketConnectionType = ({ socket, namespaces }) => (namespace) => {
    if (namespace && namespaces && namespaces[namespace]) {
        return namespaces[namespace];
    }
    return socket;
};
