"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocketConnection = ({ socket, namespaces }) => (namespace) => {
    if (namespace && namespaces && namespaces[namespace]) {
        return namespaces[namespace];
    }
    return socket;
};
