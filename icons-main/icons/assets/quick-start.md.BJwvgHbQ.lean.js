import { p as a, c as l, o as e, ah as p } from './chunks/framework.Dwe2Uyii.js'
import './chunks/theme.-dLHjZVU.js'
a()
const n = typeof window < 'u',
  t = a(n ? location.hash : '')
n &&
  window.addEventListener('hashchange', () => {
    t.value = location.hash
  })
if (typeof window < 'u') {
  var i = { get passive() {} }
  window.addEventListener('testPassive', null, i), window.removeEventListener('testPassive', null, i)
}
const r = JSON.parse('{"title":"快速上手","description":"","frontmatter":{},"headers":[],"relativePath":"quick-start.md","filePath":"quick-start.md"}'),
  h = { name: 'quick-start.md' },
  E = Object.assign(h, {
    setup(k) {
      return (c, s) => (e(), l('div', null, s[0] || (s[0] = [p('', 16)])))
    }
  })
export { r as __pageData, E as default }
