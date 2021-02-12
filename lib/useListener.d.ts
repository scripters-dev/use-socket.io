declare type SocketCallbackType = (data: any) => void;
declare type UseListenerOptions = {
    namespace?: string;
    autoSubscribe?: boolean;
};
interface UseListenerReturn extends Array<() => void> {
    0: () => void;
    1: () => void;
}
declare type useListenerFunction = (eventName: string, callback: SocketCallbackType, options?: UseListenerOptions) => UseListenerReturn;
declare const useListener: useListenerFunction;
export default useListener;
