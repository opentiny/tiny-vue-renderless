// 切割标题，目前发现 codeSandbox标题过长时会打不开
const substringTitle = title => {
  // 最大长度
  const maxLength = 40;
  return title.substring(0, maxLength);
};

/**
 * 获取pacakage.json文件，注意返回的是一个 object对象，而非字符串，codeSandbox api如此
 * @param {} config
 * @returns
 */
export const getPackageJson = (config = {}) => {
  const name = substringTitle(config.packageName || 'opentiny demo');
  const title = substringTitle(config.packageTitle || 'opentiny demo');
  return {
    name,
    title,
    private: true,
    scripts: {
      build: 'ng build',
      start: 'ng serve',
    },
    version: '1.0.0',
    dependencies: {
      '@angular/animations': '^15.1.2',
      '@angular/common': '^15.1.2',
      '@angular/compiler': '^15.1.2',
      '@angular/core': '^15.1.2',
      '@angular/forms': '^15.1.2',
      '@angular/platform-browser': '^15.1.2',
      '@angular/platform-browser-dynamic': '^15.1.2',
      '@angular/router': '^15.1.2',
      'ag-grid-angular': '^28.2.1',
      'ag-grid-community': '^28.2.1',
      'reflect-metadata': '^0.1.13',
      '@angular/cdk': '^15.1.2',
      '@angular/elements': '^15.1.2',
      rxjs: '^7.8.0',
      tslib: '^2.5.0',
      xlsx: '^0.18.5',
      'zone.js': '^0.12.0',
    },
    devDependencies: {
      '@angular-devkit/build-angular': '15.1.0-next.2',
      '@angular/cli': '15.1.0-next.2',
      '@angular/compiler-cli': '15.1.0-next.2',
      typescript: '^4.8.2',
    },
  };
};
const angularJsonFile = `{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "demo": {
      "root": "",
      "sourceRoot": "src",
      "projectType": "application",
      "prefix": "app",
      "schematics": {},
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/demo",
            "index": "src/index.html",
            "main": "src/main.ts",
            "assets": [],
            "scripts": [],
            "preserveSymlinks": true,
            "aot": false,
            "tsConfig": "tsconfig.json",
            "styles": [
              "src/styles.css"
            ]
          },
          "configurations": {
            "production": {
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true
            }
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "demo:build"
          },
          "configurations": {
            "production": {
              "browserTarget": "demo:build:production"
            }
          }
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "demo:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "src/test.ts",
            "tsConfig": "src/tsconfig.spec.json",
            "karmaConfig": "src/karma.conf.js",
            "styles": ["styles.css"],
            "scripts": [],
            "assets": ["src/favicon.ico", "src/assets"]
          }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": ["src/tsconfig.json"],
            "exclude": ["**/node_modules/**"]
          }
        }
      }
    }
  },
  "defaultProject": "demo"
}`;
// 获取angular.json文件
export const getAngularJson = () => {
  return angularJsonFile;
};
// 获取tsconfig.json文件
const getTsconfigJson = config => {
  return `{
  "compileOnSave": false,
  "compilerOptions": {
    "strict": ${!config.isStackblitz},
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "module": "esnext",
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2015",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "esnext",
      "dom"
    ],
    "strictNullChecks": false,
    "paths": ${JSON.stringify(config.aliasPaths || {}, null, 2)},
    "allowSyntheticDefaultImports": true,
    "strictPropertyInitialization": false,
    "emitDecoratorMetadata": true
  },
  "angularCompilerOptions": {
    "strictTemplates": false,
    "strictInjectionParameters": true,
    "enableIvy": false,
    "emitDecoratorMetadata": true
  },
  "files": [
    "src/**/*.ts",
    "@opentiny/**"
  ],
  "include": [
    "src/**/*.ts"
  ]
}`;
};

// 获取index.html文件
export const getIndexHtml = config => {
  const { CSS_FILES } = config;
  return `\<html>
  <head>
    <title>My App</title>
    <!-- demo styles -->
${CSS_FILES.map(
  link => `    <link
      rel="stylesheet"
      href="${link}"
    >`
).join('\n')}
  </head>
  
  <body>
    <app-root></app-root>
    <ng-component></ng-component>
  </body>
\</html>`;
};
// 获取sandbox 配置文件
export const getSandboxConfigFile = config => {
  return `{
  "infiniteLoopProtection": false
}`;
};

// 获取angualr项目的配置文件
export const getNgProjectDefaultFiles = (config = {}) => {
  return {
    'package.json': getPackageJson(config),
    'angular.json': getAngularJson(config),
    'tsconfig.json': getTsconfigJson(config),
    'sandbox.config.json': getSandboxConfigFile(config),
    'src/index.html': getIndexHtml(config),
    'src/styles.css': config.getCss?.(config) || '',
  };
};
