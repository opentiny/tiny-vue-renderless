<template>
  <div class="menu-router">
    <tiny-tree-menu
      :data="treeData"
      :show-filter="false"
      node-key="path"
      ref="tree"
      :default-expanded-keys="[expandeArr]"
      @current-change="currentChange"
    >
      <template #default="slotScope">
        <template v-for="(item, index) in iconData" :key="index">
          <span v-if="slotScope.label === item.value" class="tree-node-content">
            <component :is="item.icon"></component> {{ item.value }}
          </span>
        </template>
      </template>
    </tiny-tree-menu>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';
  import { RouteRecordNormalized } from 'vue-router';
  import { TreeMenu as tinyTreeMenu } from '@opentiny/vue';
  import router from '@src/router';

  // icon图标
  import vueProMenuIcon from '@src/components/menu/configs/vue-pro';
  import ngProMenuIcon from '@src/components/menu/configs/ng-pro';
  import tinyCliMenuIcon from '@src/components/menu/configs/tiny-cli';
  import themeMenuIcon from '@src/components/menu/configs/theme';

  const tree = ref();
  const expandeArr = ref();
  const visible = ref(false);
  const vueProTitle = 'TinyPro of Vue - 开箱即用的中台前端/设计解决方案';
  const ngProTitle = 'TinyPro of Ng | 面向华为云控制台业务解决方案';
  const tinyCliTitle = 'TinyCLI | 前端工程化最佳实践';
  const themeTitle = 'TinyTheme - 主题配置系统';

  // 获取当前路径项目标识
  let pathType = window.location.pathname.split('/')[1];

  /**
   * 监听路由变化高亮当前菜单
   */
  watch(
    () => router.currentRoute.value.path,
    (newValue: string) => {
      let data = newValue.split('/');
      const menuChildren = ['advanced', 'guide', 'toolkits', 'plugin', 'dev'];
      let pathName = window.location.pathname.split('/')[3];
      let isMenuChildren = menuChildren.some((e) => e === pathName);
      let result = isMenuChildren
        ? data[data.length - 1]
        : `/${pathType}/docs/${data[data.length - 1]}`;
      const characters = [...result];
      expandeArr.value = characters.join('');
      setTimeout(() => {
        tree.value.setCurrentNode({ path: result });
      }, 0);
    },
    { immediate: true }
  );

  // 获取路由数据
  const appRoute = computed(() => {
    return router
      .getRoutes()
      .find((el) => el.name === 'root') as RouteRecordNormalized;
  });
  const copyRouter = JSON.parse(JSON.stringify(appRoute.value.children));

  let copyRouterData: any[] = [];
  let iconData: any[] = [];

  // 菜单数据按项目渲染
  copyRouterData = copyRouter.filter(
    (e: { meta: { type: string } }) => e.meta.type === pathType
  );

  // icon数据按项目渲染
  switch (pathType) {
    case 'vue-pro':
      iconData = vueProMenuIcon;
      document.title = vueProTitle;
      break;
    case 'ng-pro':
      iconData = ngProMenuIcon;
      document.title = ngProTitle;
      break;
    case 'tiny-cli':
      iconData = tinyCliMenuIcon;
      document.title = tinyCliTitle;
      break;
    case 'theme':
      iconData = themeMenuIcon;
      document.title = themeTitle;
      break;
    default:
      break;
  }

  copyRouterData.sort((a: any, b: any) => {
    return (a.meta.order || 0) - (b.meta.order || 0);
  });

  let treeData = ref(copyRouterData);

  // 点击二级菜单的父级，不进行路由跳转
  const currentChange = (data: any) => {
    const filter = [
      'vue-Advanced',
      'ng-advanced',
      'cli-guide',
      'cli-toolkits',
      'cli-plugin',
      'cli-dev',
    ];
    if (filter.indexOf(data.id) === -1) {
      router.push({ name: data.id });
    }
  };
</script>

<style lang="less" scoped>
  :deep(.tiny-tree-menu) {
    display: initial;
  }

  :deep(.tiny-tree-menu::before) {
    border-right: none;
  }

  .tree-node-content {
    display: flex;
    gap: 10px;
    align-items: center;
    height: 20px;
  }

  :deep(.tiny-tree-menu .tiny-tree > div) {
    margin: 3px 0;
  }

  :deep(.tiny-tree-menu .tiny-tree .tree-node-name) {
    display: block;
    height: 20px;
    border-left: 2px solid transparent;
  }

  :deep(
      .tiny-tree-menu
        .tiny-tree
        .tiny-tree-node
        .tiny-tree-node__content
        .tree-node-icon
    ) {
    margin-right: 28px;
  }

  :deep(
      .tiny-tree-menu
        .tiny-tree
        .tiny-tree-node
        > .tiny-tree-node__content
        .tree-node-name
        .tiny-svg
    ) {
    width: 1.3em;
    height: 1.3em;
  }

  :deep(
      .tiny-tree-menu
        .tiny-tree
        .tiny-tree-node.is-current
        > .tiny-tree-node__content::before
    ) {
    z-index: 1;
  }
</style>
