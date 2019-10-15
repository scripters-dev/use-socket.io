import {
    useContext,
    useEffect,
    useRef,
    useCallback,
} from 'react';

import Context from './context';
import { getSocketConnection } from './utils';

type SocketCallbackType = (data: any) => void;
type UseListenerOptions = {
    namespace?: string,
    autoSubscribe?: boolean,
}

interface UseListenerReturn extends Array<() => void> {
    0: () => void;
    1: () => void
}

type useListenerFunction = (eventName: string, callback: SocketCallbackType, options?: UseListenerOptions) =>
    UseListenerReturn;

const useListener: useListenerFunction = (eventName, callback, options = {}) => {
    const { socket, namespaces } = useContext(Context);
    const socketConnection = getSocketConnection(namespaces, socket, options.namespace);
    const callbackRef = useRef(callback);

    const subscribeToEvent = useCallback(() => {
        if (socketConnection && !socketConnection.hasListeners(eventName)) {
            socketConnection.on(eventName, callbackRef.current);
        }
    }, [socketConnection, eventName]);

    const unsubscribeFromEvent = useCallback(() => {
        if (socketConnection && socketConnection.hasListeners(eventName)) {
            socketConnection.removeListener(eventName, callbackRef.current);
        }
    }, [socketConnection, eventName]);

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
