import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams } from './shared.type.js';

declare const tagProps: {
    hit: BooleanConstructor;
    text: StringConstructor;
    type: StringConstructor;
    theme: StringConstructor;
    size: StringConstructor;
    color: {
        type: (StringConstructor | ArrayConstructor)[];
        default: string;
    };
    closable: BooleanConstructor;
    operable: BooleanConstructor;
    disabled: BooleanConstructor;
    selectable: BooleanConstructor;
    onlyIcon: BooleanConstructor;
    customClass: {
        type: StringConstructor;
        default: string;
    };
    effect: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    beforeDelete: FunctionConstructor;
    value: (StringConstructor | NumberConstructor)[];
    mini: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxWidth: {
        type: (StringConstructor | NumberConstructor)[];
        default: null;
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

interface ITagState {
    type: string | undefined;
    show: boolean;
    selected: boolean;
    text: string;
    color: string;
    mini: boolean;
    maxWidth: string | number;
}
interface ITagApi {
    state: ITagState;
    handleClose: (event: Event) => void;
    handleClick: (event: Event) => void;
}
type ITagProps = ExtractPropTypes<typeof tagProps>;
type ITagRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    state: ITagState;
    props: ITagProps;
    api: ITagApi;
};

export { ITagApi, ITagProps, ITagRenderlessParams, ITagState };
