import md_emoji from 'markdown-it-emoji'
import md_prism from 'markdown-it-prism' // 高亮
import md_sup from 'markdown-it-sup' // 上标    ^  ^
import md_sub from 'markdown-it-sub' // 下标    ~  ~
import md_mark from 'markdown-it-mark' // 高亮文字    ==   ==
import md_anchor from 'markdown-it-anchor'
import md_container from 'markdown-it-container' // 提示块

export const MdExt = [md_emoji, md_sub, md_sup, md_mark]

const RE = /{([\d,-]+)}/
const highlightLines = (md) => {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, options, , self] = args
    const token = tokens[idx]

    if (!token.info || !RE.test(token.info)) {
      return fence(...args)
    }

    const lineNumbers = RE.exec(token.info)[1]
      .split(',')
      .map((v) => v.split('-').map((v) => parseInt(v, 10)))
    const langName = token.info.replace(RE, '').trim()

    const code = options.highlight ? options.highlight(token.content, langName) : token.content
    const codeSplitsArr = code.split('\n').map((split, index) => {
      const lineNumber = index + 1
      const inRange = lineNumbers.some(([start, end]) => {
        if (start && end) {
          return lineNumber >= start && lineNumber <= end
        }
        return lineNumber === start
      })
      if (inRange) {
        return {
          code: `<span class="highlighted-line">${split}</span>`,
          highlighted: true
        }
      }
      return {
        code: split
      }
    })
    let highlightCode = ''
    codeSplitsArr.forEach((split) => {
      if (split.highlighted) {
        highlightCode += split.code
      } else {
        highlightCode += `${split.code}\n`
      }
    })
    // If custom highlighter wraps code with starting <pre..., don't wrap code
    if (highlightCode.startsWith('<pre')) {
      return highlightCode
    }
    const tmpToken = {
      attrs: [['class', langName ? `language-${langName}` : '']]
    }
    const attrs = self.renderAttrs(tmpToken)
    return `<pre${attrs}><code${attrs}>${highlightCode.trim()}</code></pre>`
  }
}

// 自定义container
function createContainer(klass) {
  return [
    md_container,
    klass,
    {
      render(tokens, idx) {
        const token = tokens[idx]
        const info = token.info.trim().slice(klass.length).trim() || ''
        if (token.nesting === 1) {
          return `<div class="${klass} custom-block"><p class="custom-block-title">${info}</p>\n`
        } else {
          return `</div>\n`
        }
      }
    }
  ]
}

export function mdInstall(md) {
  md.use(md_prism, { plugins: ['line-highlight'] })
    .use(...createContainer('tip'))
    .use(...createContainer('info'))
    .use(...createContainer('warning'))
    .use(...createContainer('danger'))
    .use(md_anchor, {
      permalink: true,
      permalinkBefore: true,
      permalinkSymbol: '',
      slugify: (s) => encodeURIComponent(s)
    })
    .use(highlightLines)
}
