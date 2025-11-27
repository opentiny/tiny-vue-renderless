interface IColorSelectPanelRef<T> {
    value: T;
}
interface IColorSelectPanelProps {
    visible: boolean;
    alpha: boolean;
    history: string[];
    predefine: string[];
    format: ('hsl' | 'hsv' | 'hex' | 'rgb')[];
    modelValue: string;
    enableHistory: boolean;
    enablePredefineColor: boolean;
}
interface IColorSelectPanelAlphProps<C> {
    color: C;
}
interface IColorSelectPanelSVProps<C> {
    color: C;
}
interface IColorSelectPanelHueProps<C> {
    color: C;
}
interface IColorSelectPanelAlphaPanel<C> {
    color: C;
}

export { IColorSelectPanelAlphProps, IColorSelectPanelAlphaPanel, IColorSelectPanelHueProps, IColorSelectPanelProps, IColorSelectPanelRef, IColorSelectPanelSVProps };
