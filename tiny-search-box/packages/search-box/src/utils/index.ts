export const debounce = (func: Function, delay = 200) => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    return function (this: any, ...args: any) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
            timer = null;
        }, delay);
    };
}
