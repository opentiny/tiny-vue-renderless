<template>
  <div class="home-multi-scenario">
    <div class="home-multi-scenario-main">
      <div class="scroll-container">
        <div class="sticky-view">
          <div class="title">{{ state.title }}</div>
          <div class="sub-title">{{ state.subTitle }}</div>
          <div class="tabs">
            <template v-for="scene in state.scenes" :key="scene.id">
              <div :class="['tab', { active: scene.id === state.activeSceneId }]" @click="handleClick(scene.id)">
                {{ scene.tabTitle }}
              </div>
            </template>
          </div>
          <div class="scenes-wrapper">
            <div class="image-section">
              <div
                v-for="scene in state.scenes"
                :key="scene.id"
                :class="['image-container', { active: scene.id === state.activeSceneId }]"
              >
                <img :src="scene.image" :alt="scene.title" class="scene-image" />
              </div>
            </div>
            <div class="text-section">
              <div
                v-for="scene in state.scenes"
                :key="scene.id"
                :class="['text-container', { active: scene.id === state.activeSceneId }]"
              >
                <h3>{{ scene.title }}</h3>
                <p v-for="item in scene.description" :key="item">
                  <span class="before-des">•</span>
                  {{ item }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- 根据数据动态生成滚动触发器 -->
        <div v-for="scene in state.scenes" :key="scene.id" class="scroll-trigger" :data-section="scene.id"></div>
      </div>
      <div class="mobile-title">{{ state.title }}</div>
      <div class="mobile-sub-title">{{ state.subTitle }}</div>
      <tiny-carousel class="mobile-container" arrow="never" height="360px" autoplay>
        <tiny-carousel-item v-for="scene in state.scenes" :key="scene.id" class="mobile-section">
          <div class="mobile-image-section">
            <img :src="scene.image" :alt="scene.title" class="scene-image" />
          </div>
          <div class="mobile-text-section">
            <h3>{{ scene.title }}</h3>
            <p>{{ scene.description.join('，') }}。</p>
          </div>
        </tiny-carousel-item>
      </tiny-carousel>
    </div>
  </div>
</template>

<script>
import { reactive, onUnmounted, onMounted } from 'vue'
import { Carousel as TinyCarousel, CarouselItem as TinyCarouselItem } from '@opentiny/vue'

export default {
  components: {
    TinyCarousel,
    TinyCarouselItem
  },
  setup() {
    const state = reactive({
      title: '多场景定制案例',
      subTitle: '丰富的应用场景和解决方案，满足多种业务需求',
      activeSceneId: 'diagram',
      scenes: [
        {
          id: 'diagram',
          title: '低代码引擎+图元编排',
          tabTitle: '图元编排',
          description: [
            '具备完备的画布拖拽绘图核心能力',
            '配有灵活的属性配置面板',
            '支持定制符合特定业务领域的专属物料'
          ],
          image: `${import.meta.env.BASE_URL}img/home/case_1.svg`
        },
        {
          id: 'page',
          title: '低代码引擎+页面编排',
          tabTitle: '页面编排',
          description: [
            '拥有丰富的图表与组件库',
            '提供多种预设的页面布局模式',
            '通过简单拖拽区块即可生成各类页面结构',
            '支持移动端的屏幕适配与编排'
          ],
          image: `${import.meta.env.BASE_URL}img/home/case_2.svg`
        },
        {
          id: 'process',
          title: '低代码引擎+流程编排',
          tabTitle: '流程编排',
          description: ['提供可一键应用的流程模板', '内置丰富且灵活的流程组件库', '支持高效、快速地开发流程审批页面'],
          image: `${import.meta.env.BASE_URL}img/home/case_3.svg`
        }
      ]
    })

    let sceneObserver = null

    const initObservers = () => {
      sceneObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              state.activeSceneId = entry.target.dataset.section
            }
          })
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.5
        }
      )

      const triggers = document.querySelectorAll('.scroll-trigger')

      triggers.forEach((trigger) => sceneObserver.observe(trigger))
    }

    const handleClick = (id) => {
      state.activeSceneId = id

      const triggers = document.querySelectorAll('.scroll-trigger')

      triggers.forEach((trigger) => {
        if (id === trigger.dataset.section) {
          trigger.scrollIntoView()
        }
      })
    }

    onMounted(() => {
      initObservers()
    })

    onUnmounted(() => {
      if (sceneObserver) {
        sceneObserver.disconnect()
      }
    })

    return {
      state,
      handleClick
    }
  }
}
</script>

