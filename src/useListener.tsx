import {
    useContext,
    useEffect,
    useRef,
    useCallback,
} from 'react';

import Context from './context';

type SocketCallbackType = (data: any) => void;
type UseListenerOptions = {
    autoSubscribe?: boolean,
}

interface UseListenerReturn extends Array<() => void> {
    0: () => void;
    1: () => void
}

type useListenerFunction = (eventName: string, callback: SocketCallbackType, options?: UseListenerOptions) =>
    UseListenerReturn;

const useListener: useListenerFunction = (eventName, callback, options = {}) => {
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
        if (options.autoSubscribe !== false) {
            subscribeToEvent();
        }

        return () => {
            unsubscribeFromEvent();
        };
    }, []);

    return [
        subscribeToEvent,
        unsubscribeFromEvent,
    ];
};

export default useListener;
