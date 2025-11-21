<template>
  <div class="tech-homepage">
    <!-- 消息展示 -->
    <div class="tech-homepage-info">
      <div class="tech-homepage-info-img">
        <div class="tech-homepage-info-img-mg">
          <img :src="info" />
        </div>
        <div v-if="!isMobile">
          <span class="tech-homepage-info-title"> 最新动态 </span>
        </div>
      </div>
      <div v-if="!isMobile" class="tech-homepage-info-separator">|</div>
      <div class="tech-homepage-info-content">
        <a
          href="/opentiny-design/article/analysis/next/1?name=原理解析&subName=Next"
          target="_blank"
          rel="noopener noreferrer"
        >
          一场 MCP 生态的变革——详解 OpenTiny NEXT 逆向思维的技术创新
        </a>
      </div>
    </div>
    <!-- 热门课程 -->
    <div class="tech-homepage-curriculum">
      <div class="tech-homepage-curriculum-title">热门课程</div>
      <div class="tech-homepage-curriculum-class">
        <!-- 轮播图 -->
        <div class="tech-homepage-curriculum-container">
          <tiny-carousel class="tech-homepage-curriculum-carousel" autoplay arrow="never">
            <tiny-carousel-item
              class="tech-homepage-curriculum-carousel-item"
              v-for="(item, index) in carouselInfo"
              :key="index"
            >
              <a :href="item.link" target="_blank" rel="noopener noreferrer">
                <img :src="item.image" />
              </a>
            </tiny-carousel-item>
          </tiny-carousel>
        </div>
        <!-- 消息展示 -->
        <div class="tech-homepage-curriculum-info">
          <div v-for="(item, index) in carouselInfo" :key="index" class="tech-homepage-curriculum-info-item">
            <div class="tech-homepage-curriculum-info-img">
              <img :src="item.img" />
            </div>
            <div class="tech-homepage-curriculum-info-desc">
              <a :href="item.link" target="_blank" :title="item.info" rel="noopener noreferrer">{{ item.info }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 项目分类 -->
    <div>
      <!-- 分类 -->
      <div class="tech-homepage-project">
        <div class="tech-homepage-project-title">项目分类</div>
        <div class="tech-homepage-project-more" @click="jumpArticle">查看更多</div>
      </div>
      <!-- 项目卡片 -->
      <div class="tech-homepage-project-content">
        <div class="tech-homepage-project-content-item" v-for="(item, key) in cardProjectData" :key="key">
          <project
            :card-container="'tech-homepage-project-card'"
            :card-other="'tech-homepage-project-card-other'"
            :card-title="'tech-homepage-project-card-title'"
            :card-content="'tech-homepage-project-card-content'"
          >
            <template #card-other>
              <img :src="item.img" />
            </template>
            <template #card-title>
              <p>{{ item.title }}</p>
            </template>
            <template #card-content>
              <div class="tech-homepage-project-card-desc">
                <div class="tech-homepage-project-card-desc-item" v-for="(ele, index) in item.desc" :key="index">
                  <div>
                    <img :src="word" />
                  </div>
                  <div class="tech-homepage-project-card-desc-info">
                    <a :href="ele.link" target="_blank" :title="ele['info']" rel="noopener noreferrer">
                      {{ ele['info'] }}
                    </a>
                  </div>
                  <div v-if="ele['suffix']"><img :src="news" /></div>
                </div>
              </div>
            </template>
          </project>
        </div>
        <div v-if="isMobile" class="tech-homepage-project-mobile-more" @click="jumpArticle">
          <img class="tech-homepage-project-mobile-img" :src="next" />前往查看更多
        </div>
      </div>
    </div>
    <!-- 推荐课程 -->
    <div>
      <div class="tech-homepage-video-title tech-homepage-video-title-mg">
        <div>推荐课程</div>
        <div class="tech-homepage-video-more" @click="jumpVideo">查看更多</div>
      </div>
      <div class="tech-homepage-video" v-if="false">
        <div class="tech-homepage-video-tabs">
          <div class="tech-homepage-video-tabs-item">热度最高</div>
          <div class="tech-homepage-video-tabs-item">最新发布</div>
        </div>
      </div>
      <!-- 视频卡片 -->
      <video-class :data="cardVideoData"></video-class>
      <div v-if="isMobile" class="tech-homepage-video-mobile-more" @click="jumpVideo">
        <img class="tech-homepage-video-mobile-img" :src="next" />前往查看更多
      </div>
    </div>
    <!-- 优秀讲师 -->
    <div>
      <div class="tech-homepage-teacher-title tech-homepage-teacher-title-mg">
        <div>优秀讲师</div>
      </div>
      <div class="tech-homepage-teacher">
        <div class="tech-homepage-teacher-content" v-for="(item, index) in teacherData" :key="index">
          <good
            :card-container="`tech-homepage-teacher-container`"
            :card-left="`tech-homepage-teacher-container-left`"
            :card-right="`tech-homepage-teacher-container-right`"
            :card-content="`tech-homepage-teacher-container-content`"
            :card-desc="`tech-homepage-teacher-container-desc`"
            :card-info="`tech-homepage-teacher-container-info`"
            :bg-img="{
              backgroundImage: 'url(' + item.img + ')',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              width: '100%'
            }"
          >
            <template #left>
              <img :src="item.header" />
            </template>
            <template #right-content>
              <div class="tech-homepage-teacher-container-item">
                <img v-if="item.num" :src="item.num" />
                <div :class="item.num ? 'tech-homepage-teacher-container-item-ml' : ''">{{ item.desc['content'] }}</div>
                <div class="tech-homepage-teacher-container-item-ml tech-homepage-teacher-container-item-f14">
                  {{ item.desc['area'] }}
                </div>
              </div>
            </template>
            <template #right-desc>
              <div class="tech-homepage-teacher-container-item">
                <div class="tech-homepage-teacher-container-item-f14">
                  {{ item.desc['part'] }}
                </div>
                <div class="tech-homepage-teacher-container-item-ml tech-homepage-teacher-container-item-f14">
                  {{ item.desc['job'] }}
                </div>
              </div>
            </template>
            <template #right-info>
              <div class="tech-homepage-teacher-container-item">
                <div class="tech-homepage-teacher-container-item-f12"><img :src="publish" /></div>
                <div class="tech-homepage-teacher-container-item-ml tech-homepage-teacher-container-item-f12">
                  {{ item.desc['publish'] }}
                </div>
              </div>
            </template>
          </good>
        </div>
      </div>
    </div>
    <div>
      <!-- 设计资源 -->
      <div class="tech-homepage-design">
        <div class="tech-homepage-design-source">
          <div class="tech-homepage-design-title">设计资源</div>
          <hr />
          <div class="tech-homepage-design-content">
            <div class="tech-homepage-design-data" v-for="(item, index) in designData" :key="index">
              <good
                :card-container="`tech-homepage-design-data-container-${item.desc.type}`"
                :card-left="`tech-homepage-design-data-container-left`"
                :card-right="`tech-homepage-design-data-container-right`"
                :card-content="`tech-homepage-design-data-container-content`"
                :card-desc="`tech-homepage-design-data-container-desc`"
                :card-info="`tech-homepage-design-data-container-info`"
                :bg-img="{
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  width: '100%',
                  backgroundPosition: 'right',
                  borderRadius: '16px'
                }"
              >
                <template #left>
                  <img :src="item.header" />
                </template>
                <template #right-content>
                  <div class="tech-homepage-design-data-container-right-content">{{ item.desc['title'] }}</div>
                </template>
                <template #right-desc>
                  <div class="tech-homepage-design-data-container-right-desc">{{ item.desc['description'] }}</div>
                </template>
                <template #right-info>
                  <div class="tech-homepage-design-data-container-right-info">
                    <tiny-button round @click="downLoad(item.desc['type'])" :disabled="item.desc['disabled']">
                      下载
                    </tiny-button>
                  </div>
                </template>
                <template #top v-if="item.desc['show']">
                  <img class="tech-homepage-design-data-container-top" :src="item.desc['show']" />
                </template>
              </good>
            </div>
          </div>
        </div>
        <!-- 热门活动 -->
        <div class="tech-homepage-design-events">
          <div class="tech-homepage-design-events-container">
            <div class="tech-homepage-design-title">热门活动</div>
            <div class="tech-homepage-design-events-more" @click="jumpEvents">查看更多</div>
          </div>
          <hr />
          <div>
            <div class="tech-homepage-design-events-desc" v-for="(item, index) in eventInfo" :key="index">
              <a :href="item.link" target="_blank" :title="item.info" rel="noopener noreferrer"> {{ item.info }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { TinyCarousel, TinyCarouselItem, TinyButton } from '@opentiny/vue'
import project from './common/project.vue'
import good from './common/good.vue'
import VideoClass from './other/video-class.vue'
import { carouselData, cardData, videoData, techData, eventsData } from './ts/current'
import { downloadFile } from './ts/utils'
import '../style/current.less'
import '../style/adapter/current.less'
import '../style/video.less'
import '../style/adapter/video.less'
import sketch from '@/assets/tech/sketch.svg'
import figma from '@/assets/tech/figma.svg'
import tagShow from '@/assets/tech/tag-show.svg'
import publish from '@/assets/tech/publish.svg'
import info from '@/assets/tech/info.svg'
import word from '@/assets/tech/word.svg'
import news from '@/assets/tech/new.svg'
import next from '@/assets/tech/next-link.png'
import useWindowSize from '@/tools/useWindowSize.js'

const { isMobile } = useWindowSize()

const router = useRouter()

const carouselInfo = carouselData()

const cardProjectData = cardData()

const cardVideoData = videoData()

const teacherData = techData()

const eventInfo = eventsData()

const designData = ref([
  {
    header: sketch,
    desc: {
      type: 'sketch',
      title: 'Sketch 组件包',
      description: '桌面组件 Sketch 模版包',
      disabled: false
    }
  }
])

const downLoad = (msg) => {
  if (msg === 'sketch') {
    // public目录下downloadFile
    downloadFile(`/downloadFile/TinyVue3\.0_UI\.KIT_202508\.sketch`, 'sketch')
  }
}

const jumpArticle = () => {
  router.push({
    name: 'write'
  })
}

const jumpVideo = () => {
  router.push({ name: 'video' })
}

const jumpEvents = () => {
  router.push({ name: 'events' })
}
</script>
