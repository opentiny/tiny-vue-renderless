<script setup>
import { ref } from 'vue'
import { iconClose } from '@opentiny/vue-icon'
import { i18n } from '@/i18n'

const GLOBAL_NOTICE_KEY = 'opentiny-global-notice:v1'

const TinyIconClose = iconClose()
const defaultVisible = localStorage.getItem(GLOBAL_NOTICE_KEY) === 'hide' ? false : true
const globalNoticeVisible = ref(defaultVisible)

const close = () => {
  globalNoticeVisible.value = false
  localStorage.setItem(GLOBAL_NOTICE_KEY, 'hide')
}
</script>

<template>
  <Transition>
    <div class="global-notice" v-if="globalNoticeVisible">
      <a
        class="global-notice__content"
        href="https://developer.huaweicloud.com/signup/4f8b07903ef2415f924e959d4947e5a1"
        target="_blank"
      >
        {{ i18n.global.t('global-notice-title') }}
      </a>
      <span class="global-notice__close" @click="close"><tiny-icon-close></tiny-icon-close></span>
    </div>
  </Transition>
</template>

<style scoped lang="less">
.global-notice {
  position: fixed;
  left: 0;
  top: 60px;
  width: 100%;
  height: 32px;
  background: #5073e5;
  font-size: 14px;
  text-align: center;
  color: #fff;
  line-height: 32px;
  z-index: 15;

  &__content {
    color: #fff;
    text-decoration: none;

    &:visited {
      color: #fff;
    }
  }

  &__close {
    position: absolute;
    right: 0;
    top: -2px;
    display: inline-block;
    width: 32px;
    cursor: pointer;

    svg {
      width: 16px;
      height: 16px;
      fill: #fff;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-0.21rem);
}
</style>
