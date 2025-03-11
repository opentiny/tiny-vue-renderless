<script setup lang="ts">
import type { PropType } from 'vue'
import { reactive, getCurrentInstance, watch, nextTick, onMounted, computed, onBeforeUnmount } from 'vue'
import TinyTag from '@opentiny/vue-tag'
import TinyInput from '@opentiny/vue-input'
import TinyDropdown from '@opentiny/vue-dropdown'
import TinyDropdownMenu from '@opentiny/vue-dropdown-menu'
import TinyDropdownItem from '@opentiny/vue-dropdown-item'
import TinyCheckbox from '@opentiny/vue-checkbox'
import TinyCheckboxGroup from '@opentiny/vue-checkbox-group'
import TinyButton from '@opentiny/vue-button'
import TinyTooltip from '@opentiny/vue-tooltip'
import TinyDatePicker from '@opentiny/vue-date-picker'
import TinyForm from '@opentiny/vue-form'
import TinyFormItem from '@opentiny/vue-form-item'
import TinyPopover from '@opentiny/vue-popover'
import TinySelect from '@opentiny/vue-select'
import TinyOption from '@opentiny/vue-option'
import { iconSearch, iconClose, iconHelpQuery } from '@opentiny/vue-icon'
import { format } from '@opentiny/vue-renderless/common/date.js'
import { t } from '@opentiny/tiny-search-box-locale'
import { useTag } from './composables/use-tag'
import { useDropdown } from './composables/use-dropdown'
import { useMatch } from './composables/use-match'
import { useCheckbox } from './composables/use-checkbox'
import { useDatePicker } from './composables/use-datepicker'
import { useNumRange } from './composables/use-num-range'
import { useEdit } from './composables/use-edit'
import { useCustom } from './composables/use-custom'
import { useInit } from './composables/use-init'
import { $prefix } from '../../common'
import { usePlaceholder } from './composables/use-placeholder'
import type { ISearchBoxItem, ISearchBoxTag, ISearchBoxMatchOptions } from './index.type'
import { showDropdown, showPopover } from './utils/dropdown'
import './index.less'
import { deepClone } from './utils/clone'

defineOptions({
  name: $prefix + 'SearchBox'
})

const props = defineProps({
  modelValue: {
    type: Array as PropType<ISearchBoxTag[]>,
    default() {
      return []
    }
  },
  items: {
    type: Array as PropType<ISearchBoxItem[]>,
    default: () => []
  },
  emptyPlaceholder: {
    type: String,
    default: t('tvp.tvpSearchbox.defaultPlaceholder')
  },
  potentialOptions: {
    type: Object as PropType<ISearchBoxMatchOptions>,
    default() {
      return null
    }
  },
  // 是否显示帮助图标，新规范默认显示
  showHelp: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  // 标签标识键
  idMapKey: {
    type: String,
    default: 'id'
  },
  // 自定义默认搜索项
  defaultField: {
    type: String,
    default: ''
  },
  editable: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: Number
  },
  // 3.18.0新增
  panelMaxHeight: {
    type: String,
    default: '999px'
  },
  // 3.18.0新增
  splitInputValue: {
    type: String,
    default: ','
  },
  // 3.18.0新增
  showNoDataTip: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['update:modelValue', 'change', 'search', 'exceed', 'first-level-select'])

