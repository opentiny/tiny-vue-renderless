<template>
  <guide-card class="guide-step-one" :guide="guide">
    <template #operation>
      <tiny-button type="primary" :size="buttonSize" round @click="onCopy">
        <div class="copy-button">
          <span>复制</span>
          <TinyIconCopySolid class="icon" />
        </div>
      </tiny-button>
    </template>
    <div class="code-content">
      <pre class="guide-step-one-code language-js line-numbers"><code class="language-js">{{ guide.code }}</code></pre>
      <finish v-if="showFinish"></finish>
    </div>
  </guide-card>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { TinyButton } from '@opentiny/vue'
import { iconCopySolid } from '@opentiny/vue-icon'
import useWindowSize from '@/tools/useWindowSize.js'
import GuideCard from './GuideCard.vue'
import Finish from './Finish.vue'

const TinyIconCopySolid = iconCopySolid()

const props = defineProps({
  guide: { type: Object, default: () => ({}) },
  showFinish: { type: Boolean, default: false }
})
const buttonSize = ref('')
const { isMobile } = useWindowSize()

function hightlight() {
  // 每次都要更新一下代码高亮
  nextTick(() => window.Prism.highlightAll())
}

async function onCopy() {
  if (navigator.clipboard && navigator.permissions) {
    await navigator.clipboard.writeText(props.guide.code)
  } else {
    const textArea = document.createElement('textArea')
    textArea.value = props.guide.code
    textArea.style.width = 0
    textArea.style.position = 'fixed'
    textArea.style.left = '-999px'
    textArea.style.top = '10px'
    textArea.setAttribute('readonly', 'readonly')
    document.body.appendChild(textArea)

    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
  }
}

onMounted(() => {
  buttonSize.value = isMobile.value ? 'small' : null
  hightlight()

  watch(
    () => props.guide.code,
    () => {
      hightlight()
    }
  )
})
</script>

<style lang="less" scoped>
@import '@/mixin.less';

.guide-step-one {
  max-height: 754px;

  .copy-button {
    display: flex;
    align-items: center;

    .icon {
      margin-left: 6px;
    }
  }

  .code-content {
    display: flex;
    flex-direction: column;
    overflow: auto;
    gap: 55px;
  }

  .guide-step-one-code {
    .pcRem(font-size, 16);
  }

  @media screen and (max-width: @break-point) {
    .guide-step-one-code {
      font-size: 14px;
    }
  }
}
</style>

<style>
.guide-step-one-code {
  background: #ffffff !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: clip !important;

  .language-js {
    color: rgb(5, 129, 4) !important;
  }

  .token {
    color: rgb(25, 25, 25);
  }

  .token.operator,
  .token.constant,
  .token.comment {
    color: rgb(5, 129, 4);
  }

  .token.string {
    color: rgb(148, 43, 41);
  }

  .token.keyword {
    color: rgb(0, 0, 255);
  }
}
</style>
