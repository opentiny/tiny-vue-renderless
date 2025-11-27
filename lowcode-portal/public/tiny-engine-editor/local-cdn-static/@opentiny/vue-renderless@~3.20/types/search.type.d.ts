import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const searchProps: {
    mini: {
        type: BooleanConstructor;
        default: boolean;
    };
    big: {
        type: BooleanConstructor;
        default: boolean;
    };
    buttonText: {
        type: StringConstructor;
        default: () => any;
    };
    /**
     * 设置为透明模式，配置为true时，边框变为透明且收缩后半透明显示，一般用在带有背景的场景
     */
    transparent: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 搜索的类型选项，格式为[{text:'文档',value:1},...]，不配置时类型选择固定显示为All
     */
    searchTypes: {
        type: ArrayConstructor;
        default: () => never[];
    };
    /**
     * 设置搜索输入框内的提示占位文本
     */
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    tabindex: {
        type: StringConstructor;
        default: string;
    };
    /**
     * 配置搜索输入框enter键,enter按下触发搜索
     */
    isEnterSearch: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * 配置主题色，primary:蓝 gray:灰
     */
    themeType: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    showButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    changeBgColor: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    typeValue: ObjectConstructor;
    suffixIcon: (StringConstructor | ObjectConstructor)[];
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

interface ISearchState {
    show: boolean;
    focus: boolean;
    hovering: boolean;
    collapse: boolean;
    currentValue: string;
    searchValue: object;
    types: string[];
    showClear: boolean;
    formItemSize: string;
    searchSize: string;
}
type ISearchProps = ExtractPropTypes<typeof searchProps>;
type ISearchRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    state: ISearchState;
    props: ISearchProps;
    api: ISearchApi;
};
interface ISearchValue {
    text: string;
    value: number;
}
interface ISearchApi {
    state: ISearchState;
    changeKey: (key: ISearchValue) => void;
    handleChange: (event: Event) => void;
    showSelector: () => void;
    searchClick: (event: Event) => void;
    clickOutside: (event: Event) => void;
    emitInput: (...args: [string, ISearchValue]) => void;
    setDefaultType: (searchTypes: ISearchValue[]) => ISearchValue;
    formatSearchTypes: (searchTypes: ISearchValue[]) => ISearchValue[];
    clear: (event: Event) => void;
    handleInput: (event: Event) => void;
    searchEnterKey: () => void;
}
type ISearchRenderlessParamUtils = ISharedRenderlessParamUtils<never>;

export { ISearchApi, ISearchProps, ISearchRenderlessParamUtils, ISearchRenderlessParams, ISearchState, ISearchValue };
