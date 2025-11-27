import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const $constants: {
    NONE: string;
    CONTAIN: string;
    COVER: string;
    FILL: string;
    SCALE_DOWN: string;
    DEFAULT_POPPER_ZINDEX: number;
};
declare const imageProps: {
    _constants: {
        type: ObjectConstructor;
        default: () => {
            NONE: string;
            CONTAIN: string;
            COVER: string;
            FILL: string;
            SCALE_DOWN: string;
            DEFAULT_POPPER_ZINDEX: number;
        };
    };
    fit: StringConstructor;
    lazy: BooleanConstructor;
    previewSrcList: {
        type: ArrayConstructor;
        default: () => never[];
    };
    scrollContainer: {
        type: (StringConstructor | {
            new (): HTMLElement;
            prototype: HTMLElement;
        })[];
        default: null;
    };
    src: StringConstructor;
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    showIndex: {
        type: BooleanConstructor;
        default: boolean;
    };
    showHover: {
        type: BooleanConstructor;
        default: boolean;
    };
    previewVisible: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    imageSize: {
        type: NumberConstructor;
        default: number;
    };
    keepStyle: {
        type: BooleanConstructor;
        default: boolean;
    };
    appendToBody: {
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

/**
 * Copyright (c) 2022 - present TinyVue Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */

declare const computedGetImageStyle: ({ props, api }: Pick<IImageRenderlessParams, 'props' | 'api'>) => () => {
    width?: undefined;
    height?: undefined;
} | {
    width: string;
    height: string;
} | {
    width: string;
    height?: undefined;
} | {
    height: string;
    width?: undefined;
} | {
    'object-fit': string;
};
declare const computedGetAlignCenter: ({ props, constants }: {
    props: any;
    constants: any;
}) => () => boolean;
declare const computedGetPreview: (props: IImageProps) => () => boolean;
declare const loadImage: ({ state, api, attrs, props }: Pick<IImageRenderlessParams, 'api' | 'state' | 'props' | 'attrs'>) => () => void;
declare const handleLoad: ({ state, emit }: Pick<IImageRenderlessParams, 'emit' | 'state'>) => (event: Event, img: HTMLImageElement) => void;
/** 仅mobile-first使用, event 是image-viewer的delete事件参数。 但未从image-viewer中找到delete事件  */
declare const deleteHander: (emit: IImageRenderlessParams['emit']) => (event: any) => void;
declare const handleError: ({ state, emit }: Pick<IImageRenderlessParams, 'emit' | 'state'>) => (event: any) => void;
declare const handleLazyLoad: ({ state, api, vm, nextTick }: Pick<IImageRenderlessParams, 'api' | 'state' | 'nextTick' | 'vm'>) => () => void;
declare const addLazyLoadListener: ({ props, state, api, vm }: Pick<IImageRenderlessParams, 'api' | 'state' | 'props' | 'vm'>) => () => void;
declare const removeLazyLoadListener: (state: IImageState) => () => void;
/**
 * simulate object-fit behavior to compatible with IE11 and other browsers which not support object-fit
 */
declare const getImageStyle: ({ state, vm, constants }: Pick<IImageRenderlessParams, 'state' | 'vm' | 'constants'>) => (fit: any) => {
    width?: undefined;
    height?: undefined;
} | {
    width: string;
    height: string;
} | {
    width: string;
    height?: undefined;
} | {
    height: string;
    width?: undefined;
};
declare const clickHandler: (state: IImageState) => () => void;
declare const closeViewer: (state: IImageState) => () => boolean;
declare const mounted: ({ props, api }: Pick<IImageRenderlessParams, 'props' | 'api'>) => () => void;

type IImageProps = ExtractPropTypes<typeof imageProps>;
type IImageConstants = typeof $constants;
interface IImageState {
    mfPreviewVisible: boolean;
    /** mobile-first传入的一张image-error的图片 */
    images: any;
    error: boolean;
    loading: boolean;
    imageWidth: number;
    imageHeight: number;
    show: boolean;
    showViewer: boolean;
    /** 判定previewSrcList不为空是，返回true。 名字更应该为： hasPreview */
    getPreview: boolean;
    getImageStyle: object;
    getAlignCenter: object;
    _scrollContainer: HTMLElement | null;
    _lazyLoadHandler: ((...args: any[]) => void) | null;
}
interface IImageApi {
    state: IImageState;
    closeViewer: ReturnType<typeof closeViewer>;
    clickHandler: ReturnType<typeof clickHandler>;
    handleLoad: ReturnType<typeof handleLoad>;
    handleError: ReturnType<typeof handleError>;
    computedGetPreview: ReturnType<typeof computedGetPreview>;
    removeLazyLoadListener: ReturnType<typeof removeLazyLoadListener>;
    mounted: ReturnType<typeof mounted>;
    handleLazyLoad: ReturnType<typeof handleLazyLoad>;
    loadImage: ReturnType<typeof loadImage>;
    computedGetImageStyle: ReturnType<typeof computedGetImageStyle>;
    addLazyLoadListener: ReturnType<typeof addLazyLoadListener>;
    deleteHander: ReturnType<typeof deleteHander>;
    computedGetAlignCenter: ReturnType<typeof computedGetAlignCenter>;
    getImageStyle: ReturnType<typeof getImageStyle>;
}
/** image的混合上下文 */
type IImageRenderlessParams = ISharedRenderlessFunctionParams<IImageConstants> & {
    state: IImageState;
    props: IImageProps;
    api: IImageApi;
    images: any;
};
/** renderless第3参 */
type IImageRenderlessParamUtils = ISharedRenderlessParamUtils<IImageConstants>;

export { IImageApi, IImageConstants, IImageProps, IImageRenderlessParamUtils, IImageRenderlessParams, IImageState };
