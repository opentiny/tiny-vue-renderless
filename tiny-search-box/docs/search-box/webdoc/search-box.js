export default {
  column: '2',
  owner: '',
  demos: [
    {
      demoId: 'basic-usage',
      name: {
        'zh-CN': '基础用法',
        'en-US': 'Basic Usage'
      },
      desc: {
        'zh-CN': '<p>通过<code>items</code>配置搜索数据项。</p>',
        'en-US': '<p>Configure search data items through <code>items</code>.</p>'
      },
      codeFiles: ['basic-usage.vue', 'data-source.ts']
    },
    {
      demoId: 'panel-max-height',
      name: {
        'zh-CN': '面板最大高度',
        'en-US': 'Maximum panel height'
      },
      desc: {
        'zh-CN': '<p>通过<code>panel-max-height</code>配置下拉面板最大高度。</p>',
        'en-US': '<p>Set <code>panel-max-height</code> to configure the maximum height of the drop-down list box.</p>'
      },
      codeFiles: ['panel-max-height.vue', 'data-source.ts']
    },
    {
      demoId: 'split-input-value',
      name: {
        'zh-CN': '切分输入值',
        'en-US': 'Segmentation Input Value'
      },
      desc: {
        'zh-CN': `<p>通过<code>split-input-value='|'</code>将输入值按字符<code>|</code>分成多个关键字，一次性输入生成多个标签，默认<code>,</code>分隔。</p>`,
        'en-US': `<p>Use <code>split-input-value='|'</code> to split the input value into multiple keywords by <code>|</code>. Multiple tags are generated for one input. By default, <code>,</code> is used to separate multiple keywords.</p>`
      },
      codeFiles: ['split-input-value.vue', 'data-source.ts']
    },
    {
      demoId: 'settings',
      name: {
        'zh-CN': '自定义默认搜索项',
        'en-US': 'Customizing Default Search Terms'
      },
      desc: {
        'zh-CN': '<p>通过 <code>default-field</code> 配置按照可用地区进行搜索。</p>',
        'en-US': '<p>Set <code>default-field</code> to search by available region.</p>'
      },
      codeFiles: ['settings.vue', 'data-source.ts']
    },
    {
      demoId: 'v-model',
      name: {
        'zh-CN': '默认包含筛选项',
        'en-US': 'Filter Items Are Included By Default'
      },
      desc: {
        'zh-CN': '<p>通过<code>model-value</code>配置默认选中标签项。</p>',
        'en-US': '<p>Use <code>model-value</code> to configure the default selected label item.</p>'
      },
      codeFiles: ['v-model.vue', 'data-source.ts']
    },
    {
      demoId: 'empty-placeholder',
      name: {
        'zh-CN': '没有筛选项时的占位文本',
        'en-US': 'Placeholder Text When There Are No Filters.'
      },
      desc: {
        'zh-CN': '<p>通过<code>empty-placeholder</code>配置筛选项为空时占位文本。</p>',
        'en-US':
          '<p>Use <code>empty-placeholder</code> to configure the placeholder text when the filter item is empty.</p>'
      },
      codeFiles: ['empty-placeholder.vue', 'data-source.ts']
    },
    {
      demoId: 'id-map-key',
      name: {
        'zh-CN': '指定筛选项的ID键取值',
        'en-US': 'Specifies the ID key value of a filtering item'
      },
      desc: {
        'zh-CN': `<p>通过<code>id-map-key</code>配置用来识别筛选项的<code>id</code>键取值来源，默认取自<code>items</code>的<code>id</code>键，
                一般用于接口返回的<code>items</code>数据字段不匹配，但是又需要其中一个键值来识别筛选项的情况。</p>`,
        'en-US': `<p>Use <code>id-map-key</code> to configure the value source of the <code>id</code> key used to identify screening items. The default value is the <code>id</code> key of <code>items</code>. 
                Generally, the <code>items</code> data field returned by the interface does not match, but a key value is required to identify the filtering item.</p>`
      },
      codeFiles: ['id-map-key.vue']
    },
    {
      demoId: 'potential-options',
      name: {
        'zh-CN': '潜在匹配项',
        'en-US': 'Potential Match'
      },
      desc: {
        'zh-CN': '<p>通过<code>potential-options</code>配置潜在匹配项。</p>',
        'en-US': '<p>Use <code>potential-options</code> to configure potential matches.</p>'
      },
      codeFiles: ['potential-match.vue', 'data-source.ts']
    },
    {
      demoId: 'group-key',
      name: {
        'zh-CN': '自定义属性分组',
        'en-US': 'User-defined attribute group'
      },
      desc: {
        'zh-CN': '<p>通过<code> item.groupKey </code> 自定义一级下拉框属性分组。</p>',
        'en-US': '<p></p>'
      },
      codeFiles: ['group-key.vue', 'group-key-data.ts']
    },
    {
      demoId: 'help',
      name: {
        'zh-CN': 'help 提示场景',
        'en-US': 'Help Prompt Scenario'
      },
      desc: {
        'zh-CN': '<p>通过<code>show-help</code>控制帮助图标显隐，使用<code>help</code>事件回调自定义弹窗提示内容。</p>',
        'en-US':
          '<p>Use <code>show-help</code> to show or hide the help icon, and use the <code>help</code> event callback to customize the pop-up window content.</p>'
      },
      codeFiles: ['help.vue', 'data-source.ts']
    },
    {
      demoId: 'editable',
      name: {
        'zh-CN': '可编辑',
        'en-US': 'Editable'
      },
      desc: {
        'zh-CN': '<p>标签支持可编辑功能，通过<code> editable </code> 打开编辑功能，（注：map 类型不支持编辑）。</p>',
        'en-US':
          '<p>Tags can be edited. To edit a tag, enter <code>editable </code>. Tags of the map type cannot be edited.</p>'
      },
      codeFiles: ['editable.vue', 'editable-data.ts']
    },
    {
      demoId: 'item-placeholder',
      name: {
        'zh-CN': '数据项占位文本',
        'en-US': 'Data Item Placeholder Text'
      },
      desc: {
        'zh-CN':
          '<p>通过 <code> item.placeholder </code>设置占位文本，<code> item.editAttrDisabled </code>设置编辑状态下此属性类型不可切换。</p>',
        'en-US':
          '<p>Set the placeholder text through <code> item.placeholder </code>, <code> item.editAttrDisabled </code> This attribute type cannot be switched in the editing state.</p>'
      },
      codeFiles: ['item-placeholder.vue', 'data-source.ts']
    },
    {
      demoId: 'auto-match',
      name: {
        'zh-CN': '自动匹配',
        'en-US': 'Automatic Matching'
      },
      desc: {
        'zh-CN':
          '<p>内置自动匹配功能，通过<code>:show-no-data-tip="false"</code>隐藏面板的无数据提示，通过<code>search</code>监听搜索事件，<code>change</code>监听搜索值变化事件。</p>',
        'en-US':
          '<p>Built-in auto-matching function. No Data Prompt for Hiding Panels via <code>:show-no-data-tip="false"</code>. Use <code>search</code> to listen to search events and <code>change</code> to listen to search value change events.</p>'
      },
      codeFiles: ['auto-match.vue', 'data-source.ts']
    },
    {
      demoId: 'merge-tag',
      name: {
        'zh-CN': '合并多选标签',
        'en-US': 'Merge Multiple Selection Labels'
      },
      desc: {
        'zh-CN': '<p>通过<code> mergeTag </code> 合并多选标签，（注：仅多选标签支持合并功能）。</p>',
        'en-US': '<p>Use <code> mergeTag </code> to merge multiple tags. (Note: Only multiple tags can be merged.)</p>'
      },
      codeFiles: ['merge-tag.vue']
    },
    {
      demoId: 'max-length',
      name: {
        'zh-CN': '输入长度限制',
        'en-US': 'Input Length Limit'
      },
      desc: {
        'zh-CN':
          '<p>通过<code> maxlength </code> 原生属性限制输入不超过8个字符长度，配合<code> exceed </code>监听输入超出限定长度的事件。</p>',
        'en-US':
          '<p>The <code> maxlength </code> native attribute is used to restrict the input to a maximum of eight characters. This attribute is used together with <code> exceed </code> to listen to the event that the input exceeds the specified length.</p>'
      },
      codeFiles: ['max-length.vue']
    },
    {
      demoId: 'max-time-length',
      name: {
        'zh-CN': '时间长度限制',
        'en-US': 'Time Length Limit'
      },
      desc: {
        'zh-CN':
          '<p>通过<code> maxTimeLength </code> 传入某段时间的值（毫秒数），来限制可选择的时间跨度，常用于防止请求时间跨度过大的情形。</p>',
        'en-US':
          '<p>Use <code> maxTimeLength </code> to pass in the value (in milliseconds) of a time period to limit the time span that can be selected. This is often used to prevent the request time span from being too large.</p>'
      },
      codeFiles: ['max-time-length.vue']
    },
    {
      demoId: 'custom-panel',
      name: {
        'zh-CN': '自定义二级下拉面板',
        'en-US': 'Customizing the Level-2 Drop-down Panel'
      },
      desc: {
        'zh-CN':
          "<p>通过<code> item.type = 'custom' </code> 开启自定义二级下拉面板功能，并在<code>item.slotName</code> 自定义对应的二级面板插槽名，对应的编辑态自定义面板插槽名为<code>`${item.slotName}-edit`</code>。</p>",
        'en-US':
          "<p>Use <code>item.type = 'custom'</code> to enable the function of customizing the level-2 drop-down panel and customize the slot name of the level-2 panel in <code>item.slotName</code>. The slot name of the corresponding customized panel in editing state is <code>`${item.slotName}-edit`</code>.</p>"
      },
      codeFiles: ['custom-panel.vue']
    },
    {
      demoId: 'events',
      name: {
        'zh-CN': '事件',
        'en-US': 'Events'
      },
      desc: {
        'zh-CN': '<p>通过<code> first-level-select </code> 监听第一层级选择事件。</p>',
        'en-US': '<p>Listen to the first-level selection event through <code> first-level-select </code>.</p>'
      },
      codeFiles: ['events.vue']
    }
  ]
}
