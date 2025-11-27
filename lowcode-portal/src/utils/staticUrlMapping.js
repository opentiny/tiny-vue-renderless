export const StaticUrlMapping = {
  defaultEnv: {
    resourceDesign: 'https://opentiny.design',
    resourceUI: 'https://opentiny.design/tiny-ng/overview',
    resourceVue: 'https://opentiny.design/tiny-vue'
  },
  'alpha-open': {
    resourceDesign: 'https://opentiny.design',
    resourceUI: 'https://opentiny.design/tiny-ng/overview',
    resourceVue: 'https://opentiny.design/tiny-vue'
  }
}

export function getStaticUrl(urlKey) {
  const env = import.meta.env.MODE

  return StaticUrlMapping[env]?.[urlKey] || StaticUrlMapping.defaultEnv?.[urlKey]
}
