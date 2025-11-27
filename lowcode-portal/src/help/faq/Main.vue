<template>
  <page-layout>
    <div class="faq-container">
      <div class="faq-title">常见问题</div>
      <div class="faq-item">
        <p class="faq-item-question">Q1:&nbsp; 黄区用户无法访问 Tinyengine 的解决方案</p>
        <div class="faq-item-answer">
          A1:&nbsp;
          <span>1. 配置 host: 7.189.71.235 opentiny-assets.obs.cn-north-4.myhuaweicloud.com</span>
          <p class="faq-item-answer-item">
            2. 打开：<a :href="obsUrl" target="_blank">{{ obsUrl }}</a>
          </p>
          <p class="faq-item-answer-item">3. 在打开的界面应该会提示连接不是私密连接，点击详情，选择继续前往</p>
          <p class="faq-item-answer-item">
            4. 重新刷新打开 Tinyengine 地址：<a :href="tinyengineUrl" target="_blank">{{ tinyengineUrl }}</a>
          </p>
        </div>
      </div>
    </div>
  </page-layout>
</template>

<script>
import PageLayout from '../../common/components/PageLayout.vue'

export default {
  components: { PageLayout },
  setup() {
    const obsUrl =
      'https://opentiny-assets.obs.cn-north-4.myhuaweicloud.com/platform/portal-platform/0.0.47_1657443567527/assets/index.d5b2158c.js'
    const tinyengineUrl = 'https://opentiny.design/#/home'

    return {
      obsUrl,
      tinyengineUrl
    }
  }
}
</script>
<style lang="less" scoped>
.faq-container {
  padding: 20px 24px;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;

  color: #252b3a;
  .faq-title {
    font-size: 16px;
    font-weight: Bold;
    line-height: 24px;
    margin-bottom: 20px;
  }
  .faq-item {
    margin-bottom: 24px;
    font-weight: Bold;
  }
  .faq-item-answer {
    color: #575d6c;
    font-weight: normal;
    .faq-item-answer-item {
      margin-left: 30px;
      a {
        color: #526ecc;
      }
    }
  }
}
</style>
