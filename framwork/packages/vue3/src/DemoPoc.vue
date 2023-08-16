<template>
  <div class="demo-box">
    <h1 class="demo-titile">Vue3</h1>
    <div class="demo-container">
      <div>
        <h2 class="mode-title">PC</h2>
        <div>
          <div
            class="tiny-countdown"
            style="--ti-countdown-font-color: #ecad9e"
          >
            <tiny-countdown :operate="operatePc"></tiny-countdown>
          </div>
          <div class="btn-box">
            <tiny-button type="primary" @click="resetPc">Reset</tiny-button>
            <tiny-button type="danger" @click="startPc">Start</tiny-button>
          </div>
        </div>
      </div>
      <div>
        <h2 class="mode-title">Mobile</h2>
        <div>
          <div class="phone-container">
            <div
              class="mobile-view-container"
              style="--ti-countdown-font-color: #666"
            >
              <div class="tiny-mobile-countdown">
                <tiny-countdown :operate="operateMobile"></tiny-countdown>
              </div>
              <div class="btn-box">
                <tiny-button type="primary" round @click="resetMobile"
                  >Reset</tiny-button
                >
                <tiny-button type="danger" round @click="startMobile"
                  >Start</tiny-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
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
                    <TinyIconStartCircle
                      class="play-icon"
                    ></TinyIconStartCircle>
                  </tiny-button>
                </div>
              </div>
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

// PC
const operationPc = {
  start: () => {},
  reset: () => {}
}

const operatePc = ({ start, reset }) => {
  operationPc.start = start
  operationPc.reset = reset
}

const startPc = () => operationPc.start()
const resetPc = () => operationPc.reset()

const operationMobile = {
  start: () => {},
  reset: () => {}
}

// Mobile
const operateMobile = ({ start, reset }) => {
  operationMobile.start = start
  operationMobile.reset = reset
}

const startMobile = () => operationMobile.start()
const resetMobile = () => operationMobile.reset()

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
