<template>
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
</template>

<script setup>
import TinyButton from '@opentiny/vue-button'
import TinyCountdown from '@opentiny/vue-countdown'

// Mobile
const operationMobile = {
  start: () => {},
  reset: () => {}
}

const operateMobile = ({ start, reset }) => {
  operationMobile.start = start
  operationMobile.reset = reset
}

const startMobile = () => operationMobile.start()
const resetMobile = () => operationMobile.reset()
</script>
