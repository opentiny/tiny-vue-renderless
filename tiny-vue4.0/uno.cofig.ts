import { defineConfig } from 'unocss'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  presets: [
    presetIcons({
      prefix: '',
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
      collections: {
        ci: () => import('@opentiny/icons/json/icons.json', { assert: { type: 'json' } }).then((i) => i.default),
      },
    }),
  ],
})
