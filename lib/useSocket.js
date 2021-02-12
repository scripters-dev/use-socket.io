"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const context_1 = require("./context");
const utils_1 = require("./utils");
const useSocket = (namespace) => utils_1.getSocketConnection(react_1.useContext(context_1.default))(namespace);
exports.default = useSocket;
