const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2));
const [arg] = argv._;

// tiny3 和 ui-ng 的 npm 包中静态资源文件有差异，先进行清除
const baseDir = process.cwd();
const toRemovefiles = [path.resolve(baseDir, './public/overviewimage'), path.resolve(baseDir, './public/assets'), path.resolve(baseDir, './public/@demos')];
const copyCases = (orgFilePath, copyFilePath) => {
  fs.readdir(orgFilePath, { withFileTypes: true }, (err, files) => {
    for (let file of files) {
      if (file.name === 'webdoc') return;
      if (!file.isDirectory()) {
        const orgFile = path.resolve(orgFilePath, file.name);
        const copyFile = path.resolve(copyFilePath, file.name);
        fs.copyFileSync(orgFile, copyFile);
        replaceImportPath(copyFile);
      } else {
        const orgDirPath = path.resolve(orgFilePath, file.name);

        copyCases(orgDirPath, copyFilePath);
      }
    }
  });
};
const replaceImportPath = async filePath => {
  const reg = new RegExp("'../../", 'g');
  const reg2 = new RegExp("'../", 'g');
  fs.readFile(filePath, (err, file) => {
    if (err) return;
    let str = file.toString();
    if (str.indexOf('../') > -1) {
      const newStr = str.replace(reg, `'./`).replace(reg2, `'./`);
      fs.writeFile(filePath, newStr, err => {
        if (err) console.log(err);
      });
    }
  });
};
toRemovefiles.forEach(file => {
  if (fs.pathExistsSync(file)) {
    fs.removeSync(file);
  }
});

const copyOverviewimage = [
  {
    // 总览页组件缩略图
    source: 'node_modules/@opentiny/ng-tinydoc/overviewimage',
    target: './public/overviewimage',
  },
];

const copyfiles = {
  innerdocs: [
    {
      // 组件库本身依赖的静态资源
      source: 'node_modules/@opentiny/tinydoc-ng-tiny/scripts/assets',
      target: './public/assets',
    },
    {
      // 组件示例源码、组件描述markdown和组件示例配置
      source: 'node_modules/@opentiny/tinydoc-ng-tiny',
      target: './public/@demos',
    }
  ],
  opendocs: [
    {
      // 组件库本身依赖的静态资源
      source: 'node_modules/@opentiny/ng-tinydoc/scripts/assets',
      target: './public/assets',
    },
    {
      // 组件示例源码、组件描述markdown和组件示例配置
      source: 'node_modules/@opentiny/ng-tinydoc',
      target: './public/@demos',
    },
  ],
  tinycloud: [
    {
      // 组件库本身依赖的静态资源
      source: 'node_modules/@opentiny/tinydoc-ng-tinycloud/scripts/assets',
      target: './public/assets',
    },
    {
      // 组件示例源码、组件描述markdown和组件示例配置
      source: 'node_modules/@opentiny/tinydoc-ng-tinycloud',
      target: './public/@demos',
    },
  ],
};

// 根据传入的参数，同步拷贝相应的文件
[...copyfiles[arg], ...copyOverviewimage]?.forEach(path => {
  try {
    fs.copySync(path.source, path.target);
    console.log(chalk.green(path.source + ' 拷贝完成！'));
  } catch (err) {
    console.log(chalk.red(err));
  }
});

if (arg === 'tinycloud') {
  const caseSource = 'node_modules/@opentiny/tinydoc-ng-tinycloud/app/delete-best-cases';
  const caseTarget = './public/@demos/app/delete-best-cases';
  copyCases(caseSource, caseTarget);
}
