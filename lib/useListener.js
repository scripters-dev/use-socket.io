"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const context_1 = require("./context");
const utils_1 = require("./utils");
const useListener = (eventName, callback, options = {}) => {
    const socketConnection = utils_1.getSocketConnection(react_1.useContext(context_1.default))(options.namespace);
    const callbackRef = react_1.useRef(callback);
    const subscribeToEvent = react_1.useCallback(() => {
        if (socketConnection && !socketConnection.hasListeners(eventName)) {
            socketConnection.on(eventName, callbackRef.current);
        }
    }, [socketConnection, eventName]);
    const unsubscribeFromEvent = react_1.useCallback(() => {
        if (socketConnection && socketConnection.hasListeners(eventName)) {
            socketConnection.removeListener(eventName, callbackRef.current);
        }
    }, [socketConnection, eventName]);
    react_1.useEffect(() => {
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
exports.default = useListener;
