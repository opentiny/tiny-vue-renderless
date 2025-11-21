import { defineAsyncComponent, ref, h, computed, defineComponent } from 'vue';
import SharedLoading from './loading.vue';
import SharedError from './error.vue';

const createAsyncComponent = options => {
  const {
    loader,
    loadingOptions = {},
    ...componentOptions
  } = typeof options === 'function' ? { loader: options } : options;
  const retryTime = ref(0);
  const AsyncComponent = defineAsyncComponent({
    loader,
    loadingComponent: h(SharedLoading, { size: 'small', style: 'height: 50px;', ...loadingOptions }),
    errorComponent: h(SharedError, {
      onRetry: () => retryTime.value++,
    }),
    delay: 200,
    timeout: 20000,
    ...componentOptions,
  });
  return defineComponent({
    setup() {
      return {
        key: computed(() => `async-${retryTime.value}`),
      };
    },
    render(context) {
      return h(AsyncComponent, { ...context.$attrs, key: context.key });
    },
  });
};

export default createAsyncComponent;
