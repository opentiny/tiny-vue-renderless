<template>
  <tiny-dropdown-item
    v-show="state.inputValue.trim()"
    class="tvp-search-box__filter-item tvp-search-box__dropdown-item tvp-search-box__dropdown-item-init"
    @click="selectInputValue(state.inputValue)"
  >
    <span> {{ t('tvp.tvpSearchbox.initUse') }}＂{{ state.inputValue }}＂</span>
  </tiny-dropdown-item>
  <div v-show="!state.propItem.label && state.inputValue.trim()">
    <template v-for="(value, key) in state.matchItems" :key="key">
      <template v-if="value['attr'].length">
        <span class="tvp-search-box__filter-type">{{ key === '0' ? t('tvp.tvpSearchbox.attributeType') : key }}</span>
        <tiny-dropdown-item
          v-for="(item, index) in value['attr']"
          :key="item.label + index"
          class="tvp-search-box__filter-item tvp-search-box__dropdown-item"
          @click="selectPropItem(item)"
        >
          <span>
            <template v-for="text in item.match" :key="text">
              <span v-if="text.toLowerCase() === item.hightlighStr" class="tvp-search-box__text-highlight">{{
                text
              }}</span>
              <template v-else>{{ text }}</template>
            </template>
          </span>
        </tiny-dropdown-item>
      </template>
      <template v-if="value['attrValue'].length">
        <span class="tvp-search-box__filter-type">{{
          t('tvp.tvpSearchbox.propertyValue', [key === '0' ? t('tvp.tvpSearchbox.attributeType') : key])
        }}</span>
        <tiny-dropdown-item
          v-for="(item, index) in value['attrValue']"
          :key="item.label + index"
          :disabled="item.isChecked"
          class="tvp-search-box__filter-item tvp-search-box__dropdown-item"
          @click="selectRadioItem(item, true)"
        >
          <span>
            <template v-for="text in item.match" :key="text">
              <span v-if="text.toLowerCase() === item.hightlighStr" class="tvp-search-box__text-highlight">{{
                text
              }}</span>
              <template v-else>{{ text }}</template>
            </template>
          </span>
        </tiny-dropdown-item>
      </template>
    </template>
    <div v-show="state.potentialOptions">
      <span class="tvp-search-box__filter-type">{{ t('tvp.tvpSearchbox.matched') }}</span>
      <div id="potential-loading" class="tvp-search-box__potential-box">
        <div v-if="state.potentialOptions">
          <tiny-dropdown-item
            v-for="(item, index) in state.potentialOptions"
            :key="item.label + index"
            class="tvp-search-box__filter-item tvp-search-box__dropdown-item"
            @click="selectRadioItem(item, true)"
          >
            {{ item.label }}：
            <span class="tvp-search-box__text-highlight">{{ item.value }}</span>
          </tiny-dropdown-item>
        </div>
      </div>
    </div>
  </div>
  <div v-show="state.visible && !state.propItem.label && !state.inputValue.trim()" class="tvp-search-box__first-panel">
    <template v-for="(group, key) in state.groupItems" :key="key">
      <span v-if="group.length" class="tvp-search-box__filter-type">{{
        key === '0' ? t('tvp.tvpSearchbox.attributeType') : key
      }}</span>
      <tiny-dropdown-item
        v-for="(item, index) in group"
        :key="(item.field || item.label) + index"
        class="tvp-search-box__dropdown-item"
        @click="selectPropItem(item)"
      >
        <span :title="item.label">{{ item.label }}</span>
      </tiny-dropdown-item>
    </template>
  </div>
</template>

<script setup lang="ts">
import TinyDropdownItem from '@opentiny/vue-dropdown-item'
import { t } from '../index'
import '../index.less'

defineOptions({
  name: 'TinySearchBoxFirstLevelPanel'
})

defineProps({
  state: {
    type: Object,
    default: () => ({})
  },
  potentialOptions: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['events', 'selectInputValue', 'selectPropItem', 'selectRadioItem'])

const events = (eventName, p1?, p2?) => {
  emits('events', eventName, p1, p2)
}

const selectInputValue = (e) => {
  events('selectInputValue', e)
}

const selectPropItem = (e) => {
  events('selectPropItem', e)
}

const selectRadioItem = (e) => {
  events('selectRadioItem', e)
}
</script>
