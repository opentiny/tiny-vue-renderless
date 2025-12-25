<template>
  <div class="home-usage">
    <p class="title">{{ state.title }}</p>
    <div class="sub-title">{{ state.subTitle }}</div>
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
      subTitle: '携手行业标杆，共创数字化转型成功实践',
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
          text: '终端消息平台',
          icon: `${import.meta.env.BASE_URL}img/home/last_7.svg`
        },
        {
          text: 'Basic Workflow',
          icon: `${import.meta.env.BASE_URL}img/home/last_5.svg`
        },
        {
          text: '电子流审批平台',
          icon: `${import.meta.env.BASE_URL}img/home/last_6.svg`
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
  padding: 120px 0;
  margin: 0 auto;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;
  .title {
    text-align: center;
    margin-bottom: 16px;
    margin-top: 0;
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
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 40px;
  }
  .list-item {
    box-sizing: border-box;
    display: flex;
    height: 68px;
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
    padding: 30px 0;
    .title {
      margin-bottom: 8px;
      font-size: 20px;
      line-height: 26px;
    }
    .sub-title {
      margin-bottom: 30px;
      font-size: 14px;
      line-height: 18px;
    }
    .list {
      grid-template-columns: repeat(1, 1fr);
      gap: 12px;
    }
    .list-item {
      flex-direction: row;
      height: auto;
      padding: 10px 20px;
      align-items: center;
      .item-text {
        font-size: 12px;
        line-height: 16px;
      }
      img {
        width: 22px;
        height: 22px;
        margin-right: 8px;
      }
    }
  }
}
</style>
