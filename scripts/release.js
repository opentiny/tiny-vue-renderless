const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const source = 'dist'

fs.copyFileSync('package.json', source + '/package.json')

execSync('npm pack', { cwd: source })

fs.readdirSync(source).forEach((item) => {
  if (item.endsWith('.tgz')) {
    const tgzPath = path.join(source, item)

    fs.copyFileSync(tgzPath, path.join(item))
    fs.unlinkSync(tgzPath)
  }
})
