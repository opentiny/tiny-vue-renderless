const dealModules = (target) =>
  Object.keys(target).reduce((memo, item) => {
    memo[item.replace(/^\/tinydoc-design\//, 'tinydoc-design/')] = target[item]
    return memo
  }, {})

export const guideMdModules = import.meta.glob('/tinydoc-design/guide/**/*.md')

export const demoModules = dealModules({
  ...guideMdModules
})
