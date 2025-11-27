<template>
  <div class="home-usage">
    <p class="title">{{ state.title }}</p>
    <ul class="list">
      <li v-for="(item, index) in state.list" :key="index" class="list-item">
        <img :src="item.icon" />
        <div class="item-text">{{ item.text }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({
      title: '他们都在用TinyEngine',
      list: [
        {
          text: '资源编排服务',
          icon: `${import.meta.env.BASE_URL}img/home/last_1.svg`
        },
        {
          text: '轻量应用服务',
          icon: `${import.meta.env.BASE_URL}img/home/last_2.svg`
        },
        {
          text: '产品数据管理',
          icon: `${import.meta.env.BASE_URL}img/home/last_3.svg`
        },
        {
          text: '跨境电商',
          icon: `${import.meta.env.BASE_URL}img/home/last_4.svg`
        },
        {
          text: 'Basic Workflow',
          icon: `${import.meta.env.BASE_URL}img/home/last_5.svg`
        },
        {
          text: '电子流审批平台',
          icon: `${import.meta.env.BASE_URL}img/home/last_6.svg`
        },
        {
          text: '终端消息平台',
          icon: `${import.meta.env.BASE_URL}img/home/last_7.svg`
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
.home-usage {
  width: 100%;
  box-sizing: border-box;
  padding: 100px 0;
  margin: 0 auto;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;
  .title {
    text-align: center;
    margin-bottom: 80px;
    font-size: 40px;
    color: #191919;
    font-weight: 600;
    line-height: 54px;
  }
  .list {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .list-item {
    box-sizing: border-box;
    display: flex;
    height: 68px;
    width: 300px;
    margin-right: 40px;
    margin-bottom: 30px;
    box-shadow: 0px 0 20px 0px rgba(0, 0, 0, 0.08);
    border-radius: 160px;
    padding: 14px 40px;
    img {
      width: 40px;
      height: 40px;
      margin-right: 12px;
    }
    .item-text {
      line-height: 40px;
      font-size: 20px;
      color: #191919;
    }
  }
  ul li:last-child {
    margin-right: 0;
  }
}
@media screen and (max-width: 1023px) {
  .home-usage {
    height: auto;
    padding: 32px 24px;
    .title {
      margin-bottom: 32px;
      font-size: 20px;
      line-height: 26px;
    }
    .list {
      grid-template-columns: repeat(1, 1fr);
    }
    .list-item {
      flex-direction: row;
      margin-top: 30px;
      width: 250px;
      height: auto;
      margin: 20px auto 0 auto;
      .item-text {
        font-size: 14px;
      }
    }
  }
}
</style>
