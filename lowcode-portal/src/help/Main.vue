<template>
  <div class="setting-center">
    <div id="sideNavLayout" class="content">
      <router-view :key="$route.params.type"></router-view>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  setup() {
    const sideList = [
      {
        id: 10,
        title: '更新日志',
        label: '更新日志',
        name: 'changelog'
      },
      {
        id: 100,
        title: '可视化设计器简介',
        label: '可视化设计器简介',
        name: 'helpGuideline'
      },
      {
        id: 110,
        title: 'vscode插件使用',
        label: 'vscode插件使用',
        name: 'vscode'
      },
      {
        id: 200,
        title: '插件模块',
        label: '插件模块',
        children: [
          {
            id: 201,
            title: '物料面板',
            label: '物料面板',
            name: 'helpMaterialPanel'
          },
          {
            id: 202,
            title: '大纲树',
            label: '大纲树',
            name: 'helpDomTree'
          },
          {
            id: 203,
            title: '页面管理',
            label: '页面管理',
            name: 'helpPageMana'
          },
          {
            id: 204,
            title: '区块管理',
            label: '区块管理',
            name: 'helpBlockMana'
          },
          {
            id: 205,
            title: '数据源',
            label: '数据源',
            name: 'helpDataSource'
          },
          {
            id: 206,
            title: '资源管理',
            label: '资源管理',
            name: 'helpResourceMana'
          },
          {
            id: 207,
            title: '国际化',
            label: '国际化',
            name: 'helpI18n'
          },
          {
            id: 208,
            title: '页面JS',
            label: '页面JS',
            name: 'helpScript'
          },
          {
            id: 209,
            title: '状态管理',
            label: '状态管理',
            name: 'helpStateMana'
          },
          {
            id: 210,
            title: '页面Schema',
            label: '页面Schema',
            name: 'helpSchema'
          }
        ]
      },
      {
        id: 300,
        title: '工具栏模块',
        label: '工具栏模块',
        name: 'helpDesignCoreToolbar'
      },
      {
        id: 400,
        title: '设置面板',
        label: '设置面板',
        name: 'helpSetting'
      },
      {
        id: 500,
        title: '上传第三方物料',
        label: '上传第三方物料',
        name: 'helpUploadMaterial'
      },
      {
        id: 600,
        title: '构建物料资产包',
        label: '构建物料资产包',
        name: 'helpBuildMaterial'
      },
      {
        id: 700,
        title: '构建自定义设计器',
        label: '构建自定义设计器',
        name: 'helpBuildPlatform'
      },
      {
        id: 800,
        title: '权限管理',
        label: '权限管理',
        name: 'helpPermissionManagement'
      },
      {
        id: 900,
        title: '开发插件',
        label: '开发插件',
        name: 'helpPlugin'
      },
      {
        id: 1000,
        title: '开发工具栏',
        label: '开发工具栏',
        name: 'helpToolbar'
      },
      {
        id: 1100,
        title: '开发主题',
        label: '开发主题',
        name: 'helpTheme'
      },
      {
        id: 1200,
        title: '开发DSL',
        label: '开发DSL',
        name: 'helpDsl'
      }
    ]
    const router = useRouter()

    const navItemClick = (item) => {
      router.push({
        name: item.name
      })
    }

    return {
      sideList,
      navItemClick
    }
  }
}
</script>

<style lang="less" scoped>
.setting-center {
  display: flex;
  height: 100%;
  width: 100%;

  .nav {
    width: 260px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  :deep(.tiny-tree-menu) {
    margin-top: 10px;

    &::before {
      border-right: none;
    }

    .tiny-input {
      display: none;
    }
  }

  .content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;

    .container {
      background-color: #fff;
      margin: 20px;
      padding: 32px 20px 24px;
      width: calc(100% - 40px);
      height: calc(100% - 40px);
      box-sizing: border-box;

      &.dark {
        background-color: #f2f5fc;
        padding: 0;
      }

      overflow: auto;

      :deep(h2 + p) {
        position: relative;

        em {
          position: absolute;
          left: 194px;
          top: -40px;
          color: #9aa8b5;
        }
      }
    }
  }
}
</style>
