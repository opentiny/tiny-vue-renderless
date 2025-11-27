import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams } from './shared.type.js';

declare const $constants: {
    PREFIX: string;
};
declare const statisticProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            PREFIX: string;
        };
    };
    precision: {
        type: NumberConstructor;
        default: number;
    };
    formatter: FunctionConstructor;
    value: {
        type: NumberConstructor;
        default: number;
    };
    prefix: StringConstructor;
    suffix: StringConstructor;
    title: (StringConstructor | ObjectConstructor)[];
    valueStyle: {
        type: (ObjectConstructor | ArrayConstructor)[];
    };
    groupSeparator: {
        type: StringConstructor;
        default: string;
    };
    tiny_mode: StringConstructor;
    tiny_mode_root: BooleanConstructor;
    tiny_template: (FunctionConstructor | ObjectConstructor)[];
    tiny_renderless: FunctionConstructor;
    tiny_theme: StringConstructor;
    tiny_chart_theme: ObjectConstructor;
};

type IStatisticProps = ExtractPropTypes<typeof statisticProps>;
type IStatisticConstants = typeof $constants;
interface IStatisticState {
    getIntegerAndDecimal: number | string;
}
interface IStatisticApi {
    getIntegerAndDecimal: (value: string | number) => string | undefined;
}
type IStatisticPcRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    state: IStatisticState;
    props: IStatisticProps;
    api: IStatisticApi;
};

export { IStatisticApi, IStatisticConstants, IStatisticPcRenderlessParams, IStatisticProps, IStatisticState };
