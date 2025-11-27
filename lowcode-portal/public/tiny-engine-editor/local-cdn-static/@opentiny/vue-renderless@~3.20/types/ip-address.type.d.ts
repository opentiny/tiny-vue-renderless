import { ComputedRef, ExtractPropTypes } from 'vue';
import { ITinyVm, ISharedRenderlessParamUtils } from './shared.type.js';

declare const ipAddressProps: {
    size: StringConstructor;
    /**
     * @property {String} value - 显示值
     */
    modelValue: StringConstructor;
    /**
     * @property {String} [type = IPv4]  - IP地址输入组件类型（'IPv4', 'IPv6',）可选择
     */
    type: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    /**
     * @property {Boolean} readonly - 只读
     */
    readonly: BooleanConstructor;
    /**
     *  @property {Boolean} disabled - 禁用
     */
    disabled: BooleanConstructor;
    /**
     * @property {String, Object} [delimiter = .] - 组件IP段显示的分隔符改为图标
     */
    delimiter: {
        type: (StringConstructor | ObjectConstructor)[];
        default: string;
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

declare const isIP6: (str: string) => boolean;
declare const isIP4: (str: string) => boolean;
declare const ipValidator: ({ props, api }: {
    props: IIpAddressProps;
    api: IIpAddressApi;
}) => (value: string) => boolean;
declare const getCursorPosition: (el: any) => number;
declare const getValue: ({ api, props, state }: {
    api: IIpAddressApi;
    props: IIpAddressProps;
    state: IIpAddressState;
}) => () => string;
declare const setValue: ({ api, props, state }: {
    api: IIpAddressApi;
    props: IIpAddressProps;
    state: IIpAddressState;
}) => (value: string) => void;
declare const focus: ({ emit, parent, state }: {
    emit: IIpAddressRenderlessParamUtils['emit'];
    parent: IIpAddressRenderlessParamUtils['parent'];
    state: IIpAddressState;
    props?: IIpAddressProps | undefined;
}) => ({ index, event }: {
    index: number;
    event?: any;
}) => void;
declare const select: ({ emit, parent, state }: {
    emit: IIpAddressRenderlessParamUtils['emit'];
    parent: IIpAddressRenderlessParamUtils['parent'];
    state: IIpAddressState;
    props?: IIpAddressProps | undefined;
}) => ({ index, event }: {
    index: number;
    event?: any;
}) => void;
declare const inputEvent: ({ api, componentName, emit, eventName, props }: {
    api: IIpAddressApi;
    componentName: any;
    emit: any;
    eventName: any;
    props: any;
}) => ({ item, index }: {
    item: any;
    index: any;
}) => void;
declare const change: ({ api, emit }: {
    api: IIpAddressApi;
    emit: IIpAddressRenderlessParamUtils['emit'];
}) => () => void;
declare const blur: ({ api, componentName, emit, eventName, props, state }: {
    api: IIpAddressApi;
    componentName: string;
    emit: IIpAddressRenderlessParamUtils['emit'];
    eventName: string;
    props: IIpAddressProps;
    state: IIpAddressState;
}) => ({ item, index }: {
    item: any;
    index: any;
}) => void;
declare const keyup: ({ api, props }: {
    api: IIpAddressApi;
    props: IIpAddressProps;
    parent?: ITinyVm<null> | undefined;
}) => ({ item, index, event }: {
    item: any;
    index: any;
    event: any;
}) => false | undefined;
declare const keydown: ({ api, props, state }: {
    api: IIpAddressApi;
    props: IIpAddressProps;
    state: IIpAddressState;
}) => ({ item, index, event }: {
    item: any;
    index: number;
    event: KeyboardEvent;
}) => false | undefined;

interface IIpAddressState {
    active: boolean;
    isDel: boolean;
    isSelected: boolean;
    filterKeyCodes: number[];
    formDisabled: ComputedRef<boolean>;
    disabled: ComputedRef<boolean>;
    heightStyle: ComputedRef<string>;
    lineHeightStyle: ComputedRef<string>;
    allHeightStyle: ComputedRef<string>;
    api: Record<string, (str: any) => boolean>;
    address: {
        value: string;
    }[];
}
type IIpAddressProps = ExtractPropTypes<typeof ipAddressProps>;
interface IIpAddressApi {
    state: IIpAddressState;
    dispatch: IIpAddressRenderlessParamUtils['dispatch'];
    broadcast: IIpAddressRenderlessParamUtils['broadcast'];
    getCursorPosition: typeof getCursorPosition;
    focus: ReturnType<typeof focus>;
    select: ReturnType<typeof select>;
    blur: ReturnType<typeof blur>;
    keyup: ReturnType<typeof keyup>;
    change: ReturnType<typeof change>;
    keydown: ReturnType<typeof keydown>;
    inputEvent: ReturnType<typeof inputEvent>;
    isIP6: typeof isIP6;
    isIP4: typeof isIP4;
    getValue?: ReturnType<typeof getValue>;
    setValue?: ReturnType<typeof setValue>;
    ipValidator?: ReturnType<typeof ipValidator>;
}
type IIpAddressRenderlessParamUtils = ISharedRenderlessParamUtils<null>;

export { IIpAddressApi, IIpAddressProps, IIpAddressRenderlessParamUtils, IIpAddressState };
