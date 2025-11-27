<template>
  <div class="region" v-for="(item, index) in regions" :key="index">
    <div class="region-content">
      <tiny-input
        placeholder="请输入局点名称，例：cn-north-7"
        v-model="item.name"
        @blur="$emit('update:modelValue', regions)"
      ></tiny-input>
      <tiny-input
        placeholder="请输入基础路径，例：https://opentiny.design/"
        v-model="item.baseUrl"
        @blur="$emit('update:modelValue', regions)"
      ></tiny-input>
      <tiny-radio v-model="item.isDefault" :label="true" @change="changeRegion(index)">设为默认局点</tiny-radio>
    </div>
    <icon-del v-if="regions.length > 1" class="region-delete" @click="$emit('delete', index)"></icon-del>
  </div>
</template>

<script>
import { Input, Radio } from '@opentiny/vue'
import { IconDel } from '@opentiny/vue-icon'

export default {
  components: {
    TinyInput: Input,
    TinyRadio: Radio,
    IconDel: IconDel()
  },
  props: {
    regions: {
      type: Array,
      default: []
    }
  },
  setup(props, { emit }) {
    const changeRegion = (index) => {
      props.regions.map((item, idx) => {
        item.isDefault = idx === index

        return item
      })

      emit('update:modelValue', props.regions)
    }

    return {
      changeRegion
    }
  }
}
</script>

<style lang="less" scoped>
.region {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 16px 20px;
  background: #f2f5fc;
  border: 1px solid #dfe1e6;
  .region-content {
    width: 90%;
    display: grid;
    grid-template-columns: 40% 40% 20%;
    grid-column-gap: 20px;
  }
  .region-delete {
    color: #526ecc;
    cursor: pointer;
    font-size: 14px;
  }
}
</style>
