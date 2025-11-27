<template>
  <div class="help-center">
    <!-- banner -->
    <div class="help-center-header">
      <div class="help-center-header-wrap">
        <div class="help-center-header-title">TinyEngine帮助中心</div>
        <div class="help-center-header-desc">
          基于开发者任务旅程的知识地图，聚合基础入门、深入学习、设计&架构、定制开发、后端部署、插件&API、官网介绍等官方套件，帮助开发者一站式便捷获取信息。
        </div>
      </div>
    </div>
    <div class="help-center-content">
      <div v-for="item in state.groupData" :key="item.id">
        <div class="group-header">
          <div class="group-title">{{ item.text }}</div>
          <div v-if="item.moreLink" class="group-more" @click="goMore(item)">
            查看更多
            <img src="/img/help/right-arrow.svg" alt="" />
          </div>
        </div>
        <!-- 使用指南 -->
        <div v-if="item.list" class="group-content">
          <div v-for="i in item.list" :key="i" class="card">
            <img :src="state.imgPre + i.img" alt="" />
            <div class="card-title">{{ i.title }}</div>
            <div v-for="k in i.children" :key="k" class="card-content" @click="navItemClick(k)">
              {{ k.title }}
            </div>
          </div>
        </div>
        <!-- 视频教程 -->
        <div v-if="item.videoList" class="group-content-video">
          <div v-for="(i, index) in item.videoList" :key="i" class="video-content" @click="videoItemClick(i)">
            <div :class="`video-overlay video-overlay-${index % 3}`">
              <div class="video-overlay-type">{{ i.type }}</div>
              <div class="video-overlay-title">{{ i.videoTitle }}</div>
              <div class="video-overlay-bottom">
                <div class="video-overlay-bottom-time">
                  <img src="/img/help/video-icon.svg" alt="" />
                  <span>{{ i.time }}</span>
                </div>
                <div class="video-overlay-bottom-start">
                  <img src="/img/help/playing.svg" alt="" />
                  <span>开始学习</span>
                </div>
              </div>
            </div>
            <div class="video-title">{{ i.title }}</div>
          </div>
        </div>
        <!-- 更多资源 -->
        <div v-if="item.resource" class="group-content-resource">
          <div v-for="i in item.resource" :key="i" class="resource">
            <div class="resource-title">{{ i.title }}</div>
            <div v-for="k in i.children" :key="k" class="resource-content" @click="navItemClick(k)">
              {{ k.title }}
              <img src="/img/help/right-arrow.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="help-center-footer">
      <home-about-us></home-about-us>
      <div class="copyright">
        <span class="text"
          >Copyright © Huawei Technologies Co., Ltd. 华为云Web能力中心 {{ year }}. All rights reserved.</span
        >
      </div>
    </div>
    <!-- 视频播放弹窗 -->
    <video-dialog
      :videoVisibility="state.videoVisibility"
      :videoData="state.videoData"
      @cancel="state.videoVisibility = false"
    ></video-dialog>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue'
import allData from './data/index.json'
import VideoDialog from './VideoDialog.vue'
import HomeAboutUs from '@/home/HomeAboutUs.vue'
import docsTimeData from '@/help/course/docsTime.json'

export default {
  components: {
    VideoDialog,
    HomeAboutUs
  },
  setup() {
    const list = allData
    const router = useRouter()

    const TYPE_MAP = {
      guide: 'guide',
      video: 'video',
      more: 'more'
    }

    const state = reactive({
      groupData: [
        {
          text: '使用指南',
          value: TYPE_MAP.guide,
          list: allData[TYPE_MAP.guide] || [],
          moreLink: '/help-center/course/engine'
        },
        {
          text: '视频教程',
          value: TYPE_MAP.video,
          videoList: allData[TYPE_MAP.video] || [],
          moreLink: 'https://space.bilibili.com/15284299'
        },
        {
          text: '更多资源',
          value: TYPE_MAP.more,
          resource: allData[TYPE_MAP.more] || []
        }
      ],
      videoVisibility: false,
      videoData: {},
      imgPre: `${import.meta.env.BASE_URL}`
    })

    const getData = () => {
      const sortData = docsTimeData.sort((a, b) => new Date(b.time) - new Date(a.time))
      // 取前五条数据
      const recentList = sortData.slice(0, 5)

      const showList = recentList.map((item) => ({
        name: item.subName + '.md',
        title: item.title,
        type: item.type
      }))

      state.groupData[2].resource[1].children = showList
    }

    const goMore = (item) => {
      if (item.value === TYPE_MAP.video) {
        window.open(item.moreLink)
      } else {
        router.push(item.moreLink)
      }
    }

    const navItemClick = (item) => {
      if (item.type && item.name) {
        router.push(`/help-center/course/${item.type}/${item.name.replace(/\.md$/, '')}`)
      }
    }

    const videoItemClick = (item) => {
      state.videoVisibility = true
      state.videoData = item
    }

    onMounted(() => {
      getData()
    })

    return {
      list,
      state,
      navItemClick,
      goMore,
      videoItemClick
    }
  }
}
</script>

