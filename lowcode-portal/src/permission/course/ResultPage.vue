<template>
  <div class="success-page">
    <div>
      <div>
        <svg-icon name="logo-success" class="success-logo"></svg-icon>
      </div>
      <h3 class="title">发布成功！</h3>
    </div>
    <div>
      <tiny-button type="primary" @click="$emit('handleShowTab', true)">返回课程列表</tiny-button>
      <tiny-button @click="$emit('handleShowTab', true, 'publish')">继续发布课程</tiny-button>
    </div>
    <p>{{state.closeTime}}s 后返回课程列表</p>
  </div>
</template>

<script>
import { Button } from '@opentiny/vue'
import { onMounted, reactive } from 'vue'

export default {
  components: {
    TinyButton: Button
  },
  emit: ['handleShowTab'],
  setup(props, { emit }) {
    const state = reactive({
      closeTime: 5
    })
    const timingFun = () => {
      if (state.closeTime > 0) {
        --state.closeTime
        setTimeout(() => timingFun(), 1000)

        return
      }
      // 返回课程列表
      emit('handleShowTab', true)
    }

    onMounted(() => {
      setTimeout(() => timingFun(), 1000)
    })

    return {
      state
    }
  }
}
</script>

<style lang="less" scoped>
.success-logo{
  width: 75px;
  height: 75px;
}
.title{
  font-weight: normal;
  font-size: 24px;
  color: #252B3A;
  margin-top: 0;
}
.success-page{
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 145px;
}
</style>
