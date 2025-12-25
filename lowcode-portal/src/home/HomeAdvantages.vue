<template>
  <div class="home-advantages">
    <p class="title">{{ state.title }}</p>
    <div class="sub-title">{{ state.subTitle }}</div>
    <ul class="list">
      <li
        v-for="(item, index) in state.list"
        :key="index"
        class="list-item"
        :style="{ 'box-shadow': item.boxShadow, 'border-color': item.border }"
      >
        <div class="list-box" :style="{ 'background-image': `url(${item.bgUrl})` }">
          <img :src="item.iconUrl" />
          <div class="item-content">
            <span class="item-title">{{ item.title }}</span>
            <span class="item-des">{{ item.des }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({
      title: '倍受用户喜爱的原因',
      subTitle: '五大核心优势，打造极致开发体验',
      list: [
        {
          title: 'AI智能开发',
          des: '支持自然语言与图片生成，集成MCP能力，AI对话调用TinyEngine内置工具',
          iconUrl: `${import.meta.env.BASE_URL}img/home/ad_icon1.svg`,
          bgUrl: `${import.meta.env.BASE_URL}img/home/ad_bg1.svg`,
          boxShadow: '0 4px 30px 0 #EEF0EC',
          border: '#E9F1E0'
        },
        {
          title: '定制低码平台',
          des: '提供开箱即用的在线构建能力，并支持灵活进行二次开发与系统集成',
          iconUrl: `${import.meta.env.BASE_URL}img/home/ad_icon2.svg`,
          bgUrl: `${import.meta.env.BASE_URL}img/home/ad_bg2.svg`,
          boxShadow: '0 4px 30px 0 #EFECF1',
          border: '#F2EEF6'
        },
        {
          title: '高低代码混合开发',
          des: '提供高低代码双模开发能力，支持根据场景自由选用与混合部署',
          iconUrl: `${import.meta.env.BASE_URL}img/home/ad_icon3.svg`,
          bgUrl: `${import.meta.env.BASE_URL}img/home/ad_bg3.svg`,
          boxShadow: '0 4px 30px 0 #E9ECEE',
          border: '#ECF1F6'
        },
        {
          title: '生成源码部署',
          des: '生成完全独立的可部署源码，保障用户的技术自主权与灵活度',
          iconUrl: `${import.meta.env.BASE_URL}img/home/ad_icon4.svg`,
          bgUrl: `${import.meta.env.BASE_URL}img/home/ad_bg4.svg`,
          boxShadow: '0 4px 30px 0 #EDF2EE',
          border: '#E8F6EE'
        },
        {
          title: '开放协议接口',
          des: '提供开放的协议接口，支持第三方组件的无缝接入与扩展插件的灵活定制',
          iconUrl: `${import.meta.env.BASE_URL}img/home/ad_icon5.svg`,
          bgUrl: `${import.meta.env.BASE_URL}img/home/ad_bg5.svg`,
          boxShadow: '0 4px 30px 0 #F0EFEE',
          border: '#F6F1EB'
        }
      ]
    })

    return {
      state
    }
  }
}
</script>

<style lang="less" scoped>
.home-advantages {
  width: 100%;
  box-sizing: border-box;
  padding-top: 120px;
  margin: 0 auto;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;
  .title {
    text-align: center;
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 40px;
    color: #191919;
    font-weight: 600;
    line-height: 54px;
  }
  .sub-title {
    margin-bottom: 60px;
    color: #808080;
    font-size: 20px;
    line-height: 34px;
    text-align: center;
  }
  .list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 48px;
  }

  .list-item {
    box-sizing: border-box;
    width: 446px;
    height: 262px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    padding: 2px;
    transition: transform 0.3s ease;
    .list-box {
      box-sizing: border-box;
      width: 442px;
      height: 258px;
      padding: 46px 48px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      border-radius: 16px;
    }
    img {
      width: 64px;
      height: 64px;
      margin-bottom: 24px;
    }
    .item-content {
      display: flex;
      flex-direction: column;
      .item-title {
        font-size: 24px;
        color: #191919;
        font-weight: 600;
        line-height: 32px;
        margin-bottom: 8px;
      }
      .item-des {
        font-size: 16px;
        color: #808080;
        line-height: 20px;
      }
    }
  }
  ul li:last-child {
    margin-right: 0;
  }
  .list-item:hover {
    transform: translateY(-10px);
  }
}

@media screen and (max-width: 1023px) {
  .home-advantages {
    padding-top: 40px;
    .title {
      margin-bottom: 8px;
      font-size: 22px;
      line-height: 22px;
    }
    .sub-title {
      margin-bottom: 30px;
      font-size: 14px;
      line-height: 18px;
    }
    .list {
      gap: 20px;
    }
    .list-item {
      width: 100%;
      height: 106px;
      border-radius: 10px;
      padding: 1px;
      box-shadow: none !important;
      border: 1px solid #e9f1e0;
      .list-box {
        width: 100%;
        height: 104px;
        padding: 24px 22px;
        border-radius: 10px;
        display: flex;
        gap: 16px;
      }
      img {
        width: 40px;
        height: 40px;
        margin-bottom: 0;
      }
      .item-content {
        .item-title {
          font-size: 16px;
          color: #191919;
          font-weight: 600;
          line-height: 16px;
          margin-bottom: 7px;
        }
        .item-des {
          font-size: 12px;
          color: #808080;
          line-height: 14px;
        }
      }
    }
    .list-item:hover {
      transform: none;
    }
  }
}
</style>
