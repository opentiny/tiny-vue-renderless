<script setup lang="ts">
import { reactive, ref } from 'vue'
import { TinySearchBox } from '@opentiny/tiny-search-box'
import { Autocomplete as TinyAutocomplete, Button as TinyButton } from '@opentiny/vue'

const tags = ref([
  {
    'label': '选择人员',
    'field': 'autocomplete',
    'type': 'custom',
    'replace': true,
    'slotName': 'autocomplete',
    'value': '5656'
  }
])
const items = reactive([
  {
    label: '选择人员',
    field: 'autocomplete',
    type: 'custom',
    replace: true, // 支持单选
    slotName: 'autocomplete' // 定义此属性类型对应的插槽名，并在以下的模板层使用
  },
  {
    label: '其他自定义',
    field: 'other',
    type: 'custom',
    slotName: 'other' // 定义此属性类型对应的插槽名
  }
])

const onChange = (newFilters, oldFilters) => {
  console.log('changeEvent:', newFilters, oldFilters)
}

// 自定义autocomplete的使用
const restaurants = ref([])
const autoValue = ref('')

function querySearch(queryString, cb) {
  // 异步加载建议列表数据
  getAutoValus().then((resp) => {
    restaurants.value = resp
    let results = queryString ? restaurants.value.filter(createFilter(queryString)) : restaurants.value
    // 调用 callback 返回建议列表的数据
    cb(results)
  })
}
function createFilter(queryString) {
  return (restaurant) => restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
}

// 异步加载
function getAutoValus() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = []
      for (let j = 0; j < 50; j++) {
        data.push(createRandomItem(j))
      }
      resolve(data)
    }, 1000)
  })
}

// 创建随机数据
function createRandomItem(num: number) {
  const familyName: Array<string> = ['王', '李', '赵', '钱', '孙']
  const id = Math.floor(((num + 3) * 29) % num)
  const value: string = familyName[((num + 3) * 19) % 5]
  return {
    value: `${value}${id} 00${id}`,
    id
  }
}

const handleSelect = (item, scope) => {
  // 点击面板外的元素会触发面板消失，所以需要在此控制面板显示
  scope.showDropdown()

  console.log('autocomplete选中的值:', item)
}

const handleConfirm = (scope, isComfirm = true) => {
  if (!isComfirm || !autoValue.value) {
    // 空值则隐藏面板
    scope.onConfirm()
  } else {
    // 确认时，传入新标签的信息（value键对应标签的展示值）。若想生成单个标签则传一个对象，
    scope.onConfirm({ value: autoValue.value })
    // 生成多个标签则传一个数组
    // scope.onConfirm([{ value: autoValue.value }, { value: '我是多标签的固定值', id: 1 }])
  }
}
</script>

<template>
  <tvp-search-box v-model="tags" :items="items" editable @change="onChange">
    <!-- autocomplete对应的自定义二级面板 -->
    <template #autocomplete="scope">
      <div class="tvp-search-box__date-wrap">
        <div class="tvp-search-box__dropdown-title">选择人员</div>
        <!-- 通过 debounce 属性可以设置获取输入建议的去抖延时，默认值为 300 毫秒 -->
        <tiny-autocomplete
          v-model="autoValue"
          :fetch-suggestions="querySearch"
          :debounce="1000"
          placeholder="请输入工号/姓名"
          @select="handleSelect($event, scope)"
        ></tiny-autocomplete>
      </div>
      <div class="tvp-search-box__bottom-btn">
        <!-- 确认时阻止点击事件冒泡 -->
        <tiny-button size="mini" @click.stop="handleConfirm(scope)"> 确认 </tiny-button>
        <tiny-button size="mini" @click.stop="handleConfirm(scope, false)"> 取消 </tiny-button>
      </div>
    </template>
    <!-- other对应的自定义二级面板 -->
    <template #other="scope">
      <span @click.stop="scope.onConfirm({ value: 'other' })">other</span>
    </template>
    <!-- 编辑状态下：autocomplete对应的自定义面板 -->
    <template #autocomplete-edit="scope">
      <div class="tvp-search-box__date-wrap">
        <div class="tvp-search-box__dropdown-title">选择人员</div>
        <tiny-autocomplete
          v-model="autoValue"
          :fetch-suggestions="querySearch"
          :debounce="1000"
          placeholder="请输入工号/姓名"
          @select="handleSelect($event, scope)"
        ></tiny-autocomplete>
      </div>
      <div class="tvp-search-box__bottom-btn">
        <tiny-button size="mini" @click="handleConfirm(scope)"> 确认 </tiny-button>
        <tiny-button size="mini" @click="handleConfirm(scope, false)"> 取消 </tiny-button>
      </div>
    </template>
    <!-- 编辑状态下：other对应的自定义二级面板 -->
    <template #other-edit="scope">
      <span @click="scope.onConfirm({ value: 'other' })">我是other对应的编辑态自定义面板</span>
    </template>
  </tvp-search-box>
</template>
