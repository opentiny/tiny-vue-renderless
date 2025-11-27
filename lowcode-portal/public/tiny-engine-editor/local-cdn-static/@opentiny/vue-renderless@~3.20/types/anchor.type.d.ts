import { ExtractPropTypes } from 'vue';
import { ISharedRenderlessFunctionParams } from './shared.type.js';

declare const anchorProps: {
    isAffix: {
        type: BooleanConstructor;
        default: boolean;
    };
    links: {
        type: ArrayConstructor;
        default: () => never[];
    };
    containerId: {
        type: StringConstructor;
        default: string;
    };
    markClass: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    offsetTop: {
        type: NumberConstructor;
        default: number;
    };
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

declare const setFixAnchor: ({ vm, props }: Pick<IAnchorRenderlessParams, 'vm' | 'props'>) => () => void;
declare const setScrollContainer: ({ state, api }: Pick<IAnchorRenderlessParams, 'state' | 'api'>) => (cb?: Function | null) => void;
declare const getCurrentAnchor: ({ vm, state, emit }: Pick<IAnchorRenderlessParams, 'vm' | 'state' | 'emit'>) => (link: string) => void;
declare const handleScroll: (state: IAnchorRenderlessParams['state']) => () => void;
declare const getContainer: ({ props }: Pick<IAnchorRenderlessParams, 'props'>) => () => Element;
declare const mounted: ({ state, api, props, nextTick }: Pick<IAnchorRenderlessParams, 'state' | 'api' | 'props' | 'nextTick'>) => () => void;
declare const updated: ({ api }: Pick<IAnchorRenderlessParams, 'api'>) => () => void;
declare const unmounted: ({ state, api }: Pick<IAnchorRenderlessParams, 'state' | 'api'>) => () => void;
declare const onItersectionObserver: ({ state, props, api, vm, emit }: Pick<IAnchorRenderlessParams, 'state' | 'props' | 'api' | 'vm' | 'emit'>) => () => void;
declare const linkClick: ({ state, vm, emit, props, api }: Pick<IAnchorRenderlessParams, 'state' | 'vm' | 'emit' | 'props' | 'api'>) => (e: Event, item: IAnchorLinkItem) => void;

type IAnchorObject = HTMLElement | null;
interface IAnchorState {
    currentLink: string;
    observerLinks: object;
    expandLink: object;
    intersectionObserver: IAnchorObject;
    scrollContainer: IAnchorObject;
    currentHash: string;
    isScroll: boolean;
    scrollTimer: number;
    childOffsetTop: number;
}
type IAnchorProps = ExtractPropTypes<typeof anchorProps>;
interface IAnchorLinkItem {
    key: string;
    link: string;
    title: string;
}
interface IAnchorApi {
    state: IAnchorState;
    mounted: ReturnType<typeof mounted>;
    updated: ReturnType<typeof updated>;
    unmounted: ReturnType<typeof unmounted>;
    getContainer: ReturnType<typeof getContainer>;
    linkClick: ReturnType<typeof linkClick>;
    onItersectionObserver: ReturnType<typeof onItersectionObserver>;
    setScrollContainer: ReturnType<typeof setScrollContainer>;
    getCurrentAnchor: ReturnType<typeof getCurrentAnchor>;
    setFixAnchor: ReturnType<typeof setFixAnchor>;
    handleScroll: ReturnType<typeof handleScroll>;
}
type IAnchorRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    props: IAnchorProps;
    state: IAnchorState;
    api: IAnchorApi;
};

export { IAnchorApi, IAnchorLinkItem, IAnchorProps, IAnchorRenderlessParams, IAnchorState };
