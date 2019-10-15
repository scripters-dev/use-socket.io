type getSocketConnectionType = (
    namespaces: { [namespace: string]: SocketIOClient.Socket },
    socket: SocketIOClient.Socket | null,
    namespace?: string,
) => SocketIOClient.Socket | null;

// eslint-disable-next-line
export const getSocketConnection: getSocketConnectionType = (namespaces, socket, namespace ) => {
    if (namespace && namespaces[namespace]) {
        return namespaces[namespace];
    }
    return socket;
};
