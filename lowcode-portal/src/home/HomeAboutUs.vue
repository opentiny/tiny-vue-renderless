<template>
  <div class="home-about-us">
    <ul class="list">
      <li v-for="item in state.list" :key="item.label" class="list-item">
        <div class="item-label"><svg-icon class="label-icon" :name="item.icon"></svg-icon>{{ item.label }}</div>
        <a
          v-for="content in item.children"
          :key="content.label || content.iconName"
          :href="content.link ? content.link : 'javascript:void(0)'"
          :class="['link', { 'svg-link': content.iconName }]"
          :target="content.link ? '_blank' : ''"
          @click="linkClick(content)"
        >
          <span v-if="content.label" class="link-text">{{ content.label }}</span>
          <svg-icon v-if="content.iconName" class="svg-icon" :name="content.iconName"></svg-icon>
        </a>
      </li>
    </ul>
    <tiny-tree-menu :data="state.list" class="list-mobile" @node-click="handleNodeClick">
      <template #default="slotScope">
        <div>
          <svg-icon v-if="slotScope.data.icon" class="label-icon" :name="slotScope.data.icon"></svg-icon>
          <a :class="slotScope.data.class">
            {{ slotScope.data.label }}
          </a>
        </div>
      </template>
    </tiny-tree-menu>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { TreeMenu } from '@opentiny/vue'
import { getStaticUrl } from '@/utils/staticUrlMapping'

export default {
  components: {
    TinyTreeMenu: TreeMenu
  },
  setup() {
    const router = useRouter()
    const state = reactive({
      list: [
        {
          label: '使用指南',
          children: [
            {
              label: '设计器帮助中心',
              routerName: 'index'
            },
            {
              label: '设计器开发协议规范',
              routerName: 'protocol'
            },
            {
              label: '更新日志',
              routerName: 'changelog'
            }
          ],
          icon: 'home-guide'
        },
        {
          label: '社区',
          children: [
            {
              label: '讨论区',
              link: 'https://github.com/opentiny/tiny-engine/issues'
            },
            {
              label: 'OpenTiny公众号',
              link: 'https://mp.weixin.qq.com/s/4dFmslwTKSvlyZG4wPsR9Q'
            }
          ],
          icon: 'home-community'
        },
        {
          label: '资源',
          children: [
            {
              label: 'OpenTiny-设计体系',
              link: getStaticUrl('resourceDesign')
            },
            {
              label: 'Tiny UI3.0',
              link: getStaticUrl('resourceUI')
            },
            {
              label: 'Tiny Vue',
              link: getStaticUrl('resourceVue')
            }
          ],
          icon: 'home-resource'
        },
        {
          label: '关于我们',
          children: [
            {
              label: 'github',
              iconName: 'git-hub',
              link: 'https://github.com/opentiny/tiny-engine'
            },
            {
              label: '掘金',
              iconName: 'nuggets',
              link: 'https://juejin.cn/user/3808325101432983'
            },
            {
              label: '知乎',
              iconName: 'zhihu',
              link: 'https://www.zhihu.com/people/opentiny/posts'
            }
          ],
          icon: 'home-user'
        }
      ]
    })

    const linkClick = (item) => {
      if (item.routerName) {
        item.routerParams
          ? router.push({ name: item.routerName, params: { type: item.routerParams } })
          : router.push({ name: item.routerName })
      }
    }

    const handleNodeClick = (data) => {
      if (data.routerName) {
        linkClick(data)
      }
      if (!data.routerName && !data.children) {
        let link = document.createElement('a')

        link.href = data.link
        link.style.display = 'none'
        link.target = '_blank'
        link.click()
      }
    }

    return {
      state,
      linkClick,
      handleNodeClick
    }
  }
}
</script>

<style lang="less" scoped>
.home-about-us {
  box-sizing: border-box;
  width: 100%;
  height: 276px;
  background: #f5f5f5;
  padding: 84px 80px 0 80px;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;
  .list {
    width: 100%;
    max-width: 1360px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .list-item {
      flex: 1;
      .item-label {
        font-size: 18px;
        color: #191919;
        margin-bottom: 30px;
        font-weight: 600;
        display: flex;
        .label-icon {
          font-size: 24px;
          margin-right: 4px;
        }
      }
      .link {
        display: block;
        width: 120px;
        font-size: 13px;
        color: #191919;
        margin-bottom: 20px;
      }
      .svg-link {
        display: inline-block;
        width: 50px;
        font-size: 48px;
        margin-right: 30px;
      }
      .svg-icon {
        stroke: #191919;
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .list-mobile {
    display: none;
  }
  .svg-link .link-text {
    display: none;
  }
}

@media screen and (max-width: 1023px) {
  .home-about-us {
    padding: 24px;
    height: auto;
    .list {
      display: none;
    }
  }
}
:deep(.tiny-tree-menu) {
  width: 100%;
  border-right: 0px;
  .tiny-input {
    display: none;
  }
  .tree-menus-link {
    .svg-icon {
      width: 20px;
      height: 20px;
      margin-right: 8px;
    }
  }
}
:deep(.tiny-tree-menu:before) {
  border-right: none;
}
</style>
