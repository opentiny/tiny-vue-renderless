import 'intersection-observer';

import { Ref, computed, effectScope, onBeforeUnmount, onMounted, toRaw, watch, shallowReactive, shallowRef } from 'vue';

type Refable<T> = T | Ref<T>;

const isObject = (x: unknown): x is object => x !== null && typeof x === 'object';

const isHtmlElement = (a: unknown): a is HTMLElement =>
  a instanceof HTMLElement || (isObject(a) && (a as any).nodeType === 1 && typeof (a as any).nodeName === 'string');

const getHtmleElement = item => {
  const value = toRaw(item);
  return isHtmlElement(value) ? value : value?.$el;
};

const getDiffArray = (newValue: Array<any>, oldValue: Array<any>) => {
  const newSet = new Set(newValue);
  const oldSet = new Set(oldValue);
  return [[...newSet].filter(item => !oldSet.has(item)), [...oldSet].filter(item => !newSet.has(item))];
};

export const useIntersectionObserver = (
  refs: Refable<Array<Refable<HTMLElement | null | { $el: HTMLElement }>>>,
  options?: IntersectionObserverInit
): [Ref<Array<IntersectionObserverEntry>>, any, IntersectionObserver] => {
  let isPause = false;

  const refsArr = computed(() => (Array.isArray(refs) ? refs : refs.value) || []);
  const elementIndexMap = computed(
    () =>
      new WeakMap<HTMLElement, number>(
        refsArr.value
          .map(getHtmleElement)
          .map((item, index) => [item, index] as [HTMLElement, number])
          .filter(([item]) => isHtmlElement(item))
      )
  );
  const entriesMap = shallowReactive(new WeakMap());

  const elementArr = computed(() => refsArr.value.map(getHtmleElement).filter(isHtmlElement));
  const entriesArr: Ref<IntersectionObserverEntry[]> = shallowRef([]);

  const onTakeRecords = (entriesArg: IntersectionObserverEntry[]) => {
    const entries = Array.from(entriesArg.values()).sort(
      (item1, item2) =>
        (elementIndexMap.value.get(item1.target as any) ?? refsArr.value.length) -
        (elementIndexMap.value.get(item2.target as any) ?? refsArr.value.length)
    );
    entries.forEach(item => entriesMap.set(item.target, item));
    entriesArr.value = entries;
  };

  const observer = new IntersectionObserver(onTakeRecords, options);

  const startObserve = () => {
    isPause = false;
    elementArr.value.forEach(item => observer.observe(item));
  };

  const pauseObserve = () => {
    isPause = true;
    elementArr.value.forEach(item => observer.unobserve(item));
  };

  const scope = effectScope();

  onMounted(() => {
    scope.run(() => {
      watch(
        () => elementArr.value,
        (newValue, oldValue) => {
          if (isPause) {
            return;
          }
          const [addedElements, removedElements] = getDiffArray(newValue, oldValue);
          addedElements.forEach(element => observer.observe(element));
          removedElements.forEach(element => observer.unobserve(element));
        },
        { immediate: true } as object
      );
    });
  });

  onBeforeUnmount(() => {
    observer.disconnect();
    scope.stop();
  });

  return [entriesArr, { startObserve, pauseObserve }, observer];
};
