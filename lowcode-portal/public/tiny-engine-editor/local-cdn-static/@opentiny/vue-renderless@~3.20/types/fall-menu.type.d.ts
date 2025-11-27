import { ExtractPropTypes, Ref } from 'vue';

interface IData {
    children: IData[];
    url: string;
}
declare const fallMenuProps: {
    data: {
        type: {
            (arrayLength: number): IData[];
            (...items: IData[]): IData[];
            new (arrayLength: number): IData[];
            new (...items: IData[]): IData[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
            from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
            from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
            of<T_4>(...items: T_4[]): T_4[];
            readonly [Symbol.species]: ArrayConstructor;
        };
        default: () => never[];
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

declare const arrowClick: (state: IFallMenuState) => (opt: any) => void;
declare const overContent: (state: IFallMenuState) => (on: any) => void;
declare const mouseover: ({ fall, props, state }: {
    fall: any;
    props: IFallMenuProps;
    state: IFallMenuState;
}) => (index: any) => void;
declare const mouseout: (state: IFallMenuState) => () => void;
declare const computePx: ({ props, refs, state }: {
    props: IFallMenuProps;
    refs: any;
    state: IFallMenuState;
}) => () => void;
declare const reRender: ({ api, state, timeout }: {
    api: IFallMenuApi;
    state: IFallMenuState;
    timeout?: NodeJS.Timeout | undefined;
}) => () => void;
declare const mounted: ({ api }: {
    api: any;
}) => () => void;
declare const beforeDestroy: (api: any) => () => void;
declare const computeLeft: ({ state }: {
    state: any;
}) => () => any;
declare const computeData: ({ props }: {
    props: IFallMenuProps;
}) => () => IData[];

interface IPagerData {
    data: IFallMenuProps['data'];
    offset: string[];
    index: number[];
    size?: number;
}
interface IFallMenuState {
    pager: number;
    active: number;
    level2data: IFallMenuProps['data'];
    activeNode: null;
    isActive: boolean;
    pagerData: IPagerData;
    left: any;
    data: IFallMenuProps['data'];
}
type IFallMenuProps = ExtractPropTypes<typeof fallMenuProps> & {
    value: boolean;
};
interface IFallMenuApi {
    fall: Ref<null>;
    state: IFallMenuState;
    computePx: ReturnType<typeof computePx>;
    mounted: ReturnType<typeof mounted>;
    computeLeft: ReturnType<typeof computeLeft>;
    beforeDestroy: ReturnType<typeof beforeDestroy>;
    computeData: ReturnType<typeof computeData>;
    arrowClick: ReturnType<typeof arrowClick>;
    overContent: ReturnType<typeof overContent>;
    mouseout: ReturnType<typeof mouseout>;
    mouseover: ReturnType<typeof mouseover>;
    reRender: ReturnType<typeof reRender>;
}

export { IFallMenuApi, IFallMenuProps, IFallMenuState, IPagerData };