<style lang="less" scoped>
.help-center {
  color: #191919;
  .help-center-header {
    width: 100%;
    background-image: url(/img/help/banner.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    padding: 120px 0;
    .help-center-header-wrap {
      max-width: 1100px;
      margin: 0 auto;
      padding: 0 24px;
    }
    .help-center-header-title {
      color: #191919;
      font-size: 40px;
      font-weight: 600;
    }
    .help-center-header-desc {
      color: #595959;
      width: 400px;
      line-height: 20px;
      margin-top: 24px;
    }
  }
  .help-center-content {
    padding: 50px 232px;
    .group-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .group-title {
      font-size: 28px;
      font-weight: 600;
    }
    .group-more {
      color: #808080;
      display: flex;
      gap: 5px;
      img {
        width: 13px;
      }
      &:hover {
        cursor: pointer;
        color: #191919;
      }
    }
    .group-content {
      display: flex;
      flex-flow: wrap;
      gap: 40px;
      margin: 40px 0 68px;
    }
    .card {
      width: calc((100% - 308px) / 4);
      background: #f8f8f8;
      border-radius: 20px;
      padding: 40px 0 44px 47px;
      img {
        width: 60px;
      }
      .card-title {
        font-size: 18px;
        font-weight: 600;
        line-height: 27px;
        margin: 20px 0 12px;
      }
      .card-content {
        margin-top: 12px;
        color: #191919;
        cursor: pointer;
        &:hover {
          color: #595959;
        }
      }
    }
    .group-content-video {
      display: flex;
      flex-flow: wrap;
      gap: 40px;
      margin: 40px 0 68px;
      .video-content {
        width: 450px;
      }
      .video-overlay {
        position: relative;
        border-radius: 16px;
        color: #fff;
        padding: 0 28px;
        height: 260px;
        &-0 {
          background-image: url(/img/help/video-cover1.svg);
        }
        &-1 {
          background-image: url(/img/help/video-cover2.svg);
        }
        &-2 {
          background-image: url(/img/help/video-cover3.svg);
        }
        .video-overlay-type {
          position: absolute;
          top: 20px;
        }
        .video-overlay-title {
          position: absolute;
          top: 50%;
          left: 50%;
          font-size: 26px;
          font-weight: 600;
          transform: translate(-50%, -65%);
        }
        .video-overlay-bottom {
          position: absolute;
          bottom: 28px;
          width: calc(100% - 56px);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          .video-overlay-bottom-time {
            padding: 0 12px;
            img {
              width: 21px;
            }
            display: flex;
            gap: 5px;
            height: 32px;
            line-height: 32px;
            border-radius: 6px;
            background-color: rgba(255, 255, 255, 0.2);
          }
          .video-overlay-bottom-start {
            display: none;
            padding: 0 24px;
            img {
              width: 15px;
            }
            gap: 6px;
            height: 48px;
            line-height: 48px;
            font-size: 16px;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 29px;
          }
        }
        &:hover {
          .video-overlay-bottom-start {
            display: flex;
          }
        }
      }
      .video-title {
        margin-top: 16px;
        margin-left: 28px;
        font-weight: 500;
      }
    }
    .group-content-resource {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .resource {
        width: calc(50% - 75px);
        .resource-title {
          font-size: 18px;
          font-weight: 600;
          padding: 16px 0;
          border-bottom: 1px solid #dbdbdb;
          margin-top: 24px;
        }
        .resource-content {
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          &:hover {
            color: #595959;
          }
          img {
            width: 13px;
          }
        }
      }
    }
  }
  .help-center-footer {
    background: #f5f5f5;
    .copyright {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
      background: #f5f5f5;
      border-top: 1px solid #dbdbdb;
      .text {
        font-size: 14px;
        width: 1360px;
        display: inline-block;
        text-align: center;
        color: #191919;
      }
    }
  }
}
</style>
