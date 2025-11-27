import { ExtractPropTypes } from 'vue';
import { PropType } from '@opentiny/vue-common';

type VariantType = 'image' | 'circle' | 'square';
type SizeType = 'large' | 'medium' | 'small';
declare const $constants: {};
declare const skeletonItemProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {};
    };
    modelValue: StringConstructor;
    variant: {
        type: PropType<VariantType>;
        default: string;
    };
    size: {
        type: PropType<SizeType>;
        default: string;
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

type ISkeletonItemProps = ExtractPropTypes<typeof skeletonItemProps>;
type ISkeletonItemConstants = typeof $constants;
interface ISkeletonItemState {
    isActive: boolean;
}
interface ISkeletonItemApi {
    state: ISkeletonItemState;
}

export { ISkeletonItemApi, ISkeletonItemConstants, ISkeletonItemProps, ISkeletonItemState };