const state = reactive({
  innerModelValue: [...props.modelValue],
  recordItems: [] as ISearchBoxItem[],
  groupItems: {},
  inputValue: '',
  matchItems: {},
  propItem: {},
  backupList: [],
  filterList: [],
  checkboxGroup: [],
  prevItem: {},
  backupPrevItem: '',
  formRules: null,
  validType: 'text',
  numberShowMessage: true,
  startDate: null,
  startDateTime: null,
  endDate: null,
  endDateTime: null,
  isShowTagKey: true,
  potentialOptions: null,
  hiden: true,
  dateRangeFormat: 'yyyy/MM/dd',
  datetimeRangeFormat: 'yyyy/MM/dd HH:mm:ss',
  indexMap: new Map(),
  valueMap: new Map(),
  popoverVisible: false,
  selectValue: '',
  allTypeAttri: { label: t('tvp.tvpSearchbox.rulekeyword1'), field: 'tvpKeyword', type: 'radio' },
  operatorValue: ':', // 当前操作符值
  inputEditValue: '',
  currentOperators: '',
  currentEditValue: '',
  isShowDropdown: true, // 控制有匹配数据展示开关
  isShowPanel: true, // 控制面板显隐
  currentModelValueIndex: -1, // 当前编辑的标签索引
  curMinNumVar: '', // numRange最小值变量
  curMaxNumVar: '', // numRange最大值变量
  instance: getCurrentInstance(),
  isMouseDown: false,
  isResetFlag: true, // 输入框触发源重置
  currentEditSelectTags: [] // 当前编辑多选的标签值
})
state.isShowPanel = computed(
  () =>
    state.isResetFlag &&
    (props.showNoDataTip || (!props.showNoDataTip && state.isShowDropdown)) &&
    (state.prevItem.type || !state.propItem.label || state.backupList.length || state.currentOperators?.length)
)

const TinyIconSearch = iconSearch()
const TinyIconClose = iconClose()
const TinyIconHelpQuery = iconHelpQuery()

const { selectPropItem, selectRadioItem, createTag, helpClick, setOperator } = useDropdown({
  props,
  emits,
  state,
  t,
  format
})

const { deleteTag, clearTag, backspaceDeleteTag } = useTag({
  props,
  state,
  emits
})

const { editTag, confirmEditTag, selectPropChange, selectItemIsDisable } = useEdit({
  props,
  state,
  t,
  nextTick,
  format,
  emits
})

const { handleInput, selectFirstMap } = useMatch({
  props,
  state,
  emits
})

const { placeholder, setPlaceholder } = usePlaceholder({ props, state, t })

const { selectCheckbox, isIndeterminate, checkAll, isShowClose } = useCheckbox({
  props,
  state,
  emits
})

const { onConfirmDate, handleDateShow, pickerOptions } = useDatePicker({
  props,
  state,
  emits
})

const { sizeChange, initFormRule } = useNumRange({
  props,
  state,
  t,
  emits
})

const { handleConfirm, handleEditConfirm } = useCustom({ state, emits })

const { initItems, watchOutsideClick, watchMouseDown, watchMouseMove, handleClick } = useInit({
  props,
  state
})

// 处理异步items数据渲染
watch(
  () => props.items,
  (newVal: ISearchBoxItem[]) => {
    state.recordItems = deepClone(newVal)
    initItems()
    initFormRule()
  },
  {
    deep: true,
    immediate: true
  }
)

watch(
  () => state.popoverVisible,
  (newVal) => {
    if (!newVal && !state.inputEditValue.length) {
      state.inputEditValue = state.currentEditSelectTags
    }
  },
  {
    immediate: true
  }
)

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      state.indexMap.clear()
      state.valueMap.clear()
      newVal.forEach((item, index) => {
        const value = `${item.label}${item.value}`
        state.indexMap.set(item.label, index)
        state.valueMap.set(value, index)
        if (item.options?.length > 0) {
          item.options.forEach((option) => {
            const optionValue = `${item.label}${option.label}`
            state.valueMap.set(optionValue, index)
          })
        }
      })
      showPopover(state, false)
      if (newVal.length === 0) {
        setPlaceholder(props.emptyPlaceholder)
      }

      if (props.editable && !state.inputEditValue.length && newVal[0]) {
        state.inputEditValue = newVal[0].value
      }
    }
    state.innerModelValue = [...newVal]
  },
  {
    deep: true,
    immediate: true
  }
)

onMounted(() => {
  document.addEventListener('click', watchOutsideClick)
  document.addEventListener('mousedown', watchMouseDown)
  document.addEventListener('mousemove', watchMouseMove)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', watchOutsideClick)
  document.removeEventListener('mousedown', watchMouseDown)
  document.removeEventListener('mousemove', watchMouseMove)
})

