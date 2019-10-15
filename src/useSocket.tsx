import { useContext } from 'react';

import Context from './context';
import { getSocketConnection } from './utils';

export default function useSocket(namespace?: string) {
    const { socket, namespaces } = useContext(Context);

    return getSocketConnection(namespaces, socket, namespace);
}
