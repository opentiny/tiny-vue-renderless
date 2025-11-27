<template>
  <div class="home-multi-scenario">
    <div class="title">{{ state.title }}</div>
    <section ref="scenesContainer" class="scenes-container">
      <div class="scenes-wrapper">
        <div class="image-section">
          <div class="image-container">
            <img :src="currentScene.image" :alt="currentScene.title" class="scene-image" />
          </div>
        </div>

        <div class="text-section">
          <div
            v-for="(scene, index) in state.scenes"
            :key="index"
            :ref="
              (el) => {
                state.sceneRefs[index] = el
              }
            "
            class="scene-item"
          >
            <h2>{{ scene.title }}</h2>
            <p>{{ scene.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { reactive, onUnmounted, onMounted, computed } from 'vue'

export default {
  setup() {
    const state = reactive({
      title: '多场景定制案例',
      scenesContainer: null,
      sceneRefs: [],
      activeSceneIndex: 0,
      isFullViewport: false,
      scenes: [
        {
          title: '低代码引擎+图元编排',
          description:
            '完备的画布拖拽绘图核心能力，灵活的属性配置面板，支持领域定制物料，为用户提供强大的图元编排设计器。',
          image: `${import.meta.env.BASE_URL}img/home/case_1.svg`
        },
        {
          title: '低代码引擎+页面编排',
          description:
            '拥有丰富的图表组件，提供多种页面布局模式，轻松拖拽区块即可生成各种页面结构，同时支持移动端的屏幕编排。',
          image: `${import.meta.env.BASE_URL}img/home/case_2.svg`
        },
        {
          title: '低代码引擎+流程编排',
          description:
            '一键成型的流程模板，丰富灵活的流程组件，高效快速完成流程审批页面的开发。为用户打造强大的流程编排设计器。',
          image: `${import.meta.env.BASE_URL}img/home/case_3.svg`
        }
      ]
    })

    const currentScene = computed(() => {
      return state.scenes[state.activeSceneIndex]
    })

    let sceneObserver = null

    const initObservers = () => {
      sceneObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = state.sceneRefs.indexOf(entry.target)

              if (index !== -1) {
                state.activeSceneIndex = index
              }
            }
          })
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: 0.5
        }
      )

      state.sceneRefs.forEach((scene) => {
        if (scene) {
          sceneObserver.observe(scene)
        }
      })

      const containerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            state.isFullViewport = entry.isIntersecting && entry.intersectionRatio >= 0.9
          })
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: [0, 0.9, 1]
        }
      )

      if (state.scenesContainer) {
        containerObserver.observe(state.scenesContainer)
      }
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
      currentScene
    }
  }
}
</script>

<style lang="less" scoped>
.scene-image-container-bg {
  max-width: 80%;
  max-height: 80%;
  background-image: url(/img/home/case_bg.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  padding: 36px;
  border-radius: 24px;
}

.home-multi-scenario {
  max-width: 1640px;
  margin: 0 auto;
  .title {
    text-align: center;
    margin-top: 120px;
    font-size: 40px;
    color: #191919;
    font-weight: 700;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.top-section {
  height: 76vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  text-align: center;
  padding: 0 20px;
}

.top-section h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.top-section p {
  font-size: 1.2rem;
  max-width: 600px;
  color: #546e7a;
}

.scenes-container {
  position: relative;
  min-height: 76vh;
  background-color: #fff;
}

.scenes-wrapper {
  display: flex;
  min-height: 76vh;
}

.image-section {
  flex: 1;
  position: sticky;
  top: 0;
  height: 76vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.image-container {
  max-width: 700px;
  overflow: hidden;
  transition: transform 0.5s ease;
  background-image: url(/img/home/case_bg.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  padding: 36px;
  border-radius: 24px;
}

.image-container img {
  width: 100%;
  height: auto;
  display: block;
  transition: opacity 0.5s ease;
}

.text-section {
  flex: 0.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5%;
}

.scene-item {
  min-height: 76vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 0;
}

.scene-item h2 {
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.scene-item p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #546e7a;
  max-width: 500px;
}

@media (max-width: 768px) {
  .scenes-wrapper {
    flex-direction: column;
  }

  .image-section {
    position: relative;
    height: 50vh;
  }

  .text-section {
    padding: 0 20px;
  }

  .scene-item {
    min-height: 50vh;
  }
}
</style>
