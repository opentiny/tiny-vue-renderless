export default {
  mode: ['pc'],
  apis: [
    {
      name: 'SearchBox',
      type: 'component',
      props: [
        {
          name: 'default-field',
          type: 'string',
          defaultValue: '',
          desc: {
            'zh-CN':
              '自定义按下enter键时，默认搜索的范围；此属性为空时，则默认在关键字范围下搜索 xxx，即生成的搜索标签为 `关键字：xxx` 【3.13.0版本新增】',
            'en-US':
              'Customize the default search range when you press Enter. If this parameter is left blank, xxx is searched in the keyword range by default. That is, the generated search tag is `Keyword: xxx`，[Added in 3.13.0]'
          },
          demoId: 'settings'
        },
        {
          name: 'editable',
          type: 'boolean',
          defaultValue: 'false',
          desc: {
            'zh-CN': '是否开启标签编辑功能，（注：map 类型不支持编辑）【3.14.0新增】',
            'en-US':
              'Whether to enable the tag editing function. (Note: The map type does not support editing.)[Added in 3.14.0]'
          },
          demoId: 'editable'
        },
        {
          name: 'empty-placeholder',
          type: 'string',
          defaultValue: `'默认按照关键字搜索'`,
          desc: {
            'zh-CN': '没有筛选项时的占位文本',
            'en-US': 'Placeholder text with no filtered items'
          },
          demoId: 'empty-placeholder'
        },
        {
          name: 'id-map-key',
          type: 'string',
          defaultValue: '',
          desc: {
            'zh-CN':
              '配置用来识别筛选项的 id 键取值来源，默认取自 props.items 数据的 id 键，一般用于接口返回的 props.items 数据字段不匹配，但是又需要其中一个键值来识别筛选项的情况；注意：不建议使用 label/value/field 等字段，会被覆盖',
            'en-US':
              'Source of the ID key used to identify a filtering item. The default value is the ID key of the props.items data. Generally, this parameter is used when the props.items data field returned by the interface does not match but one of the key values is required to identify a filtering item.Note: You are not advised to use the label, value, and field fields because they will be overwritten'
          },
          demoId: 'id-map-key'
        },
        {
          name: 'items',
          type: 'ISearchBoxItem[]',
          typeAnchorName: 'ISearchBoxItem',
          defaultValue: '[]',
          desc: {
            'zh-CN': '数据项',
            'en-US': 'Data items'
          },
          demoId: 'basic-usage'
        },
        {
          name: 'maxlength',
          type: 'number',
          defaultValue: '',
          desc: {
            'zh-CN': 'input 元素的原生属性，限制输入框的长度，可配合 exceed 监听输入超出限定长度的事件【3.16.0新增】',
            'en-US':
              'Native attribute of the input element, which limits the length of the input box. This attribute can be used with exceed to listen to the event that the input exceeds the specified length[Added in 3.16.0]'
          },
          demoId: 'max-length'
        },
        {
          name: 'model-value/v-model',
          type: 'ISearchBoxTag[]',
          typeAnchorName: 'ISearchBoxTag',
          defaultValue: '[]',
          desc: {
            'zh-CN': '选中的标签列表',
            'en-US': 'List of selected tags'
          },
          demoId: 'v-model'
        },
        {
          name: 'panel-max-height',
          type: 'string',
          defaultValue: `'999px'`,
          desc: {
            'zh-CN': '设置下拉面板最大高度',
            'en-US': 'Set the maximum height of the drop-down panel.'
          },
          meta: {
            stable: '3.18.0'
          },
          demoId: 'panel-max-height'
        },
        {
          name: 'potential-options',
          type: '{ getMatchList: (arg1: string) => ISearchBoxMatchItem[] }',
          typeAnchorName: 'ISearchBoxMatchItem',
          defaultValue: '{}',
          desc: {
            'zh-CN': '潜在项匹配，接口返回潜在匹配项的数据列表，异步或同步皆可',
            'en-US':
              'Potential item matching. The interface returns the data list of potential matching items, which can be asynchronous or synchronous'
          },
          demoId: 'potential-options'
        },
        {
          name: 'show-help',
          type: 'Boolean',
          defaultValue: 'true',
          desc: {
            'zh-CN': '是否显示帮助图标。3.14.0及以上版本默认显示；低于此版本默认隐藏',
            'en-US':
              'Indicates whether to display the help icon. 3.14.0 and later versions are displayed by default. Hidden by default for versions earlier than'
          },
          demoId: 'help'
        },
        {
          name: 'show-no-data-tip',
          type: 'Boolean',
          defaultValue: 'true',
          desc: {
            'zh-CN': '控制显隐面板的无数据提示',
            'en-US': 'Controls the no-data prompt on the hidden panel'
          },
          meta: {
            stable: '3.18.0'
          },
          demoId: 'auto-match'
        },
        {
          name: 'split-input-value',
          type: 'string',
          defaultValue: `','`,
          desc: {
            'zh-CN': '用于指定字符串，将输入值拆分成多个关键字，一次性生成多个标签，默认用英文逗号 "," 分隔',
            'en-US':
              'Specifies a character string. The input value is split into multiple keywords. Multiple tags are generated at a time. By default, the keywords are separated by commas (,).'
          },
          meta: {
            stable: '3.18.0'
          },
          demoId: 'split-input-value'
        }
      ],
      events: [
        {
          name: 'change',
          type: '(newFilters: ISearchBoxItem[], oldFilters: ISearchBoxItem[]) => void',
          typeAnchorName: 'ISearchBoxItem',
          defaultValue: '',
          desc: {
            'zh-CN': '绑定值变化触发的回调函数',
            'en-US': 'Callback function triggered by the change of the binding value'
          },
          demoId: 'auto-match'
        },
        {
          name: 'exceed',
          type: '(n: number) => void',
          defaultValue: '',
          desc: {
            'zh-CN': '输入值超出限定长度 [props.maxlength] 的值时触发',
            'en-US': 'Triggered when the input value exceeds the value of [props.maxlength]'
          },
          meta: {
            stable: '3.16.0'
          },
          demoId: 'max-length'
        },
        {
          name: 'first-level-select',
          type: '(n: string) => void',
          defaultValue: '',
          desc: {
            'zh-CN': '监听第一层级选择事件',
            'en-US': 'Listen to the first-level selection event'
          },
          meta: {
            stable: '3.18.0'
          },
          demoId: 'first-level-select'
        },
        {
          name: 'help',
          type: '() => void',
          defaultValue: '',
          desc: {
            'zh-CN': '点击帮助图标触发的回调函数',
            'en-US': 'Callback function triggered by clicking the help icon'
          },
          demoId: 'help'
        },
        {
          name: 'search',
          type: '(filters: ISearchBoxItem[]) => void',
          typeAnchorName: 'ISearchBoxItem',
          defaultValue: '',
          desc: {
            'zh-CN': '按下回车或点击搜索按钮触发搜索功能的回调函数',
            'en-US':
              'Callback function of the search function triggered by pressing Enter or clicking the search button'
          },
          demoId: 'auto-match'
        }
      ]
    }
  ],
  types: [
    {
      name: 'ISearchBoxItem',
      type: 'interface',
      code: `
interface ISearchBoxItem {
  field: string; // 搜索标签的label
  label: string; // tag 键的显示值
  type?: ISearchBoxTagType; // tag类型
  options?: ISearchBoxOption[]; // 选项数据
  regexp?: RegExp; // 此标签项的正则匹配
  replace?: boolean; // 单选或多选设置
  optionValueKey?: string; // 选中项键值
  format?: string; // 日期类型显示格式
  start?: number | Date; // 最小值或开始日期
  end?: number | Date; // 最大值或结束日期
  min?: number | Date; // 用于校验的最小值
  max?: number | Date; // 用于校验的最大值
  placeholder?: string; // 占位文本[3.18.0新增]
  editAttrDisabled: boolean; // 编辑状态此属性禁用状态，常用以设置不可变更[3.19.0新增]
  searchKeys?: Array<string>; // 搜索的字段范围
  idMapKey?: string; // 标识字段映射[3.13.0新增]
  operators?: Array<string>; // 分隔符数组[3.14.0新增]
  mergeTag?: boolean; // type=checkbox时生效，设置是否合并成一个标签[3.16.0新增]
  maxTimeLength?: number; // type=dateRange/datetimeRange时生效，设置用户只能选择某个时间跨度，只接受毫秒数[3.16.0新增]
  slotName?: string; // type=custom时生效，用于指定二级面板的插槽名[3.16.0新增]，对应的编辑态自定义面板插槽名为item.slotName + '-edit'[注：编辑态只有3.19.0版本及以上才有]
  groupKey?: string; // 自定义分组名，默认为：属性类型 [3.16.0新增]
  [propName: string]: any;
}

type ISearchBoxTagType = 'radio' | 'noValue' | 'checkbox' | 'map' | 'numRange' | 'dateRange' | 'dateTimeRange' | 'custom'; // custom类型为3.16.0新增
`
    },
    {
      name: 'ISearchBoxTag',
      type: 'interface',
      code: `
interface ISearchBoxTag {
  field: string;
  label: string;
  value: string;
  type: ISearchBoxTagType;
  start?: number | string;
  end?: number | string;
  operator?: string; // 分隔符[3.14.0新增]
  [propName: string]: any;
}

type ISearchBoxTagType = 'radio' | 'noValue' | 'checkbox' | 'map' | 'numRange' | 'dateRange' | 'dateTimeRange';
`
    },
    {
      name: 'ISearchBoxMatchItem',
      type: 'interface',
      code: `
interface ISearchBoxMatchItem {
  label: string;
  field: string;
  value: string;
  type?: string;
}
`
    }
  ]
}
