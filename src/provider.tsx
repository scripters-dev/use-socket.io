import * as React from 'react';
import * as io from 'socket.io-client';

import Context from './context';

interface ProviderProps {
    url: string,
    options: object,
}

interface ProviderState {
    socket: SocketIOClient.Socket,
}

class Provider extends React.Component<ProviderProps, ProviderState> {
    constructor(props: ProviderProps) {
        super(props);
        this.state = {
            socket: io(props.url, props.options),
        };
    }

    render() {
        const { children } = this.props;
        const { socket } = this.state;

        return (
            <Context.Provider value={socket}>
                {children}
            </Context.Provider>
        );
    }
}

export default Provider;
