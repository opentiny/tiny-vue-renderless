import { ExtractPropTypes, ComputedRef } from 'vue';
import { ISharedRenderlessFunctionParams, ISharedRenderlessParamUtils } from './shared.type.js';

declare const navMenuProps: {
    data: ArrayConstructor;
    overflow: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    parentKey: StringConstructor;
    beforeSkip: FunctionConstructor;
    fetchMenuData: FunctionConstructor;
    fields: ObjectConstructor;
    prevent: {
        type: BooleanConstructor;
        default: boolean;
    };
    allowFullUrl: {
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

type INavMenuProps = ExtractPropTypes<typeof navMenuProps>;
interface menuItemType {
    id: number;
    isFullUrl: boolean;
    pid: string;
    route: string;
    title: string;
    url: string;
    children?: menuItemType[];
    target?: string;
}
interface whitchSubMenuType {
    index: number;
    more: boolean;
}
interface INavMenuState {
    data: Array<menuItemType>;
    more: Array<menuItemType>;
    width: number;
    enterMenu: boolean;
    popMenuTop: number;
    subMenu: Array<menuItemType>;
    showMore: boolean;
    showPopmenu: boolean;
    enterMoreMenu: boolean;
    timer: number;
    activeIndex: number;
    subActiveIndex: number;
    selectedIndex: number;
    subItemSelectedIndex: number;
    moreItemSelectedIndex: number;
    subIndex: number;
    isShowSetting: boolean;
    marginLeft: number;
    isShowMore: ComputedRef<boolean>;
    popClass: ComputedRef<boolean>;
    subMenus: Array<menuItemType>;
    menuStyle: ComputedRef<boolean>;
    popStyle: ComputedRef<boolean>;
    afterEach: (() => void) | null;
    tooltipVisible: boolean;
    tooltipContent: string | null;
    isSaaSTheme: boolean;
    menuClass: string;
}
interface INavMenuApi {
    state: INavMenuState;
    getUrl: (item: menuItemType) => string;
    getTag: (item: menuItemType) => string;
    getRoute: (item: menuItemType) => string;
    setSubMenu: (value: Array<menuItemType>, index: number) => void;
    leaveMoreMune: () => void;
    isHide: (event: HTMLElement) => boolean;
    setActiveMenu: (index: number) => void;
    willHideSetting: () => void;
    stopHideSubMenu: () => void;
    calcWidth: () => void;
    getSelectedIndex: (path: string) => number;
    showSetting: () => void;
    initData: () => void;
    computedIsShowMore: () => void;
    computedPopClass: () => void;
    computedSubMenus: () => void;
    computedMenuStyle: () => void;
    computedPopStyle: () => void;
    skip: (item: menuItemType, flag: boolean) => void;
    hidePopmenu: (item: menuItemType) => void;
    getPoint: () => number;
    clickMenu: (item: menuItemType, index: number, parentIndex: number) => void;
    unMounted: () => void;
    mounted: () => void;
    classify: () => void;
    watchWidth: () => void;
    willHideSubMenu: () => void;
    hideSubMenu: () => void;
    showSubMenu: (list: Array<menuItemType>, { more, index }: whitchSubMenuType, event: MouseEvent) => void;
    handleTitleMouseenter: ($event: MouseEvent) => void;
    handleTitleMouseleave: () => void;
}
interface fieldsType {
    textField: string;
    urlField: string;
    key: string;
}
type INavMenuRenderlessParams = ISharedRenderlessFunctionParams<never> & {
    api: INavMenuApi;
    state: INavMenuState;
    props: INavMenuProps;
    fields: fieldsType;
    fetchMenuData: () => void;
};
type INavMenuRenderlessParamUtils = ISharedRenderlessParamUtils<never>;

export { INavMenuApi, INavMenuProps, INavMenuRenderlessParamUtils, INavMenuRenderlessParams, INavMenuState, fieldsType, menuItemType, whitchSubMenuType };
