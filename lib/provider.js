"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const io = require("socket.io-client");
const context_1 = require("./context");
const getUrlOrigin = (url) => new URL(url).origin;
const generateNamespaces = (props) => (result, namespace) => (Object.assign(Object.assign({}, result), { [namespace]: io(`${getUrlOrigin(props.url)}/${namespace}`, props.options) }));
class Provider extends React.Component {
    constructor(props) {
        super(props);
        const { url, options = {}, namespaces = [] } = props;
        this.state = {
            socket: io(url, options),
            namespaces: namespaces.reduce(generateNamespaces(props), {}),
        };
    }
    render() {
        const { children } = this.props;
        const { socket, namespaces } = this.state;
        return (React.createElement(context_1.default.Provider, { value: { socket, namespaces } }, children));
    }
}
exports.default = Provider;
