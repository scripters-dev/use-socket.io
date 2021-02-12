interface emitOptions {
    namespace?: string;
    compress?: boolean;
}
declare type useEmitType = (options?: emitOptions) => (eventName: string, eventData: any) => void;
declare const useEmit: useEmitType;
export default useEmit;
