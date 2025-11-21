<template>
  <div class="tools-root">
    <div class="tools-header">开发工具</div>
    <ul class="doc-list">
      <li v-for="item in links" :key="item.href">
        <a :href="item.href" target="_blank" rel="noopener noreferrer">
          <h2>{{ item.title }}</h2>
          <p>{{ item.des }}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { links } from './links';
</script>

<style lang="less" scoped>
.tools-root {
  padding: 48px 85px 20px 99px;
  background: #f9fafb;
  .tools-header {
    font-size: 40px;
    font-family:
      PingFang SC,
      PingFang SC-Semibold;
    font-weight: Semibold;
    text-align: justify;
    color: #191919;
    line-height: 60px;
  }
  ul,
  li {
    list-style: none;
  }
  .doc-list {
    margin-top: 47px;
    display: flex;
    flex-wrap: wrap;
    li {
      display: inline-block;
      vertical-align: top;
      width: calc(25% - 16px);
      margin: 0 16px 16px 0;
      background: #fff;
      border-radius: 8px;
      transition: all 0.3s linear;
      padding: 24px;
      a {
        display: block;
        height: 100%;
        text-decoration: none;
        h2 {
          font-size: 18px;
          font-family:
            Lantinghei SC,
            Lantinghei SC-Semibold;
          font-weight: 600;
          text-align: left;
          color: #101010;
          line-height: 24px;
        }
        p {
          margin-top: 8px;
          font-size: 14px;
          font-family:
            PingFang SC,
            PingFang SC-Regular;
          font-weight: Regular;
          color: #595959;
          line-height: 18px;
        }
      }
    }
    @media (max-width: 1279px) {
      li {
        width: calc(33% - 16px);
      }
    }
    @media (max-width: 767px) {
      li {
        width: calc(50% - 16px);
      }
    }
  }
}
</style>
