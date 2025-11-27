import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams } from './shared.type.js';

declare const loadListProps: {
    direction: {
        type: StringConstructor;
        default: string;
        validator: (value: any) => boolean;
    };
    offset: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    disabled: BooleanConstructor;
    scroller: ObjectConstructor;
    immediateCheck: {
        type: BooleanConstructor;
        default: boolean;
    };
    error: BooleanConstructor;
    errorText: {
        type: StringConstructor;
        default: any;
    };
    loading: BooleanConstructor;
    loadingText: {
        type: StringConstructor;
        default: any;
    };
    finished: BooleanConstructor;
    finishedText: {
        type: StringConstructor;
        default: any;
    };
    delay: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

interface ILoadListState {
}
interface ILoadListApi {
}
type ILoadListProps = ExtractPropTypes<typeof loadListProps>;
type ILoadListRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    state: ILoadListState;
    props: ILoadListProps;
    api: ILoadListApi;
};

export { ILoadListApi, ILoadListProps, ILoadListRenderlessParams, ILoadListState };
