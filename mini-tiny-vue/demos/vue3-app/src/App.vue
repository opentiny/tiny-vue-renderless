<script>
import { ref } from 'vue'
import { Button as TinyButton, Counter as TinyCounter } from './lib/opentiny-vue/opentiny-vue.es'

export default {
  components: { TinyButton, TinyCounter },
  setup() {
    const count = ref(0)
    const records = ref([])

    function print() {
      records.value.push('当前值为：' + count.value)
    }

    function countChange(newValue) {
      count.value = newValue
    }

    return {  count,  records, print, countChange }
  }
}
</script>

<template>
  <div class="demo-wrap">
    <h2>Mini TinyVue On Vue3</h2>
    <div>
      <tiny-counter class="mr20" :value="count" :step="100" @change="countChange" />
      <tiny-button class="mr20" @click="print" tiny_mode="pc">打印</tiny-button>
      <ul class="list">
        <li v-for="(m, idx) in records" :key="idx">{{ m }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

.demo-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
  margin: 20px;
  border: 1px solid #cccaca;
  box-shadow:0 2px 10px 0 rgba(0,0,0,.08) ;
}
.mr20 {
  margin-right: 20px;
}
.list{
  height: 300px;
  overflow: auto;
}
</style>
