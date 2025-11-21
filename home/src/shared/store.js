import { ref, computed } from 'vue';
export const isCustomScroll = ref(false);
export const setActiveIndex = ref(null);
export const activeIndex = ref(0);
export const isTinyCloud = ref(true);
export const demoPath = computed(() => (isTinyCloud.value ? '@demos/tinydoc-ng-tinycloud' : '@demos/tinydoc-ng-tiny'));
export const isSideCollapsed = ref(false);
