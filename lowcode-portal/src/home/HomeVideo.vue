<template>
  <div class="home-video">
    <video controls id="guideVideo" :poster="poster">
      <source src="https://tiny-editor.obs.cn-north-5.myhuaweicloud.com/guide-video/tiny-engine.mp4" type="video/mp4" />
    </video>
    <div class="home-video-description">
      <div class="title">设计器引擎视频介绍</div>
      <div class="description">
        <div>
          视频首先以设计器开发者的视角，讲述如何创建物料、创建设计器、创建应用，然后再以前端应用开发者的视角，讲述如何可视化搭建页面、配置数据源、预览及发布应用等
        </div>
      </div>
      <tiny-button class="button" @click="playVideo">观看视频</tiny-button>
      <tiny-button type="primary" class="button" @click="$router.push('/help-center')">学院课程</tiny-button>
    </div>
  </div>
</template>

<script>
import { Button } from '@opentiny/vue'

export default {
  components: {
    TinyButton: Button
  },
  setup() {
    const poster = `${import.meta.env.BASE_URL}img/video.jpg`

    const playVideo = () => {
      document.getElementById('guideVideo').play()
    }

    return {
      playVideo,
      poster
    }
  }
}
</script>

<style lang="less" scoped>
.home-video {
  display: flex;
  justify-content: space-between;
  width: 1360px;
  box-sizing: border-box;
  padding: 80px 24px;
  margin: 0 auto;

  video {
    height: 375px;
  }

  .home-video-description {
    width: 460px;

    .title {
      font-size: 26px;
      line-height: 24px;
      font-weight: 500;
      margin-top: 70px;
      font-family: Microsoft YaHei, Microsoft YaHei-Normal;
    }

    .sub-title {
      font-size: 16px;
      line-height: 24px;
      margin-top: 28px;
      font-family: Microsoft YaHei, Microsoft YaHei-Normal;
    }
    .description {
      font-family: PingFangSC;
      font-size: 16px;
      color: #747677;
      text-align: justify;
      line-height: 28px;
      margin-bottom: 18px;
      margin-top: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }

    .button {
      margin-top: 20px;
    }
  }
}
</style>
