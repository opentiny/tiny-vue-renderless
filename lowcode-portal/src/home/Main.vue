<template>
  <div class="home">
    <page-layout>
      <template #header>
        <home-top></home-top>
      </template>
    </page-layout>
    <home-advantages></home-advantages>
    <home-multi-scenario></home-multi-scenario>
    <home-ecology></home-ecology>
    <home-core-scenarios></home-core-scenarios>
    <home-use-us></home-use-us>
    <home-about-us></home-about-us>
    <div class="copyright">
      <span class="text"
        >Copyright © Huawei Technologies Co., Ltd. 华为云Web能力中心 {{ year }}. All rights reserved.</span
      >
    </div>
  </div>
</template>

<script>
import PageLayout from '../common/components/PageLayout'
import HomeTop from './HomeTop.vue'
import HomeAdvantages from './HomeAdvantages.vue'
import HomeUseUs from './HomeUseUs.vue'
import HomeAboutUs from './HomeAboutUs.vue'
import HomeEcology from './HomeEcology.vue'
import HomeMultiScenario from './HomeMultiScenario.vue'
import HomeCoreScenarios from './HomeCoreScenarios.vue'

export default {
  components: {
    PageLayout,
    HomeAboutUs,
    HomeTop,
    HomeAdvantages,
    HomeEcology,
    HomeMultiScenario,
    HomeCoreScenarios,
    HomeUseUs
  },
  setup() {
    const year = new Date().getFullYear()

    return {
      year
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  --max-width: 1620px;
  --padding-big: 60px;
  --padding-small: 40px;
  height: 100%;
  overflow: auto;
  .home-content {
    margin: 30px;
    min-width: 980px;
  }

  :deep(.page-layout) {
    min-height: unset;
  }
  .copyright {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    background: #f5f5f5;
    border-top: 1px solid#dbdbdb;
    .text {
      font-size: 14px;
      width: 1360px;
      display: inline-block;
      text-align: center;
      color: #191919;
    }
  }
  :deep(.page-layout) {
    .page-layout-container {
      height: auto;
    }
  }
}

@media (min-width: 2001px) {
  .home {
    :deep(.home-top) {
      .home-top-banner {
        max-width: var(--max-width);
      }
    }
    :deep(.home-advantages) {
      max-width: var(--max-width);
    }
    :deep(.home-ecology) {
      max-width: var(--max-width);
    }
    :deep(.home-multi-scenario) {
      .home-multi-scenario-main {
        max-width: var(--max-width);
        .home-multi-scenario-banner-right {
          margin-top: 280px;
        }
      }
    }
    :deep(.home-core-scenarios) {
      .home-core-scenarios-main {
        max-width: var(--max-width);
      }
    }
    :deep(.home-usage) {
      max-width: var(--max-width);
    }
    :deep(.home-about-us) {
      .list {
        max-width: var(--max-width);
      }
    }
  }
}

@media screen and (max-width: 2000px) and (min-width: 1024px) {
  .home {
    :deep(.home-top) {
      box-sizing: border-box;
      padding: 0px 60px;
      .home-top-banner {
        max-width: var(--max-width);
        height: 700px;
      }
    }
    :deep(.home-advantages) {
      box-sizing: border-box;
      padding-left: var(--padding-big);
      padding-right: var(--padding-big);
      .item-title {
        font-size: 22px;
      }
    }
    :deep(.home-multi-scenario) {
      box-sizing: border-box;
      padding-left: var(--padding-big);
      padding-right: var(--padding-big);
    }
    :deep(.home-ecology) {
      .tab-item img {
        height: 390px;
      }
    }
    :deep(.home-core-scenarios) {
      box-sizing: border-box;
      padding: 0px var(--padding-small);
    }
    :deep(.home-about-us) {
      box-sizing: border-box;
      padding-left: var(--padding-big);
      padding-right: var(--padding-big);
    }
  }
}
@media screen and (max-width: 1023px) {
  .home {
    .copyright {
      padding: 17px 34px;
    }
  }
}
</style>
