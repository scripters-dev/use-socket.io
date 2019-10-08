import * as React from 'react';

export default React.createContext<SocketIOClient.Socket | null>(null);
