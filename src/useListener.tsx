import {
    useContext,
    useEffect,
    useRef,
    useCallback,
} from 'react';

import Context from './context';

type SocketCallbackType = (data: any) => void;

interface UseListenerReturn extends Array<() => void> {
    0: () => void;
    1: () => void
}

export default function useListener(eventName: string, callback: SocketCallbackType): UseListenerReturn {
    const socket = useContext(Context);
    const callbackRef = useRef(callback);

    const subscribeToEvent = useCallback(() => {
        if (socket && !socket.hasListeners(eventName)) {
            socket.on(eventName, callbackRef.current);
        }
    }, [socket, eventName]);

    const unsubscribeFromEvent = useCallback(() => {
        if (socket && socket.hasListeners(eventName)) {
            socket.removeListener(eventName, callbackRef.current);
        }
    }, [socket, eventName]);

    useEffect(() => {
        subscribeToEvent();

        return () => {
            unsubscribeFromEvent();
        };
    }, []);

    return [
        subscribeToEvent,
        unsubscribeFromEvent,
    ];
}
