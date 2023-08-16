<template>
  <div>
    <h2 class="mode-title">Watch</h2>
    <div class="watch">
      <div class="watch-mask">
        <div class="watch-wrap">
          <div class="watch-box">
            <div
              class="tiny-watch-countdown"
              style="--ti-countdown-font-color: #fefefe"
            >
              <tiny-countdown :operate="operateWatch"></tiny-countdown>
            </div>
            <div class="btn-box tiny-watch-btn">
              <tiny-button
                type="primary"
                @click="resetWatch"
                v-if="isWatchResetShow"
                tiny_mode="watch"
              >
                <TinyIconRefres class="play-icon"></TinyIconRefres>
              </tiny-button>
              <tiny-button
                v-else
                @click="startWatch"
                type="danger"
                tiny_mode="watch"
              >
                <TinyIconStartCircle class="play-icon"></TinyIconStartCircle>
              </tiny-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TinyButton from '@opentiny/vue-button'
import TinyCountdown from '@opentiny/vue-countdown'
import { iconStartCircle, iconRefres } from '@opentiny/vue-icon'
import { ref } from 'vue'

const TinyIconStartCircle = iconStartCircle()
const TinyIconRefres = iconRefres()

const isWatchResetShow = ref(false)

// Watch
const operationWatch = {
  start: () => {},
  reset: () => {}
}

const operateWatch = ({ start, reset }) => {
  operationWatch.start = start
  operationWatch.reset = reset
}

const startWatch = () => {
  isWatchResetShow.value = true
  operationWatch.start()
}
const resetWatch = () => {
  isWatchResetShow.value = false
  operationWatch.reset()
}
</script>
