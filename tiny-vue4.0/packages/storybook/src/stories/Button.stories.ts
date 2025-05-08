import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/vue3'

import { Button } from '@opentiny/vue-pc'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: '基本组件/Button',
  component: Button,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  render: (args) => ({
    components: { TinyButton: Button },
    setup() {
      return { args }
    },
    template: '<tiny-button v-bind="args">标准按钮</tiny-button>',
  }),
  argTypes: {
    size: { control: 'select', options: ['lg', 'md', 'sm', 'xs'] },
    theme: { control: 'select', options: ['light', 'dark', 'success', 'info'] },
    plain: { control: 'boolean' },
  },
  args: {
    size: 'md',
    theme: 'dark',
    plain: false,
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    onClick: fn(),
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Large: Story = {
  args: {
    size: 'lg',
  },
}

export const Normal: Story = {
  args: {
    size: 'md',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
  },
}

export const Plain: Story = {
  args: {
    size: 'md',
    plain: true,
  },
}

export const Info: Story = {
  args: {
    size: 'md',
    plain: true,
  },
}