<style lang="less" scoped>
.home-multi-scenario {
  width: 100%;
  background: #f7faff;
  margin-top: 120px;
}
.home-multi-scenario-main {
  margin: 0 auto;
  .title {
    text-align: center;
    font-size: 40px;
    color: #191919;
    font-weight: 700;
    margin-top: 70px;
  }
  .sub-title {
    margin-top: 16px;
    color: #808080;
    font-size: 20px;
    line-height: 34px;
    text-align: center;
  }
  .mobile-title,
  .mobile-sub-title {
    display: none;
  }
  .mobile-container {
    display: none;
  }
  .tabs {
    width: 608px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    background: #e5eefc;
    color: #808080;
    border-radius: 382px;
    font-size: 18px;
    margin-top: 40px;
    .tab {
      width: 200px;
      border-radius: 382px;
      padding: 12px 64px;
      cursor: pointer;
    }
    .active {
      background: #ffffff;
      color: #191919;
      box-shadow: 0 0 4px 0 #c7e3ff;
    }
  }
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-up {
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
}

@keyframes scale-up-img {
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
}

.scroll-container {
  position: relative;
  width: 100%;
}
.sticky-view {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.scenes-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  gap: 40px;
  box-sizing: border-box;
  margin-top: 54px;
}
.text-section {
  position: relative;
  width: 460px;
  flex: 0.5;
  padding: 0 5%;
  margin-top: 18%;
  animation: slide-in 1.2s ease forwards;
  height: 100%;
}
.text-container {
  position: absolute;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  visibility: hidden;
}
.text-container.active {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}
.text-container h3 {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: #191919;
}

.text-container p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #808080;
  max-width: 500px;
  .before-des {
    margin-right: 8px;
  }
}
.image-section {
  position: relative;
  flex: 1;
  height: 100%;
  min-width: 0;
}
.image-container {
  position: absolute;
  max-width: 864px;
  top: 0;
  left: 0;
  opacity: 0;
  overflow: hidden;
  visibility: hidden;
  transition: transform 0.5s ease;
  background-image: url(/img/home/case_bg.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  padding: 36px;
  border-radius: 24px;
}
.image-container.active {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.5s ease;
  animation: scale-up 0.6s ease-out forwards;
}
.image-container img {
  object-fit: cover;
  width: 100%;
  height: auto;
  display: block;
  transition: opacity 0.5s ease;
  animation: scale-up-img 0.6s ease-out forwards;
}
.scroll-trigger {
  height: 100vh;
  width: 100%;
}

@media screen and (max-width: 1023px) {
  .home-multi-scenario {
    width: 100%;
    background-image: url(/img/home/multim_bg.svg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    margin-top: 40px;
    &-main {
      padding: 30px 0;
    }
    .mobile-title {
      display: block;
      margin-top: 0;
      font-size: 22px;
      margin-bottom: 8px;
      text-align: center;
      color: #191919;
      font-weight: 700;
    }
    .mobile-sub-title {
      display: block;
      margin-bottom: 30px;
      font-size: 14px;
      line-height: 18px;
      color: #808080;
      text-align: center;
    }
    .scroll-container {
      display: none;
    }
    .mobile-container {
      width: 100%;
      display: block;
      .mobile-section {
        padding: 20px;
        background: #fff;
        border-radius: 12px;
        width: 100%;
        .mobile-image-section {
          background-image: url(/img/home/case_bg.svg);
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
          padding: 14px;
          border-radius: 10px;
          img {
            object-fit: cover;
            width: 100%;
            height: auto;
            border-radius: 2px;
          }
        }
        .mobile-text-section {
          h3 {
            font-size: 16px;
            margin-bottom: 16px;
            margin-top: 20px;
            color: #191919;
            text-align: center;
          }
          p {
            font-size: 12px;
            line-height: 16px;
            color: #808080;
            margin: auto;
          }
        }
      }
    }
  }
}
</style>
