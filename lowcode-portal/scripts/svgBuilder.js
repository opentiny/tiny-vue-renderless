import { readFileSync, readdirSync } from 'fs'

const svgTitle = /<svg([^>+].*?)>/
const clearHeightWidth = /(width|height)="([^>+].*?)"/g
const hasViewBox = /(viewBox="[^>+].*?")/g
const clearReturn = /(\r)|(\n)/g

const findSvgFile = (path, prefix) => {
  const svgRes = []
  const dirs = readdirSync(path, {
    withFileTypes: true
  })

  for (const dir of dirs) {
    if (dir.isDirectory()) {
      svgRes.push(...findSvgFile(path + dir.name + '/', prefix))
    } else {
      const svg = readFileSync(path + dir.name)
        .toString()
        .replace(clearReturn, '')
        .replace(svgTitle, ($1, $2) => {
          let width = 0
          let height = 0

          let content = $2.replace(clearHeightWidth, (s1, s2, s3) => {
            if (s2 === 'width') {
              width = s3
            } else if (s2 === 'height') {
              height = s3
            }

            return ''
          })

          if (!hasViewBox.test($2)) {
            content += `viewBox="0 0 ${width} ${height}"`
          }

          return `<symbol id="${prefix}-${dir.name.replace('.svg', '')}" ${content}>`
        })
        .replace('</svg>', '</symbol>')

      svgRes.push(svg)
    }
  }

  return svgRes
}

export default (path, prefix = 'icon') => {
  const res = findSvgFile(path + '/', prefix)

  return {
    name: 'svg-transform',
    transformIndexHtml(html) {
      return html.replace(
        '<body>',
        `
          <body>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">
              ${res.join('')}
            </svg>
        `
      )
    }
  }
}
