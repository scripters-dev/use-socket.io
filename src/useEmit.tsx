import { useContext } from 'react';

import Context from './context';
import { getSocketConnection } from './utils';

interface emitOptions {
    namespace?: string,
}

const emitEvent = (socketConnection: SocketIOClient.Socket) =>
    (eventName: string, eventData: any) =>
        socketConnection.emit(eventName, eventData);

export default function useEmit(options: emitOptions) {
    const { socket, namespaces } = useContext(Context);
    const socketConnection = getSocketConnection(namespaces, socket, options.namespace);

    if (socketConnection) {
        return emitEvent(socketConnection);
    }
    return () => {
        console.warn('Emit failed - socket is not initialized'); // eslint-disable-line
    };
}
