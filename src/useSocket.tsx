import { useContext } from 'react';

import Context from './context';
import { getSocketConnection } from './utils';

type useSocketType = (namespace?: string) => SocketIOClient.Socket | null;

const useSocket: useSocketType = (namespace?: string) =>
    getSocketConnection(useContext(Context))(namespace);

export default useSocket;
