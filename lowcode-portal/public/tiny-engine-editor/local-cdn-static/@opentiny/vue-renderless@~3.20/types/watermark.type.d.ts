declare const useWatermarkBg: (props: any, state: any) => Promise<any>;
declare const reRenderWatermark: ({ state }: {
    state: any;
}) => () => void;
declare const mounted: ({ vm, state, props }: {
    vm: any;
    state: any;
    props: any;
}) => () => void;
declare const unmounted: ({ state }: {
    state: any;
}) => () => void;
declare const watchProps: ({ state, vm, props }: {
    state: any;
    vm: any;
    props: any;
}) => () => Promise<void>;

interface IWatermarkState {
    div: HTMLDivElement;
    ob: MutationObserver;
    bg: ReturnType<typeof useWatermarkBg>;
    flag: number;
}
interface IWatermarkApi {
    state: IWatermarkState;
    mounted: ReturnType<typeof mounted>;
    reRenderWatermark: ReturnType<typeof reRenderWatermark>;
    unmounted: ReturnType<typeof unmounted>;
    watchProps: ReturnType<typeof watchProps>;
}

export { IWatermarkApi };
