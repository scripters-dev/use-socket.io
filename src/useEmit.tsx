import { useContext } from 'react';

import Context from './context';
import { getSocketConnection } from './utils';

interface emitOptions {
    namespace?: string,
}

type useEmitType = (options?: emitOptions) =>
    (eventName: string, eventData: any) => void;

const emitEvent = (socketConnection: SocketIOClient.Socket) =>
    (eventName: string, eventData: any) =>
        socketConnection.emit(eventName, eventData);

const useEmit: useEmitType = (options = {}) => {
    const socketConnection = getSocketConnection(useContext(Context))(options.namespace);

    if (socketConnection) {
        return emitEvent(socketConnection);
    }
    return () => {
        console.warn('Emit failed - socket is not initialized'); // eslint-disable-line
    };
};

export default useEmit;
