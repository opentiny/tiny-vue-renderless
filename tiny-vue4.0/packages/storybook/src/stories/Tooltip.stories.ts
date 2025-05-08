import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'

import { Tooltip } from '@opentiny/vue-pc'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: '提示组件/Tooltip',
  component: Tooltip,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [() => ({ template: '<div style="margin: 3em;"><story/></div>' })],
  render: (args) => ({
    components: { TinyTooltip: Tooltip },
    setup() {
      return { args }
    },
    template: '<tiny-tooltip v-bind="args">提示的目标提示的目标提示的目标</tiny-tooltip>',
  }),
  argTypes: {
    theme: {
      control: 'select',
      options: [
        'light',
        'dark',
        'success',
        'info',
        'warn',
        'error',
        'successless',
        'infoless',
        'warnless',
        'errorless',
      ],
    },
    title: { control: 'text' },
    content: { control: 'text' },
    showConfirm: { control: 'boolean' },
    // TODO 不知道函数属性，怎么表达
    // onOk: { control: 'object' },
    // onCancel: { control: 'object' },
    placement: {
      control: 'select',
      options: [
        'top-start',
        'top',
        'top-end',
        'right-start',
        'right',
        'right-end',
        'bottom-start',
        'bottom',
        'bottom-end',
        'left-start',
        'left',
        'left-end',
      ],
    },
    closeDelay: { control: 'number' },
    openDelay: { control: 'number' },
    trigger: { control: 'radio', options: ['hover', 'click', 'manual'] },
  },
  args: {
    content: '我是提示内容',
    title: '标题',
    onOk: () => true,
    onCancel: () => Promise.resolve(false),
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Basic: Story = {
  render: (args) => ({
    components: { TinyTooltip: Tooltip },
    setup() {
      return { args }
    },
    template: '<tiny-tooltip v-bind="args"  style="margin: 50px">提示的目标</tiny-tooltip>',
  }),
  args: {
    placement: 'bottom',
  },
}

export const Theme: Story = {
  render: (args) => ({
    components: { TinyTooltip: Tooltip },
    setup() {
      const themeList = [
        'light',
        'dark',
        'success',
        'info',
        'warn',
        'error',
        'successless',
        'infoless',
        'warnless',
        'errorless',
      ]
      return { args, themeList }
    },
    template:
      '<tiny-tooltip v-for="theme in themeList" :key="theme" v-bind="args" :theme="theme" style="margin: 50px">提示的目标</tiny-tooltip>',
  }),
  args: {
    trigger: 'manual',
    show: true,
    placement: 'bottom',
  },
}

export const Placement: Story = {
  render: (args) => ({
    components: { TinyTooltip: Tooltip },
    setup() {
      const placementList = [
        'top-start',
        'top',
        'top-end',
        'right-start',
        'right',
        'right-end',
        'bottom-start',
        'bottom',
        'bottom-end',
        'left-start',
        'left',
        'left-end',
      ]
      return { args, placementList }
    },
    template:
      '<tiny-tooltip v-for="(pm,idx) in placementList" :key="pm" v-bind="args" :placement="pm" trigger="manual" show style="margin: 50px; width:150px; border:1px solid #c1c1c1;">{{pm}}</tiny-tooltip>',
  }),
  args: {
    placement: 'bottom',
  },
}

export const Trigger: Story = {
  render: (args) => ({
    components: { TinyTooltip: Tooltip },
    setup() {
      const triggerList = ['hover', 'click', 'manual']
      const triggerContent = ['hover 展示', 'click  展示', 'manual 展示']
      return { args, triggerList, triggerContent }
    },
    template:
      '<tiny-tooltip v-for="(tg,idx) in triggerList" :key="tg" v-bind="args" :trigger="tg" style="margin: 50px">{{triggerContent[idx]}}</tiny-tooltip>',
  }),
  args: {
    placement: 'bottom',
  },
}

export const Event: Story = {
  args: {
    onPopperShow: fn(),
    onPopperHide: fn(),
  },
}
