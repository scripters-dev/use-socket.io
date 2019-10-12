import { useContext, useEffect, useRef } from 'react';

import Context from './context';

type SocketCallbackType = (data: any) => void;

export default function useListener(eventName: string, callback: SocketCallbackType) {
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
}
