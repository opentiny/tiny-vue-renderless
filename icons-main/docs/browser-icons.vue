<template>
  <div class="settings">
    <div>
      <template v-if="cat === 'base'">
        <label> 图标颜色:</label>
        <input type="color" is="ui-color" v-model="color" class="item" />
      </template>
      <label> 复制方式:</label>
      <select v-model="copyType" is="ui-select" class="item">
        <option value="all">完整标签</option>
        <option value="only-name">图标类名</option>
      </select>
    </div>
    <div>
      <input v-model="filterStr" type="text" is="ui-input" placeholder="搜索图标" />
    </div>
  </div>
  <div id="list" :style="{ '--icon-color': `${color}` }" @click="copyIcon($event)">
    <div v-for="(groupIcons, groupName) in displayGroups" :key="groupName" class="icons-group">
      <h2 :id="groupName" v-show="groupIcons.length > 0" class="icons-group-title" title="图标数">
        <span>{{ groupName }}</span>
        <sup class="icon-counts ignore-header"> {{ groupIcons.length }}</sup>
      </h2>
      <div v-for="(icon, index) in groupIcons" :key="index" class="icon-item">
        <i :class="[cat, 'ci-' + icon.name]" :data-name="icon.name"></i>
        <div class="icon-title" :title="icon.nameCn">{{ icon.nameCn }}</div>
        <div class="icon-name" :title="icon.name">{{ icon.name }}</div>
      </div>
    </div>
  </div>

  <div class="tip">
    {{ copyText + ' 复制成功' }}
  </div>
</template>

<script setup>
import { categorys } from '../categorys.ts'
import { ref, computed, nextTick } from 'vue'

const props = defineProps(['cat'])

const color = ref('#575757')
const copyType = ref('all')
const filterStr = ref('')

const clsPrefix = computed(() => {
  return props.cat === 'base' ? 'ci-' : 'ci-' + props.cat + '-'
})

const displayGroups = computed(() => {
  const icons = categorys[props.cat]

  const sortedGroups = Object.keys(icons)
    .sort((groupName1, groupName2) => {
      const num1 = parseInt(groupName1.split('-')[0])
      const num2 = parseInt(groupName2.split('-')[0])
      return num1 > num2 ? 1 : -1
    })
    .map((groupName) => {
      let groupIcons = icons[groupName]
      // 过滤图标
      if (filterStr.value) {
        groupIcons = groupIcons.filter((icon) => {
          return icon.name.includes(filterStr.value) || icon.nameCn.includes(filterStr.value)
        })
      }
      // 过滤后排序
      groupIcons.sort((g1, g2) => (g1.order > g2.order ? 1 : -1))

      return [groupName, groupIcons]
    })

  return Object.fromEntries(sortedGroups)
})

const copyText = ref('')
let rmTimer = 0

const copyIcon = (ev) => {
  const target = ev.target
  const name = target.dataset.name
  if (name) {
    const cls = 'ci-' + name
    const tag = `<i class="${cls}"></i>`
    copyText.value = copyType.value === 'all' ? tag : cls

    const tip = document.querySelector('.tip')
    tip.classList.add('active')

    rmTimer && clearTimeout(rmTimer)
    rmTimer = setTimeout(() => {
      tip.classList.remove('active')
    }, 3000)

    navigator.clipboard.writeText(copyText.value)
  }
}
</script>

<style>
/** 控制区 */
select,
input {
  appearance: auto;
  cursor: pointer;
  font-size: 16px;
}
.settings {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.settings .item {
  margin-left: 8px;
  margin-right: 12px;
}

.settings .item a {
  text-decoration: none;
}

/** 组别样式 */
.icons-group {
  margin-bottom: 0;
  margin-top: 32px;
}
.icon-counts {
  color: #0057c3;
  text-decoration: underline;
  margin-left: 8px;
  cursor: pointer;
}

/** 图标项样式 */
#list .icon-item {
  display: inline-block;
  text-align: center;
  font-size: 12px;
  color: #575d6c;
}
#list i {
  margin: 17px;
  transition: all 0.5s;
  color: var(--icon-color);
}
#list i:hover {
  transform: scale(1.5);
  cursor: copy;
}

.icon-title,
.icon-name {
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.4;
}

/** 图标尺寸的定制 */
#list .base {
  font-size: 32px;
}
#list .base ~ div {
  width: 80px;
}
#list .svc {
  font-size: 72px;
}
#list .svc ~ div {
  width: 108px;
}
#list .ext,
#list .stat {
  font-size: 80px;
}
#list .ext ~ div,
#list .stat ~ div {
  width: 120px;
}

/** 提示信息 */
.tip {
  position: fixed;
  top: 120px;
  left: 60%;
  transform: translateX(-50%);
  background-color: #c8f3ce;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  display: none;
}
.tip.active {
  display: block;
}
.dark .tip {
  background-color: #2a362e;
  color: #98989f;
}
</style>
