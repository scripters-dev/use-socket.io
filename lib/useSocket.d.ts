/// <reference types="socket.io-client" />
declare type useSocketType = (namespace?: string) => SocketIOClient.Socket | null;
declare const useSocket: useSocketType;
export default useSocket;
