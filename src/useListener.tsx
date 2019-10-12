import { useContext, useEffect, useRef } from 'react';

import Context from './context';

type SocketCallbackType = (data: any) => void;

interface UseListenerReturn extends Array<() => void>{0:() => void; 1:() => void}

export default function useListener(eventName: string, callback: SocketCallbackType): UseListenerReturn {
    const socket = useContext(Context);

    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    const callbackHandler = (data: any): void => callback(data);

    useEffect(() => {
        if (socket && eventName) {
            socket.on(eventName, callbackHandler);
            return () => {
                socket.removeListener(eventName, callbackHandler);
            };
        }
        return () => {};
    }, [eventName]);

    return [
        () => (socket && !socket.hasListeners(eventName) ? socket.on(eventName, callbackHandler) : null),
        () => (socket ? socket.removeListener(eventName, callbackHandler) : null),
    ];
}
