<template>
  <div v-show="videoDisplay" class="video-player">
    <div class="video-title">
      <p>{{ text?.trim().split(' ')[0] }}</p>
      <span>{{ text?.trim().split(' ')[1] }}</span>
    </div>
    <video ref="videoPlayer" class="video-js vjs-big-play-centered"> </video>
    <span class="video-time">{{ time }}</span>
  </div>
</template>

<script lang="ts" setup>
  import {
    onMounted,
    onUnmounted,
    ref,
    defineProps,
    onBeforeUpdate,
    watch,
  } from 'vue';
  import { useRouter } from 'vue-router';
  import videojs from 'video.js';
  import 'video.js/dist/video-js.css';
  import { nextTick, provide, reactive } from '@vue/runtime-core';
  import videoBackground from '@src/assets/images/videoBackground.jpg';
  import quickVideoVue from '@src/assets/video/vue-video.mp4';
  import practicedVideoVue from '@src/assets/video/vue-practiced.mp4';
  import quickVideoNg from '@src/assets/video/ng-start.mp4';
  import practicedVideoNg from '@src/assets/video/ng-cloud.mp4';

  const videoPlayer = ref(null);
  const myPlayer = ref();
  const display = ref('inline-block');
  const props = defineProps({
    source: Object as any,
    videoDisplay: Boolean,
    text: String,
    time: String,
  });
  const videoDisplay = ref(false);
  const route = useRouter();
  const source = ref();
  const videoSources = reactive({
    source: [{ src: source, type: 'video/mp4' }],
  });
  const text = ref('');
  const time = ref('');
  const quickStart = '快速开始 演示一个简单的Hello World应用';
  const practice = '云服务最佳实践 搭建华为云Serverless开发环境';

  onBeforeUpdate(() => {
    display.value = 'inline-block';
    if (source.value) {
      myPlayer.value.src({ src: source.value, type: 'video/mp4' });
    } else {
      myPlayer.value.pause();
      myPlayer.value.src();
    }
  });

  // 初始化播放
  onMounted(() => {
    myPlayer.value = videojs(
      videoPlayer.value,
      {
        preload: 'auto',
        poster: videoBackground,
        controls: true,
        sources: videoSources.source,
        controlBar: {
          remainingTimeDisplay: {
            displayNegative: false,
          },
        },
        playbackRates: [0.5, 1, 1.5, 2],
      },
      () => {
        myPlayer?.value.on('playing', () => {
          display.value = 'none';
        });
      }
    );
  });

  onUnmounted(() => {
    if (myPlayer.value) {
      myPlayer.value?.dispose();
    }
  });

  watch(
    route.currentRoute,
    (newValue, oldValue) => {
      if (newValue.name === 'Quick') {
        text.value = quickStart;
        time.value = '02:38';
        videoDisplay.value = true;
        source.value = quickVideoVue;
      } else if (newValue.name === 'Practiced') {
        text.value = practice;
        time.value = '04:23';
        videoDisplay.value = true;
        source.value = practicedVideoVue;
      } else if (newValue.name === 'hwcStart') {
        text.value = quickStart;
        time.value = '02:46';
        videoDisplay.value = true;
        source.value = quickVideoNg;
      } else if (newValue.name === 'hwcPractice') {
        text.value = practice;
        time.value = '04:58';
        videoDisplay.value = true;
        source.value = practicedVideoNg;
      } else {
        videoDisplay.value = false;
        source.value = null;
        videoSources.source = null as any;
      }
      if (newValue.hash) {
        provide('currentTitle', newValue.hash.substring(1));
        nextTick(() => {
          const targetElement = document.getElementById(
            newValue.hash.substring(1)
          );
          if (targetElement) {
            const targetOffset = targetElement?.offsetTop || 0;
            setTimeout(() => {
              // 预留标题距离header间隙 与快速导航跳转效果保留一致
              window.scrollTo(0, targetOffset - 20);
            });
          }
        });
      }
    },
    { immediate: true }
  );
</script>

<style scoped lang="less">
  .video-player {
    width: 500px;
    height: 400px;
    margin-top: 16px;

    .video-title {
      position: absolute;
      z-index: 99;
      display: v-bind(display);
      margin: 6.5%;
      color: #fff;

      p {
        font-size: 22px;
      }

      span {
        font-size: 18px;
      }
    }

    .video-time {
      position: absolute;
      z-index: 99;
      display: v-bind(display);
      margin-top: -2%;
      margin-left: 425px;
      color: #fff;
    }
  }

  .video-js {
    width: 100%;
    height: 100%;
    margin: auto auto;
  }

  :deep(.vjs-big-play-centered .vjs-big-play-button) {
    top: 75%;
    left: 88%;
  }
</style>
