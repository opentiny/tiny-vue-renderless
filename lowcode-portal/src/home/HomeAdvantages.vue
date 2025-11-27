<template>
  <div class="home-advantages">
    <p class="title">{{ state.title }}</p>
    <ul class="list">
      <li v-for="(item, index) in state.list" :key="index" class="list-item" :style="{ 'box-shadow': item.boxShadow }">
        <div class="list-box" :style="{ 'background-image': `url(${item.bgUrl})` }">
          <img :src="item.iconUrl" />
          <div class="item-content">
            <span class="item-title">{{ item.title }}</span>
            <span v-for="text in item.des" :key="text" class="item-des">{{ text }}</span>
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
      list: [
        {
          title: 'AI智能开发',
          des: ['支持自然语言与图片生成应用，集成MCP能力，', 'AI对话调用TinyEngine内置工具'],
          iconUrl: `${import.meta.env.BASE_URL}img/home/ad_icon1.svg`,
          bgUrl: `${import.meta.env.BASE_URL}img/home/ad_bg1.svg`,
          boxShadow: '0 4px 30px 0 #EEF0EC'
        },
        {
          title: '定制低码平台',
          des: ['提供开箱即用的在线构建能力，并支持灵活进行', '二次开发与系统集成'],
          iconUrl: `${import.meta.env.BASE_URL}img/home/ad_icon2.svg`,
          bgUrl: `${import.meta.env.BASE_URL}img/home/ad_bg2.svg`,
          boxShadow: '0 4px 30px 0 #EFECF1'
        },
        {
          title: '高低代码混合开发',
          des: ['提供高低代码双模开发能力，支持根据场景自由', '选用与混合部署'],
          iconUrl: `${import.meta.env.BASE_URL}img/home/ad_icon3.svg`,
          bgUrl: `${import.meta.env.BASE_URL}img/home/ad_bg3.svg`,
          boxShadow: '0 4px 30px 0 #E9ECEE'
        },
        {
          title: '生成源码部署',
          des: ['生成完全独立的可部署源码，保障用户的技术', '自主权与灵活度'],
          iconUrl: `${import.meta.env.BASE_URL}img/home/ad_icon4.svg`,
          bgUrl: `${import.meta.env.BASE_URL}img/home/ad_bg4.svg`,
          boxShadow: '0 4px 30px 0 #EDF2EE'
        },
        {
          title: '开放协议接口',
          des: ['提供开放的协议接口，支持第三方组件的无缝接', '入与扩展插件的灵活定制'],
          iconUrl: `${import.meta.env.BASE_URL}img/home/ad_icon5.svg`,
          bgUrl: `${import.meta.env.BASE_URL}img/home/ad_bg5.svg`,
          boxShadow: '0 4px 30px 0 #F0EFEE'
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
  max-width: 1360px;
  box-sizing: border-box;
  padding-top: 150px;
  margin: 0 auto;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;
  .title {
    text-align: center;
    margin-top: 0;
    margin-bottom: 66px;
    font-size: 40px;
    color: #191919;
    font-weight: 600;
    line-height: 78px;
  }
  .list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .list-item {
    box-sizing: border-box;
    width: 446px;
    height: 262px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    margin-right: 48px;
    margin-bottom: 48px;
    padding: 2px;
    transition: transform 0.3s ease;
    .list-box {
      box-sizing: border-box;
      width: 444px;
      height: 258px;
      padding: 46px 48px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      border-radius: 20px;
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
    transform: translateY(-20px);
  }
}
</style>
