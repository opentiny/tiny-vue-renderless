<template>
  <div>
    <h2 class="mode-title">PC</h2>
    <div>
      <div class="tiny-countdown" style="--ti-countdown-font-color: #ecad9e">
        <tiny-countdown :operate="operatePc"></tiny-countdown>
      </div>
      <div class="btn-box">
        <tiny-button type="primary" @click="resetPc">Reset</tiny-button>
        <tiny-button type="danger" @click="startPc">Start</tiny-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import TinyButton from '@opentiny/vue-button'
import TinyCountdown from '@opentiny/vue-countdown'

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
</script>