defineExpose({
  state
})
</script>

<template>
  <div class="tvp-search-box" @click.stop="showPopover(state, false)">
    <tiny-icon-search class="tvp-search-box__prefix" />
    <tiny-tag
      v-for="(tag, index) in modelValue"
      :key="tag.field + index"
      closable
      :class="['tvp-search-box__tag', editable && tag.type !== 'map' ? 'tvp-search-box__tag-editor' : '']"
      :title="`${tag.label} ${tag.operator || ':'} ${tag.value}`"
      @close="deleteTag(tag)"
      @click.stop="editTag(tag, index, $event)"
    >
      <span class="tvp-search-box__tag-value">{{ tag.label }} {{ tag.operator || ':' }} {{ tag.value }} </span>
    </tiny-tag>
    <span v-if="modelValue.length" class="tvp-search-box__placeholder"></span>

    <tiny-form
      ref="formRef"
      :model="state"
      :rules="state.formRules"
      :validate-type="state.validType"
      label-width="0px"
      message-type="block"
      class="tvp-search-box__form"
    >
      <div class="tvp-search-box__input-wrapper">
        <section class="tvp-search-box__prop">
          <span v-show="state.propItem.label"
            >{{ state.propItem.label }}&nbsp;{{ `${state.operatorValue ? state.operatorValue : ''}&nbsp;` }}</span
          >
          <span v-show="state.propItem.value">{{ state.propItem.value }}</span>
        </section>
        <tiny-dropdown
          ref="dropdownRef"
          trigger="click"
          class="tvp-search-box__dropdown"
          :hide-on-click="state.hiden"
          :show-icon="false"
          lazy-show-popper
        >
          <tiny-input
            ref="inputRef"
            v-model="state.inputValue"
            class="tvp-search-box__input"
            :placeholder="placeholder"
            :maxlength="maxlength && maxlength + 1"
            @keydown.delete.stop="backspaceDeleteTag"
            @keydown.enter.stop="createTag"
            @input="handleInput"
            @focus="showPopover(state, false)"
            @click="handleClick"
          >
            <template #suffix>
              <tiny-icon-close v-show="isShowClose" class="tvp-search-box__input-close" @click.stop="clearTag" />
              <span v-show="isShowClose" class="tvp-search-box__input-separator"></span>
              <tiny-tooltip v-if="showHelp" effect="dark" :content="t('tvp.tvpSearchbox.help')" placement="top">
                <tiny-icon-help-query class="tvp-search-box__input-help" @click.stop="helpClick" />
              </tiny-tooltip>
              <tiny-icon-search class="tvp-search-box__input-search" @click.stop="createTag" />
            </template>
          </tiny-input>
          <template #dropdown>
            <tiny-dropdown-menu
              placement="bottom-start"
              popper-class="tvp-search-box__dropdown-menu"
              :style="{ 'max-height': panelMaxHeight }"
              @mouseup.stop="() => {}"
            >
              <div v-show="state.isResetFlag && !state.propItem.label && state.inputValue.trim()">
                <template v-for="(value, key) in state.matchItems" :key="key">
                  <template v-if="value['attr'].length">
                    <span class="tvp-search-box__filter-type">{{
                      key === '0' ? t('tvp.tvpSearchbox.attributeType') : key
                    }}</span>
                    <tiny-dropdown-item
                      v-for="(item, index) in value['attr']"
                      :key="item.label + index"
                      class="tvp-search-box__filter-item tvp-search-box__dropdown-item"
                      @click="selectPropItem(item)"
                    >
                      <span>
                        <template v-for="text in item.match" :key="text">
                          <span v-if="Array.isArray(text)" class="tvp-search-box__text-highlight">{{ text[0] }}</span>
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
                          <span v-if="Array.isArray(text)" class="tvp-search-box__text-highlight">{{ text[0] }}</span>
                          <template v-else>{{ text }}</template>
                        </template>
                      </span>
                    </tiny-dropdown-item>
                  </template>
                </template>
                <tiny-dropdown-item v-if="showNoDataTip && !state.isShowDropdown">
                  <div>{{ t('tvp.tvpSearchbox.noData') }}</div>
                </tiny-dropdown-item>
                <div v-show="props.potentialOptions">
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
              <div
                v-show="state.isResetFlag && !state.propItem.label && !state.inputValue.trim()"
                class="tvp-search-box__first-panel"
              >
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
              <!-- 有label的情况 -->
              <div v-show="state.isResetFlag && state.propItem.label">
                <div v-if="state.currentOperators?.length">
                  <span class="tvp-search-box__filter-type">{{ t('tvp.tvpSearchbox.operator') }}</span>
                  <tiny-dropdown-item
                    v-for="(item, index) in state.currentOperators"
                    v-show="item.includes(state.inputValue)"
                    :key="item + index"
                    class="tvp-search-box__dropdown-item"
                    @click="setOperator(item)"
                  >
                    {{ item }}
                  </tiny-dropdown-item>
                </div>
                <div
                  v-else-if="!state.prevItem.type || state.prevItem.type === 'radio'"
                  class="tvp-search-box__radio-wrap"
                >
                  <tiny-dropdown-item
                    v-for="(item, index) in state.backupList"
                    v-show="!item.isFilter || !state.inputValue"
                    :key="index + (item.field || item.label)"
                    :disabled="item.isChecked"
                    class="tvp-search-box__dropdown-item"
                    @click="selectRadioItem(item)"
                  >
                    <span v-if="item.match" :title="item.label">
                      <template v-for="text in item.match" :key="text">
                        <span v-if="Array.isArray(text)" class="tvp-search-box__text-highlight">{{ text[0] }}</span>
                        <template v-else>{{ text }}</template></template
                      >
                    </span>
                    <span v-else :title="item.label">{{ item.label }}</span>
                  </tiny-dropdown-item>
                </div>
                <div v-else-if="state.isResetFlag && state.prevItem.type === 'checkbox'">
                  <div class="tvp-search-box__checkbox-wrap">
                    <tiny-checkbox-group v-model="checkAll" class="tvp-search-box__checkbox">
                      <tiny-dropdown-item class="tvp-search-box__dropdown-item tvp-search-box__checkbox-item">
                        <tiny-checkbox v-model="checkAll" :indeterminate="isIndeterminate">
                          {{ t('tvp.tvpSearchbox.selectAll') }}
                        </tiny-checkbox>
                      </tiny-dropdown-item>
                    </tiny-checkbox-group>
                    <tiny-checkbox-group v-model="state.checkboxGroup" class="tvp-search-box__checkbox">
                      <tiny-dropdown-item
                        v-for="(item, index) in state.backupList"
                        v-show="!item.isFilter"
                        :key="(item.field || item.label) + index"
                        class="tvp-search-box__dropdown-item tvp-search-box__checkbox-item"
                      >
                        <tiny-checkbox
                          :label="state.prevItem.label + item.label"
                          :title="item.label"
                          class="tvp-search-box__checkbox-item-label"
                        >
                          {{ item.label }}
                        </tiny-checkbox>
                      </tiny-dropdown-item>
                    </tiny-checkbox-group>
                  </div>
                  <div class="tvp-search-box__checkbox-btn">
                    <tiny-button size="mini" @click="selectCheckbox(true)">
                      {{ t('tvp.tvpSearchbox.confirm') }}
                    </tiny-button>
                    <tiny-button size="mini" @click="selectCheckbox(false)">
                      {{ t('tvp.tvpSearchbox.cancel') }}
                    </tiny-button>
                  </div>
                </div>
                <div v-else-if="state.prevItem.type === 'numRange'" class="tvp-search-box__panel-box">
                  <div class="tvp-search-box__number">
                    <div class="tvp-search-box__dropdown-title">{{ t('tvp.tvpSearchbox.rangeNumberTitle') }}</div>
                    <div class="tvp-search-box__dropdown-start">
                      {{ t('tvp.tvpSearchbox.minValueText') }}({{ state.prevItem.unit }})
                    </div>
                    <tiny-form-item
                      :prop="state.curMinNumVar"
                      class="tvp-search-box__number-item"
                      :show-message="state.numberShowMessage"
                    >
                      <tiny-input
                        v-model="state[state.curMinNumVar]"
                        type="number"
                        class="tvp-search-box__number-input"
                      ></tiny-input>
                    </tiny-form-item>
                    <div class="tvp-search-box__dropdown-end">
                      {{ t('tvp.tvpSearchbox.maxValueText') }}({{ state.prevItem.unit }})
                    </div>
                    <tiny-form-item :prop="state.curMaxNumVar" class="tvp-search-box__number-item">
                      <tiny-input
                        v-model="state[state.curMaxNumVar]"
                        type="number"
                        class="tvp-search-box__number-input"
                      ></tiny-input>
                    </tiny-form-item>
                  </div>
                  <div class="tvp-search-box__bottom-btn">
                    <tiny-button size="mini" @click.stop="sizeChange(true)">
                      {{ t('tvp.tvpSearchbox.confirm') }}
                    </tiny-button>
                    <tiny-button size="mini" @click="sizeChange(false)">{{ t('tvp.tvpSearchbox.cancel') }}</tiny-button>
                  </div>
                </div>

                <div v-else-if="state.prevItem.type === 'dateRange'" class="tvp-search-box__panel-box">
                  <div class="tvp-search-box__date-wrap">
                    <div class="tvp-search-box__dropdown-title">
                      {{
                        state.prevItem.maxTimeLength > 0
                          ? t('tvp.tvpSearchbox.timeLengthTitle', {
                              value: (state.prevItem.maxTimeLength / 86400000).toFixed(1)
                            })
                          : t('tvp.tvpSearchbox.rangeDateTitle')
                      }}
                    </div>
                    <div class="tvp-search-box__dropdown-start">{{ t('tvp.tvpSearchbox.rangeBeginLabel') }}</div>
                    <tiny-form-item
                      prop="startDate"
                      :show-message="Boolean(state.prevItem.maxTimeLength)"
                      class="tvp-search-box__date-item"
                    >
                      <tiny-date-picker
                        v-model="state.startDate"
                        :format="state.prevItem.format || state.dateRangeFormat"
                        :value-format="state.prevItem.format || state.dateRangeFormat"
                        :picker-options="pickerOptions(state.startDate, 'endDate')"
                        class="tvp-search-box__date-picker"
                        @change="handleDateShow"
                        @blur="handleDateShow"
                      ></tiny-date-picker>
                    </tiny-form-item>
                    <div class="tvp-search-box__dropdown-end">{{ t('tvp.tvpSearchbox.rangeEndLabel') }}</div>
                    <tiny-form-item prop="endDate" class="tvp-search-box__date-item">
                      <tiny-date-picker
                        v-model="state.endDate"
                        :format="state.prevItem.format || state.dateRangeFormat"
                        :value-format="state.prevItem.format || state.dateRangeFormat"
                        :picker-options="pickerOptions(state.startDate)"
                        class="tvp-search-box__date-picker"
                        @change="handleDateShow"
                        @blur="handleDateShow"
                      ></tiny-date-picker>
                    </tiny-form-item>
                  </div>
                  <div class="tvp-search-box__bottom-btn">
                    <tiny-button size="mini" @click="onConfirmDate(true)">
                      {{ t('tvp.tvpSearchbox.confirm') }}
                    </tiny-button>
                    <tiny-button size="mini" @click="onConfirmDate(false)">
                      {{ t('tvp.tvpSearchbox.cancel') }}
                    </tiny-button>
                  </div>
                </div>

                <div v-else-if="state.prevItem.type === 'datetimeRange'" class="tvp-search-box__panel-box">
                  <div class="tvp-search-box__date-wrap">
                    <div class="tvp-search-box__dropdown-title">
                      {{
                        state.prevItem.maxTimeLength > 0
                          ? t('tvp.tvpSearchbox.timeLengthTitle', {
                              value: (state.prevItem.maxTimeLength / 86400000).toFixed(1)
                            })
                          : t('tvp.tvpSearchbox.rangeDateTitle')
                      }}
                    </div>
                    <div class="tvp-search-box__dropdown-start">{{ t('tvp.tvpSearchbox.rangeBeginLabel') }}</div>
                    <tiny-form-item
                      prop="startDateTime"
                      :show-message="Boolean(state.prevItem.maxTimeLength)"
                      class="tvp-search-box__date-item"
                    >
                      <tiny-date-picker
                        v-model="state.startDateTime"
                        type="datetime"
                        :isutc8="true"
                        :format="state.prevItem.format || state.datetimeRangeFormat"
                        :value-format="state.prevItem.format || state.datetimeRangeFormat"
                        :picker-options="pickerOptions(state.startDateTime, 'endDateTime')"
                        class="tvp-search-box__date-picker"
                        @change="handleDateShow"
                        @blur="handleDateShow"
                      ></tiny-date-picker>
                    </tiny-form-item>
                    <div class="tvp-search-box__dropdown-end">{{ t('tvp.tvpSearchbox.rangeEndLabel') }}</div>
                    <tiny-form-item prop="endDateTime" class="tvp-search-box__date-item">
                      <tiny-date-picker
                        v-model="state.endDateTime"
                        type="datetime"
                        :isutc8="true"
                        :format="state.prevItem.format || state.datetimeRangeFormat"
                        :value-format="state.prevItem.format || state.datetimeRangeFormat"
                        :picker-options="pickerOptions(state.startDateTime)"
                        class="tvp-search-box__date-picker"
                        @change="handleDateShow"
                        @blur="handleDateShow"
                      ></tiny-date-picker>
                    </tiny-form-item>
                  </div>
                  <div class="tvp-search-box__bottom-btn">
                    <tiny-button size="mini" @click="onConfirmDate(true, true)">
                      {{ t('tvp.tvpSearchbox.confirm') }}
                    </tiny-button>
                    <tiny-button size="mini" @click="onConfirmDate(false, true)">
                      {{ t('tvp.tvpSearchbox.cancel') }}
                    </tiny-button>
                  </div>
                </div>

                <div v-else-if="state.prevItem.type === 'map'">
                  <span v-if="state.isShowTagKey" class="tvp-search-box__filter-type">{{
                    t('tvp.tvpSearchbox.tagKey')
                  }}</span>
                  <span v-else class="tvp-search-box__filter-type">{{ t('tvp.tvpSearchbox.tagValue') }}</span>
                  <tiny-dropdown-item
                    v-for="(item, index) in state.backupList"
                    v-show="!item.isFilter"
                    :key="item.label + item.value + index"
                    :disabled="item.isChecked"
                    class="tvp-search-box__dropdown-item"
                    @click="selectFirstMap(item, state.isShowTagKey)"
                  >
                    <span :title="item.label">{{ item.label }}</span>
                  </tiny-dropdown-item>
                </div>
                <div
                  v-else-if="state.prevItem.type === 'custom'"
                  class="tvp-search-box__panel-box"
                  @click="showDropdown(state)"
                >
                  <slot
                    :name="state.prevItem.slotName"
                    v-bind="{
                      showDropdown: () => showDropdown(state),
                      onConfirm: handleConfirm
                    }"
                    @click.stop
                  ></slot>
                </div>
                <tiny-dropdown-item v-if="showNoDataTip && !state.isShowDropdown">
                  <div>{{ t('tvp.tvpSearchbox.noData') }}</div>
                </tiny-dropdown-item>
              </div>
            </tiny-dropdown-menu>
          </template>
        </tiny-dropdown>
      </div>

      <template v-if="editable">
        <tiny-popover
          ref="popoverRef"
          v-model="state.popoverVisible"
          placement="bottom-start"
          :visible-arrow="false"
          trigger="manual"
          popper-class="tvp-search-box__popover"
          class="tvp-search-box__form-popover"
        >
          <template v-if="state.prevItem.type !== 'custom'">
            <div class="tvp-search-box__date-wrap">
              <div class="tvp-search-box__dropdown-start">
                {{ t('tvp.tvpSearchbox.attributeType') }}
              </div>
              <tiny-form-item class="tvp-search-box__number-item">
                <tiny-select v-model="state.selectValue" searchable :disabled="state.prevItem.editAttrDisabled">
                  <tiny-option
                    :key="state.allTypeAttri.label"
                    :label="t('tvp.tvpSearchbox.allProperty')"
                    :value="state.allTypeAttri.label"
                    :disabled="selectItemIsDisable(state.allTypeAttri)"
                    @click="selectPropChange(state.allTypeAttri, selectItemIsDisable(state.allTypeAttri))"
                  >
                  </tiny-option>
                  <tiny-option
                    v-for="item in state.recordItems"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                    :disabled="selectItemIsDisable(item)"
                    @click="selectPropChange(item, selectItemIsDisable(item))"
                  >
                  </tiny-option>
                </tiny-select>
              </tiny-form-item>
              <div v-if="state.prevItem.operators" class="tvp-search-box__dropdown-end">
                {{ t('tvp.tvpSearchbox.operator') }}
              </div>
              <tiny-form-item v-if="state.prevItem.operators" class="tvp-search-box__number-item">
                <tiny-select v-model="state.operatorValue">
                  <tiny-option v-for="item in state.currentOperators" :key="item" :label="item" :value="item">
                  </tiny-option>
                </tiny-select>
              </tiny-form-item>
              <div v-if="state.prevItem.type !== 'numRange'" class="tvp-search-box__dropdown-end">
                {{ t('tvp.tvpSearchbox.tagValue') }}
              </div>
              <tiny-form-item
                v-if="!['numRange', 'dateRange', 'datetimeRange', 'custom'].includes(state.prevItem.type)"
                prop="inputEditValue"
                class="tvp-search-box__number-item"
              >
                <tiny-select
                  v-if="state.currentEditValue?.length > 0"
                  v-model="state.inputEditValue"
                  class="tvp-search-box-select"
                  :multiple="Boolean(state.prevItem.mergeTag)"
                  allow-create
                  filterable
                  default-first-option
                  clearable
                >
                  <tiny-option
                    v-for="item in state.currentEditValue"
                    :key="item.label"
                    :label="item.label"
                    :value="item.label"
                  >
                  </tiny-option>
                </tiny-select>
                <tiny-input v-else v-model="state.inputEditValue" clearable></tiny-input>
              </tiny-form-item>
              <div v-if="state.prevItem.type === 'numRange'" class="tvp-search-box__number">
                <div class="tvp-search-box__dropdown-start">
                  {{ t('tvp.tvpSearchbox.minValueText') }}({{ state.prevItem.unit }})
                </div>
                <tiny-form-item
                  :prop="state.curMinNumVar"
                  class="tvp-search-box__number-item"
                  :show-message="state.numberShowMessage"
                >
                  <tiny-input
                    v-model="state[state.curMinNumVar]"
                    type="number"
                    class="tvp-search-box__number-input"
                  ></tiny-input>
                </tiny-form-item>
                <div class="tvp-search-box__dropdown-end">
                  {{ t('tvp.tvpSearchbox.maxValueText') }}({{ state.prevItem.unit }})
                </div>
                <tiny-form-item :prop="state.curMaxNumVar" class="tvp-search-box__number-item">
                  <tiny-input
                    v-model="state[state.curMaxNumVar]"
                    type="number"
                    class="tvp-search-box__number-input"
                  ></tiny-input>
                </tiny-form-item>
              </div>
              <div v-if="state.prevItem.type === 'dateRange'" class="tvp-search-box__date-wrap">
                <div class="tvp-search-box__dropdown-title">
                  {{
                    state.prevItem.maxTimeLength > 0
                      ? t('tvp.tvpSearchbox.timeLengthTitle', {
                          value: (state.prevItem.maxTimeLength / 86400000).toFixed(1)
                        })
                      : t('tvp.tvpSearchbox.rangeDateTitle')
                  }}
                </div>
                <div class="tvp-search-box__dropdown-start">{{ t('tvp.tvpSearchbox.rangeBeginLabel') }}</div>
                <tiny-form-item
                  prop="startDate"
                  :show-message="Boolean(state.prevItem.maxTimeLength)"
                  class="tvp-search-box__date-item"
                >
                  <tiny-date-picker
                    v-model="state.startDate"
                    :format="state.prevItem.format || state.dateRangeFormat"
                    :value-format="state.prevItem.format || state.dateRangeFormat"
                    :picker-options="pickerOptions(state.startDate, 'endDate')"
                    class="tvp-search-box__date-picker"
                  ></tiny-date-picker>
                </tiny-form-item>
                <div class="tvp-search-box__dropdown-end">{{ t('tvp.tvpSearchbox.rangeEndLabel') }}</div>
                <tiny-form-item prop="endDate" class="tvp-search-box__date-item">
                  <tiny-date-picker
                    v-model="state.endDate"
                    :format="state.prevItem.format || state.dateRangeFormat"
                    :value-format="state.prevItem.format || state.dateRangeFormat"
                    :picker-options="pickerOptions(state.startDate)"
                    class="tvp-search-box__date-picker"
                  ></tiny-date-picker>
                </tiny-form-item>
              </div>
              <div v-if="state.prevItem.type === 'datetimeRange'" class="tvp-search-box__date-wrap">
                <div class="tvp-search-box__dropdown-title">
                  {{
                    state.prevItem.maxTimeLength > 0
                      ? t('tvp.tvpSearchbox.timeLengthTitle', {
                          value: (state.prevItem.maxTimeLength / 86400000).toFixed(1)
                        })
                      : t('tvp.tvpSearchbox.rangeDateTitle')
                  }}
                </div>
                <div class="tvp-search-box__dropdown-start">{{ t('tvp.tvpSearchbox.rangeBeginLabel') }}</div>
                <tiny-form-item
                  prop="startDateTime"
                  :show-message="Boolean(state.prevItem.maxTimeLength)"
                  class="tvp-search-box__date-item"
                >
                  <tiny-date-picker
                    v-model="state.startDateTime"
                    type="datetime"
                    :isutc8="true"
                    :format="state.prevItem.format || state.datetimeRangeFormat"
                    :value-format="state.prevItem.format || state.datetimeRangeFormat"
                    :picker-options="pickerOptions(state.startDateTime, 'endDateTime')"
                    class="tvp-search-box__date-picker"
                  ></tiny-date-picker>
                </tiny-form-item>
                <div class="tvp-search-box__dropdown-end">{{ t('tvp.tvpSearchbox.rangeEndLabel') }}</div>
                <tiny-form-item prop="endDateTime" class="tvp-search-box__date-item">
                  <tiny-date-picker
                    v-model="state.endDateTime"
                    type="datetime"
                    :isutc8="true"
                    :format="state.prevItem.format || state.datetimeRangeFormat"
                    :value-format="state.prevItem.format || state.datetimeRangeFormat"
                    :picker-options="pickerOptions(state.startDateTime)"
                    class="tvp-search-box__date-picker"
                  ></tiny-date-picker>
                </tiny-form-item>
              </div>
            </div>
            <div class="tvp-search-box__bottom-btn">
              <tiny-button size="mini" @click="confirmEditTag(true)">
                {{ t('tvp.tvpSearchbox.confirm') }}
              </tiny-button>
              <tiny-button size="mini" @click="confirmEditTag(false)">
                {{ t('tvp.tvpSearchbox.cancel') }}
              </tiny-button>
            </div>
          </template>
          <div v-else class="tvp-search-box__panel-box">
            <slot
              :name="`${state.prevItem.slotName}-edit`"
              v-bind="{
                showDropdown: () => showPopover(state),
                onConfirm: handleEditConfirm
              }"
              @click.stop
            ></slot>
          </div>
        </tiny-popover>
      </template>
    </tiny-form>
  </div>
</template>
