# @scripters/use-socket.io 
[![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url] [![eslint][eslint-image]][eslint-url] [![react][react-image]][react-url]
                           
[travis-image]: https://travis-ci.org/scripters-dev/use-socket.io.svg?branch=master
[travis-url]: https://travis-ci.org/scripters-dev/use-socket.io
[npm-image]: https://img.shields.io/npm/v/@scripters/use-socket.io.svg
[npm-url]: https://npmjs.org/package/@scripters/use-socket.io
[downloads-image]: https://img.shields.io/npm/dm/@scripters/use-socket.io.svg
[downloads-url]: https://npmjs.org/package/@scripters/use-socket.io
[eslint-image]: https://img.shields.io/npm/dependency-version/@scripters/use-socket.io/dev/eslint
[eslint-url]: https://eslint.org
[react-image]: https://img.shields.io/npm/dependency-version/@scripters/use-socket.io/dev/react
[react-url]: https://reactjs.org/

Use socket.io library easily with React hooks

### Installation

use-socket.io is available as an npm package.

```shell script
// using npm
npm i @scripters/use-socket.io

// using yarn
yarn add @scripters/use-socket.io
```

## Usage

[API](https://github.com/scripters-dev/use-socket.io/wiki/API)

#### Provider
```javascript
import React from 'react';
import { Provider } from '@scripters/use-socket.io';

const SOCKET_URL = 'http://localhost:4000';
const SOCKET_OPTIONS = {
    forceNew: true,
};

<Provider url={SOCKET_URL} options={SOCKET_OPTIONS}>
    <App />
</Provider>
```

#### Provider with namespaces
```javascript
import React from 'react';
import { Provider } from '@scripters/use-socket.io';

const SOCKET_URL = 'http://localhost:4000';
const SOCKET_OPTIONS = {
    forceNew: true,
};

<Provider url={SOCKET_URL} options={SOCKET_OPTIONS} namespaces={['test']}>
    <App />
</Provider>
```

#### useSocket
```javascript
import React, { useEffect, useState } from 'react';
import { useSocket } from '@scripters/use-socket.io';

const ChatStatus = () => {
    const socket = useSocket();
    const [user, setUser] = useState(null);

    useEffect(() => {
        socket.on('user', (userData) => {
            setUser(userData);
        });
    }, [socket]);

    const getMessage = () => user ? `User: ${user.name}` : 'User unauthenticated';

    return (
        <p>
            { getMessage() }
        </p>
    )
};

export default ChatStatus;
```

#### useListener

```javascript
import React, { useState } from 'react';
import { useListener } from '@scripters/use-socket.io';

const ChatStatus = () => {
    const [user, setUser] = useState(null);
    
    useListener('user', setUser);

    const getMessage = () => user ? `User: ${user.name}` : 'User unauthenticated';

    return (
        <p>
            { getMessage() }
        </p>
    )
};

export default ChatStatus;
```

#### useListener with pause

```javascript
import React, { useState } from 'react';
import { useListener } from '@scripters/use-socket.io';

const ChatStatus = () => {
    const [currentMessage, setMessage] = useState('');
    
    const [subscribeMessages, unsubscribeMessages ] = useListener('messages', setMessage);

    setTimeout(() => {
        unsubscribeMessages();
    }, 2000);

    setTimeout(() => {
        subscribeMessages();
    }, 5000);

    return (
        <p>{ currentMessage }</p>
    )
};

export default ChatStatus;
```

#### useEmit

```javascript
import React from 'react';
import { useEmit } from '@scripters/use-socket.io';

const ChatMessage = () => {
    const emit = useEmit();

    const handleMessage = (message) => {
        emit('message', message);
    };

    return (
        <div>
           <button onClick={() => handleMessage('Test message')}>Send message</button>
        </div>
    )
};

export default ChatMessage;

```

## Hints

Sometimes you want to be sure that all listeners are attached to the socket before connection is established. It's helpful when you want to handle events which socket server sends right after client is connected (e.g. `connect`). To solve that you can use socket option `autoConnect: false` and `socket.open()` right after all listeners attach call.

```javascript
import React, { useState } from 'react';
import { Provider, useSocket, useListener } from '@scripters/use-socket.io';

const App = () => {
    const [connected, setConnected] = useState(false);
    const socket = useSocket();

    useListener('connect', () => setConnected(true));

    socket.open();

    return (connected ? 'User connected' : 'User disconnected');
}

<Provider url="http://localhost:4000/" options={{ autoConnect: false }}>
    <App />
</Provider>
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/scripters-dev/use-socket.io/tags). 

## Roadmap
See the [open issues](https://github.com/scripters-dev/use-socket.io/issues) for a list of proposed features (and known issues).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
