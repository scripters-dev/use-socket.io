import { useContext } from 'react';

import Context from './context';

export default function useEmit() {
    const socket = useContext(Context);

    if (socket) {
        return (eventName: string, eventData: any) => socket.emit(eventName, eventData);
    }
    return () => {
        console.warn('Socket is not initialized yet');
    };
}
