import { ExtractPropTypes } from 'vue';
import { PropType } from '@opentiny/vue-common';

declare const $constants: {};
declare const skeletonProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {};
    };
    modelValue: StringConstructor;
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    rows: {
        type: NumberConstructor;
        default: number;
    };
    avatar: {
        type: BooleanConstructor;
        default: boolean;
    };
    rowsWidth: {
        type: PropType<(string | number)[]>;
        default: () => never[];
    };
    animated: {
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

type ISkeletonProps = ExtractPropTypes<typeof skeletonProps>;
type ISkeletonConstants = typeof $constants;
interface ISkeletonApi {
    toPxStyle: (value: string | number) => string | undefined;
}

export { ISkeletonApi, ISkeletonConstants, ISkeletonProps };
