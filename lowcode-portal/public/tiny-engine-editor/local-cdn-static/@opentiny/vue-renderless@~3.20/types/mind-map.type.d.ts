import { ExtractPropTypes } from 'vue';

declare const MindMapProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {};
    };
    modelValue: ObjectConstructor;
    options: ObjectConstructor;
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

type IMindMapProps = ExtractPropTypes<typeof MindMapProps>;

export { IMindMapProps };
