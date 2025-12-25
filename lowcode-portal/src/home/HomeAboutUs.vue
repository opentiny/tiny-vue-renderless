<template>
  <div class="home-about-us">
    <ul class="list">
      <div class="qrcode-container">
        <div class="qrcode">
          <img :src="state.qrcode" />
        </div>
        <div class="label">联系我们</div>
        <div class="text">扫码加入OpenTiny用户群</div>
      </div>
      <li v-for="item in state.list" :key="item.label" class="list-item">
        <div class="item-label">{{ item.label }}</div>
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
    <div class="mobile">
      <div class="qrcode-container">
        <div class="qrcode">
          <img :src="state.qrcode" />
        </div>
        <div class="label">联系我们</div>
        <div class="text">扫码加入OpenTiny用户群</div>
      </div>
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
          ]
        },
        {
          label: '开发者社区',
          children: [
            {
              label: '掘金-OpenTiny社区',
              link: 'https://juejin.cn/user/3808325101432983'
            },
            {
              label: '知乎-OpenTiny社区',
              link: 'https://www.zhihu.com/people/opentiny'
            },
            {
              label: 'B站-OpenTiny社区',
              link: 'https://space.bilibili.com/15284299'
            }
          ]
        },
        {
          label: '相关链接',
          children: [
            {
              label: 'GitHub',
              link: 'https://github.com/opentiny/tiny-engine'
            },
            {
              label: 'OpenTiny-设计体系',
              link: getStaticUrl('resourceDesign')
            },
            {
              label: 'Tiny Vue',
              link: getStaticUrl('resourceVue')
            }
          ]
        }
      ],
      qrcode: `${import.meta.env.BASE_URL}img/home/qrcode.png`
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
  background: #fafafa;
  padding: 44px 30px 30px;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;
  .list {
    width: 100%;
    // max-width: 1360px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .list-item {
      flex: 1;
      .item-label {
        font-size: 16px;
        line-height: 30px;
        color: #000;
        margin-bottom: 20px;
        font-weight: 600;
        display: flex;
        .label-icon {
          font-size: 24px;
          margin-right: 4px;
        }
      }
      .link {
        display: block;
        width: 130px;
        font-size: 14px;
        line-height: 22px;
        color: #666;
        margin-bottom: 16px;
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
    .qrcode-container {
      flex: 2;
      .qrcode {
        width: 152px;
        height: 152px;
        background: #eef4fd;
        img {
          width: 132px;
          height: 132px;
          margin: 10px;
        }
      }
      .label {
        font-size: 16px;
        font-weight: 600;
        line-height: 30px;
        color: #000;
        width: 152px;
        text-align: center;
        margin-top: 4px;
      }
      .text {
        font-size: 14px;
        line-height: 22px;
        color: #808080;
        width: 164px;
        text-align: center;
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .mobile {
    display: none;
  }
  .svg-link .link-text {
    display: none;
  }
}

@media screen and (max-width: 1023px) {
  .home-about-us {
    padding: 0;
    height: auto;
    .list {
      display: none;
    }
    .mobile {
      width: 100%;
      margin: 0 auto;
      padding: 30px 0;
      .qrcode-container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin-bottom: 30px;
        .qrcode {
          width: 150px;
          height: 150px;
          background: #eef4fd;
          img {
            width: 132px;
            height: 132px;
            margin: 8px;
          }
        }
        .label {
          font-size: 14px;
          font-weight: 600;
          line-height: 30px;
          color: #000;
          width: 152px;
          text-align: center;
          margin-top: 4px;
        }
        .text {
          font-size: 12px;
          line-height: 22px;
          color: #808080;
          width: 164px;
          text-align: center;
        }
      }
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
  .tiny-tree .tiny-tree-node .tiny-tree-node__content {
    background: #fafafa;
  }
  .tiny-tree .tiny-tree-node.is-current > .tiny-tree-node__content {
    background: #fafafa;
  }
  .tiny-tree-node.is-current:not(.show-checkbox) > .tiny-tree-node__content .tiny-tree-node__content-box,
  .tiny-tree-node.is-current:not(.show-checkbox) > .tiny-tree-node__content .tiny-tree-node__content-right {
    background: #fafafa;
  }
}
:deep(.tiny-tree-menu:before) {
  border-right: none;
}
</style>
