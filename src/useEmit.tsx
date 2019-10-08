import { useContext } from 'react';

import Context from './context';

export default function useListener(eventName: string, eventData: any) {
    const socket = useContext(Context);

    if (socket) {
        if (eventName && eventData) {
            return () => socket.emit(eventName, eventData);
        }
        return (data: any) => socket.emit(eventName, data);
    }
    return () => {};
}
