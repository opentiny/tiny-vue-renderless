<template>
  <div class="demo-box">
    <h1 class="demo-titile">Vue2</h1>
    <div class="demo-container">
      <div class="tiny-countdown">
        <tiny-countdown :operate="operate"></tiny-countdown>
      </div>
      <div class="btn-box">
        <tiny-button type="primary" @click="reset">Reset</tiny-button>
        <tiny-button type="danger" @click="start">Start</tiny-button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import TinyButton from '@opentiny/vue-button'
import TinyCountdown from '@opentiny/vue-countdown'

export default {
  components: {
    TinyButton,
    TinyCountdown
  },
  data() {
    return {
      operation: {
        start: () => {},
        reset: () => {}
      }
    }
  },
  methods: {
    operate({ start, reset }) {
      this.operation.start = start
      this.operation.reset = reset
    },
    reset() {
      this.operation.reset()
    },
    start() {
      this.operation.start()
    }
  }
}
</script>
<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
}
.demo-box {
  position: relative;
  overflow: hidden;

  .demo-titile {
    width: 80px;
    line-height: 36px;
    font-size: 24px;
    margin: 0;
    padding: 0 5px;
    background: #999;
    text-align: center;
    color: #fefefe;
    position: absolute;
    left: 0;
    top: 0;
  }

  .demo-container {
    margin-top: 40px;
  }

  .tiny-countdown {
    font-size: 50px;
    text-align: center;
  }
  .btn-box {
    text-align: center;
    margin-top: 20px;
  }
}

.tiny-countdown__container {
  --ti-countdown-font-color:#f4606c;
}
</style>
