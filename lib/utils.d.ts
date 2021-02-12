/// <reference types="socket.io-client" />
interface contextParams {
    socket: SocketIOClient.Socket | null;
    namespaces?: {
        [namespace: string]: SocketIOClient.Socket;
    };
}
declare type getSocketConnectionType = (params: contextParams) => (namespace?: string) => SocketIOClient.Socket | null;
export declare const getSocketConnection: getSocketConnectionType;
export {};
