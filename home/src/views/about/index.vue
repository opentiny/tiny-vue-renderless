<script lang="js">
import { ref, defineComponent, nextTick } from 'vue'
import { $t } from '@/tools'
import crosses from '@/assets/images/about/crosses.svg'
import mes from '@/assets/images/about/mes.svg'
import gifts from '@/assets/images/about/gifts.svg'
import gifts1 from '@/assets/images/about/gifts1.svg'
import people from '@/assets/images/about/people.svg'
import people1 from '@/assets/images/about/people1.svg'
import shelf from '@/assets/images/about/shelf.svg'
import shelf1 from '@/assets/images/about/shelf1.svg'
import smiley from '@/assets/images/about/smiley.svg'
import smiley1 from '@/assets/images/about/smiley1.svg'
import snow from '@/assets/images/about/snow.svg'
import snow1 from '@/assets/images/about/snow1.svg'
import right from '@/assets/images/about/right.png'
import work1 from '@/assets/images/about/work1.svg'
import work2 from '@/assets/images/about/work2.svg'
import work3 from '@/assets/images/about/work3.svg'
import work4 from '@/assets/images/about/work4.svg'
import work5 from '@/assets/images/about/work5.svg'
import work6 from '@/assets/images/about/work6.svg'
import work7 from '@/assets/images/about/work7.svg'
import work8 from '@/assets/images/about/work8.svg'
import foreword1 from '@/assets/images/about/foreword1.png'
import foreword2 from '@/assets/images/about/foreword2.png'
import foreword3 from '@/assets/images/about/foreword3.png'
import foreword4 from '@/assets/images/about/foreword4.png'
import domain1 from '@/assets/images/about/domain1.png'
import domain2 from '@/assets/images/about/domain2.jpg'
import domain3 from '@/assets/images/about/domain3.jpg'
import domain4 from '@/assets/images/about/domain4.jpg'
import team1 from '@/assets/images/about/team1.jpg'
import team2 from '@/assets/images/about/team2.png'
import team3 from '@/assets/images/about/team3.png'
import team4 from '@/assets/images/about/team4.webp'
import team5 from '@/assets/images/about/team5.png'
import furion from '@/assets/images/about/furion.svg'
import consoles from '@/assets/images/about/consoles.svg'
import pangu from '@/assets/images/about/pangu.svg'
import pn from '@/assets/images/about/phone-number.png'
import useWindowSize from '@/tools/useWindowSize.js'
import { TinyButton, TinyButtonGroup, TinyCarousel, TinyCarouselItem, TinyCollapse, TinyCollapseItem, TinyTag  } from '@opentiny/vue'
import "./index.less";
import SectionAnchor from "./nav/nav.vue";
export default defineComponent({
  name: 'About',
  components: {
    TinyCarousel,
    TinyCarouselItem,
    TinyButton,
    TinyButtonGroup,
    TinyCollapse,
    TinyCollapseItem,
    TinyTag,
    SectionAnchor
  },
  setup() {
    const mesSvg = ref(mes)
    const crossesSvg = ref(crosses)
    const technicalSolutionArr = ref([
      {
        enTitle: $t('work_pc'),
        zhTitle: $t('work_pc2'),
        desc: $t('work_pc_text'),
        descMobile: $t('work_mobile_text'),
        pic: {
          backgroundImage: `url("${work1}")`
        },
        icon: right,
        src: 'https://opentiny.design/tiny-vue'
      },
      {
        enTitle: $t('work_material'),
        zhTitle: $t('work_material2'),
        desc: $t('work_material_text'),
        descMobile: $t('work_mobile_material_text'),
        pic: {
          backgroundImage: `url("${work2}")`
        },
        icon: right,
        src: 'https://opentiny.design/tiny-vue'
      },
      {
        enTitle: $t('work_rack'),
        zhTitle: $t('work_rack2'),
        desc: $t('work_rack_text'),
        descMobile: $t('work_mobile_rack_text'),
        pic: {
          backgroundImage: `url("${work3}")`
        },
        icon: right,
        src: 'https://opentiny.design/tiny-ng'
      },
      {
        enTitle: $t('work_scheme'),
        zhTitle: $t('work_scheme2'),
        desc: $t('work_scheme_text'),
        descMobile: $t('work_mobile_scheme_text'),
        pic: {
          backgroundImage: `url("${work4}")`
        },
        icon: right,
        src: 'https://opentiny.design/tiny-charts'
      },
      {
        enTitle: $t('work_multiend'),
        zhTitle: $t('work_multiend2'),
        desc: $t('work_multiend_text'),
        descMobile: $t('work_mobile_multiend_text'),
        pic: {
          backgroundImage: `url("${work5}")`
        },
        icon: right,
        src: 'https://opentiny.design/tiny-engine'

      },
      {
        enTitle: $t('work_lowcode'),
        zhTitle: $t('work_lowcode2'),
        desc: $t('work_lowcode_text'),
        descMobile: $t('work_mobile_lowcode_text'),
        pic: {
          backgroundImage: `url("${work6}")`
        },
        icon: right,
        src: 'https://opentiny.design/tiny-cli'
      },
      {
        enTitle: $t('work_platform'),
        zhTitle: $t('work_platform2'),
        desc: $t('work_platform_text'),
        descMobile: $t('work_moblie_platform_text'),
        pic: {
          backgroundImage: `url("${work7}")`
        },
        icon: right,
        src: 'https://opentiny.design/pro'
      },
      {
        enTitle: $t('work_door'),
        zhTitle: $t('work_door2'),
        desc: $t('work_door_text'),
        descMobile: $t('work_mobile_door_text'),
        pic: {
          backgroundImage: `url("${work8}")`
        },
        icon: right,
        src: 'https://opentiny.design/designtheme'
      }
    ]);
    // 我们的内部技术项目
    const techProjectArr = ref([
      {
        enTitle: $t('work_furion'),
        zhTitle: $t('work_furion-sub'),
        desc: $t('work_furion_text'),
        descMobile: $t('work_furion_mobile_text'),
        pic: {
          backgroundImage: `url("${furion}")`
        },
        icon: right,
        src: '',
        tech: ['大数据', 'AI', '高性能', 'Spring Boot', 'Kafka', 'Flink', 'Spark', 'ClickHouse', 'DWS']
      },
      {
        enTitle: $t('work_console'),
        zhTitle: $t('work_console_subtitle'),
        desc: $t('work_console_text'),
        descMobile: $t('work_mobile_console_text'),
        pic: {
          backgroundImage: `url("${consoles}")`
        },
        icon: right,
        src: '',
        tech: ['高可用', '高性能', 'Java', 'Netty', 'Spring Boot']
      },
      {
        enTitle: $t('work_pangu'),
        zhTitle: $t('work_pangu_subtitle'),
        desc: $t('work_pangu_text'),
        descMobile: $t('work_mobile_pangu_text'),
        pic: {
          backgroundImage: `url("${pangu}")`
        },
        icon: right,
        src: '',
        tech: ['AI', 'LLM', 'Agent', 'Embedding', 'RAG', 'Rerank', 'ElasticSearch']
      },
      {
        enTitle: $t('work_gate'),
        zhTitle: $t('work_gate_subtitle'),
        desc: $t('work_gate_text'),
        descMobile: $t('work_mobile_gate_text'),
        pic: {
          backgroundImage: `url("${consoles}")`
        },
        icon: right,
        src: '',
        tech: ['Eggjs', 'puppeteer', 'Angular']
      }
    ]);

    const answerArr = ref([
      {
        title: $t('why_business'),
        desc: $t('why_business_text')
      },
      {
        title: $t('why_important'),
        desc: $t('why_important_text')
      },
      {
        title: $t('why_technology'),
        desc: $t('why_technology_text')
      },
      {
        title: $t('why_space'),
        desc: $t('why_space_text')
      },
      {
        title: $t('why_atmosphere'),
        desc: $t('why_atmosphere_text')
      },
      {
        title: $t('why_up'),
        desc: $t('why_up_text')
      }
    ]);

    const jobIntroduction = ref([
      {
        name: "0",
        directions: $t('need_ai'),
        place: $t('need_location'),
        citys: [$t('need_city1'), $t('need_city2'), $t('need_city3'), $t('need_city4'), $t('need_city5'), $t('need_city6'), $t('need_city7')],
        posts: $t('need_responsibilities'),
        jobList: [$t('need_ai_work1'), $t('need_ai_work2'), $t('need_ai_work3'), $t('need_ai_work4'), $t('need_ai_work5')],
        postSrc: ''
      },
      {
        name: "1",
        directions: $t('need_web'),
        place: $t('need_location'),
        citys: [$t('need_city1'), $t('need_city2'), $t('need_city3'), $t('need_city4'), $t('need_city5'), $t('need_city6'), $t('need_city7')],
        posts: $t('need_responsibilities'),
        jobList: [$t('need_web_work1'), $t('need_web_work2'), $t('need_web_work3'), $t('need_web_work4'), $t('need_web_work5')],
        postSrc: ''
      },
      {
        name: "2",
        directions: $t('need_java'),
        place: $t('need_location'),
        citys: [$t('need_city1'), $t('need_city2'), $t('need_city3'), $t('need_city4'), $t('need_city5'), $t('need_city6'),$t('need_city7')],
        posts: $t('need_responsibilities'),
        jobList: [$t('need_java_work1'), $t('need_java_work2'), $t('need_java_work3'), $t('need_java_work4'), $t('need_java_work5')],
        postSrc: ''
      }
    ]);

    const cardArr = ref([
      {
        detailContent: {
          width: '100%',
          opacity: '1',
          zIndex: '20',
        },
        simpleContent: {
          width: '100%',
          opacity: '0',
          zIndex: '10',
          backgroundImage: `url("${foreword4}")`,
        },
        card: {
          title: $t('introductory_part'),
          text: $t('introductory_part_description')
        },
        titleIcon: people,
        titleIconBlack: people1
      },
      {
        detailContent: {
          width: '0',
          opacity: '0',
          zIndex: '10',
        },
        simpleContent: {
          width: '100%',
          opacity: '1',
          zIndex: '20',
          backgroundImage: `url("${foreword1}")`,
        },
        card: {
          title: $t('introductory_tech'),
          text: $t('introductory_tech_description')
        },
        titleIcon: snow,
        titleIconBlack: snow1
      },
      {
        detailContent: {
          width: '0',
          opacity: '0',
          zIndex: '10',
        },
        simpleContent: {
          width: '100%',
          opacity: '1',
          zIndex: '20',
          backgroundImage: `url("${foreword2}")`,
        },
        card: {
          title: $t('introductory_happy'),
          text: $t('introductory_happy_description')
        },
        titleIcon: smiley,
        titleIconBlack: smiley1
      },
      {
        detailContent: {
          width: '0',
          opacity: '0',
          zIndex: '10',
        },
        simpleContent: {
          width: '100%',
          opacity: '1',
          zIndex: '20',
          backgroundImage: `url("${foreword3}")`,
        },
        card: {
          title: $t('introductory_system'),
          text: $t('introductory_system_description'),
        },
        titleIcon: shelf,
        titleIconBlack: shelf1
      },
      {
        detailContent: {
          width: '0',
          opacity: '0',
          zIndex: '10',
        },
        simpleContent: {
          width: '100%',
          opacity: '1',
          zIndex: '20',
          backgroundImage: `url("${foreword4}")`,
        },
        card: {
          title: $t('introductory_benefits'),
          text: $t('introductory_benefits_description'),
        },
        titleIcon: gifts,
        titleIconBlack: gifts1
      }
    ])

    const domainArr = ref([
      {
      titleIconBlack: domain1
      },
      {
      titleIconBlack: domain2
      },
      {
      titleIconBlack: domain3
      },
      {
      titleIconBlack: domain4
      }
    ])

    const teamArr = ref([
      {
      titleIconBlack: team2
      },
      {
      titleIconBlack: team5
      },
      {
      titleIconBlack: team3
      },
      {
      titleIconBlack: team4
      },
      {
      titleIconBlack: team1
      }
    ])
    let active = ref(0);

    const { isMobile } = useWindowSize()

    const showCardEnter = (card, cardKey) => {
      const activeCard = cardArr.value[active.value];
      const newCard = cardArr.value[cardKey];
      // 设置当前活动卡片的box1和box2样式
      activeCard.detailContent.width = '100%';
      activeCard.detailContent.opacity = '0';
      activeCard.detailContent.zIndex = '10';
      activeCard.simpleContent.width = '100%';
      activeCard.simpleContent.opacity = '1';
      activeCard.simpleContent.zIndex = '20';


      // 设置新的卡片的box1和box2样式
      newCard.detailContent.width = '100%';
      newCard.detailContent.opacity = '1';
      newCard.detailContent.zIndex = '30';
      newCard.simpleContent.width = '100%';
      newCard.simpleContent.opacity = '0';
      newCard.simpleContent.zIndex = '10';

      // 更新活动卡片的索引
      active.value = cardKey;
    };

    const anchorData = [
      { title: '1', desc: '我们是谁', link: '#sec1', key: 'sec1' },
      { title: '2', desc: '我们的开源产品', link: '#sec2', key: 'sec2' },
      { title: '3', desc: '我们的内部技术项目', link: '#sec3', key: 'sec3' },
      { title: '4', desc: '为什么选择我们？', link: '#sec4', key: 'sec4' },
      { title: '5', desc: '行业共振，专家领航', link: '#sec5', key: 'sec5' },
      { title: '6', desc: '这个团队超会玩儿！', link: '#sec6', key: 'sec6' },
      { title: '7', desc: '非常需要你来！', link: '#target-job', key: 'target-job' }
    ]

    return {
      pn,
      anchorData,
      techProjectArr,
      technicalSolutionArr,
      answerArr,
      jobIntroduction,
      cardArr,
      showCardEnter,
      active,
      crossesSvg,
      mesSvg,
      isMobile,
      domainArr,
      teamArr
    };
  }
})
</script>

<template>
  <div class="about">
    <div class="about-banner">
      <div class="min-page">
        <div class="about-banner-title">
          {{ $t('banner_dept') }}
          <div class="about-banner-title-item">{{ $t('banner_team') }}</div>
        </div>
        <div class="about-banner-desc">
          {{ $t('banner_issue1') }}
          <br />
          {{ $t('banner_issue2') }}
        </div>
      </div>
    </div>
    <div class="about-contents" v-if="!isMobile" id="sec1">
      <div class="about-contents-title">
        {{ $t('introductory_who') }}
      </div>
      <div class="about-contents-desc">
        {{ $t('introductory_team') }}
      </div>
      <div class="about-contents-part">
        <div v-for="(item, key) in cardArr" :key="key" class="cards" :style="{ width: key === active ? '50%' : '10%' }">
          <div class="showCard" :style="item.detailContent">
            <img :src="item.titleIconBlack" class="showCardIcon" loading="lazy" />
            <div class="title">{{ item.card.title }}</div>
            <div class="text">{{ item.card.text }}</div>
            <div>
              <a href="#target-job" class="joinUs">
                {{ $t('introductory_join') }}
                <div class="jumpImg"></div>
              </a>
            </div>
          </div>
          <div class="staticCard" :style="item.simpleContent" @mouseenter="showCardEnter(item, key)">
            <img :src="item.titleIcon" class="staticCardIcon" loading="lazy" />
            <div class="staticCardTitle">{{ item.card.title }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="about-mobile-contents">
      <div class="about-contents-mobile-title">
        {{ $t('introductory_who') }}
      </div>
      <div class="about-contents-mobile-desc">
        {{ $t('introductory_team') }}
      </div>
      <div class="about-contents-mobile-part">
        <tiny-carousel ref="carouselRef" height="470px" indicator-position="outside" autoplay arrow="never">
          <tiny-carousel-item class="carousel-item-demo" v-for="(item, index) in cardArr" :key="index">
            <template #default>
              <img :src="item.titleIconBlack" class="show-card-icon" loading="lazy" />
              <div class="carousel-title">{{ item.card.title }}</div>
              <div class="carousel-text">
                {{ item.card.text }}
              </div>
            </template>
          </tiny-carousel-item>
        </tiny-carousel>
      </div>
    </div>
    <div class="about-work" id="sec2">
      <div class="about-work-title">
        {{ $t('work_what') }}
      </div>
      <div class="about-work-desc">
        {{ $t('work_description') }}
      </div>
      <div v-if="!isMobile" class="about-work-contents">
        <div v-for="(item, itemKey) in technicalSolutionArr" :key="itemKey" class="about-work-contents-item">
          <div class="tag-layout">
            <div class="sel-tag">
              <img :src="crossesSvg" loading="lazy" />
              {{ $t('work_open') }}
            </div>
          </div>
          <div class="work-img" :style="item.pic"></div>
          <h1 class="about-work-h">
            {{ item.enTitle }}
            {{ item.zhTitle }}
          </h1>
          <span :title="item.desc" class="ellipsis3">{{ item.desc }}</span>
          <a class="work-icon" :href="item.src">
            <img :src="item.icon" alt="" loading="lazy" />
          </a>
        </div>
      </div>
      <div v-else>
        <div v-for="(item, itemKey) in technicalSolutionArr" :key="itemKey" class="about-work-mobile-contents-item">
          <div class="about-work-mobile-tag">
            <div class="about-work-mobile-sel-tag">
              <img :src="crossesSvg" loading="lazy" />
              {{ $t('work_open') }}
            </div>
          </div>

          <div class="about-work-mobile-flex-layout">
            <div class="work-mobile-img" :style="item.pic"></div>
            <div class="work-mobile-desc">
              <span>
                {{ item.enTitle }}
                {{ item.zhTitle }}
              </span>
              <div :title="item.desc" class="work-mobile-ellipsis">{{ item.descMobile }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 内部技术项目 -->
    <div class="about-work" id="sec3">
      <div class="about-work-title">
        {{ $t('work_tech-in') }}
      </div>
      <div class="about-work-desc">
        {{ $t('work_tech-description') }}
      </div>
      <div v-if="!isMobile" class="about-work-contents">
        <div v-for="(item, itemKey) in techProjectArr" :key="itemKey" class="about-work-contents-item">
          <div class="work-img" :style="item.pic"></div>
          <h1 class="about-work-tech-h">
            {{ item.enTitle }}
            {{ item.zhTitle }}
          </h1>
          <span :title="item.desc" class="ellipsis3">{{ item.desc }}</span>
          <div class="about-work-tech-tag">
            <tiny-tag v-for="(item, index) in item.tech" :key="index" type="success" class="tag-tech-desc">
              {{ item }}
            </tiny-tag>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-for="(item, itemKey) in techProjectArr" :key="itemKey" class="about-work-mobile-contents-item">
          <div class="about-work-mobile-tag">
            <tiny-tag v-for="(item, index) in item.tech" :key="index" type="success" class="tag-tech-desc">
              {{ item }}
            </tiny-tag>
          </div>

          <div class="about-work-mobile-flex-layout">
            <div class="work-mobile-img" :style="item.pic"></div>
            <div class="work-mobile-desc">
              <span>
                {{ item.enTitle }}
                {{ item.zhTitle }}
              </span>
              <div :title="item.desc" class="work-mobile-ellipsis">{{ item.descMobile }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="about-select" id="sec4">
      <div class="about-select-title">
        {{ $t('why_title') }}
      </div>
      <div class="about-select-desc">
        {{ $t('why_description') }}
      </div>
      <div v-if="!isMobile" class="about-select-contents">
        <div v-for="(item, itemKey) in answerArr" :key="itemKey" class="about-select-contents-item">
          <div class="sel-pic"></div>
          <div class="select-text">
            <h1>{{ item.title }}</h1>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
      <div v-else class="about-select-mobile">
        <div v-for="(item, itemKey) in answerArr" :key="itemKey" class="about-select-mobile-contents-item">
          <div class="about-select-mobile-sel-pic"></div>
          <div class="about-select-mobile-select-text">
            <h1>{{ item.title }}</h1>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isMobile" class="about-domain" id="sec5">
      <div class="about-domain-title">
        {{ $t('expert_title') }}
      </div>
      <div class="about-domain-desc">
        {{ $t('expert_text') }}
      </div>
      <div class="about-domain-pic">
        <div class="item1 activePic">
          <div class="pic"></div>
        </div>
        <div class="pic-l">
          <div class="item2 activePic">
            <div class="pic"></div>
          </div>
          <div class="pic-b">
            <div class="item3 activePic">
              <div class="pic"></div>
            </div>
            <div class="item4 activePic">
              <div class="pic"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="about-mobile-domain">
      <div class="about-mobile-domain-title">
        {{ $t('expert_title') }}
      </div>
      <div class="about-mobile-domain-desc">
        {{ $t('expert_text') }}
      </div>
      <tiny-carousel ref="carouselDomainRef" indicator-position="outside" autoplay height="210px" arrow="never">
        <tiny-carousel-item class="carousel-item-domain-demo" v-for="(item, index) in domainArr" :key="index">
          <template #default>
            <img :src="item.titleIconBlack" loading="lazy" />
          </template>
        </tiny-carousel-item>
      </tiny-carousel>
    </div>
    <div v-if="!isMobile" class="about-team" id="sec6">
      <div class="about-team-title">
        {{ $t('lives_title') }}
      </div>
      <div class="about-team-desc">
        {{ $t('lives_text') }}
      </div>
      <div class="about-team-photos">
        <div class="l-p activePic">
          <div class="pic"></div>
        </div>
        <div class="l-c">
          <div class="p-t activePic">
            <div class="pic"></div>
          </div>
          <div class="p-b activePic">
            <div class="pic"></div>
          </div>
        </div>
        <div class="l-r">
          <div class="p-t activePic">
            <div class="pic"></div>
          </div>
          <div class="p-b activePic">
            <div class="pic"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="about-mobile-team">
      <div class="about-mobile-team-title">
        {{ $t('lives_title') }}
      </div>
      <div class="about-mobile-team-desc">
        {{ $t('lives_text') }}
      </div>
      <tiny-carousel ref="carouselTeamRef" indicator-position="outside" height="210px" autoplay arrow="never">
        <tiny-carousel-item class="carousel-item-domain-demo" v-for="(item, index) in teamArr" :key="index">
          <template #default>
            <img :src="item.titleIconBlack" loading="lazy" />
          </template>
        </tiny-carousel-item>
      </tiny-carousel>
    </div>
    <div class="about-job" id="target-job">
      <div class="about-job-title">
        {{ $t('need_title') }}
      </div>
      <div class="about-job-desc">
        {{ $t('need_text') }}
      </div>
      <div v-if="!isMobile">
        <div v-for="(item, key) in jobIntroduction" :key="key" class="jobCard">
          <div class="directions">
            {{ item.directions }}
          </div>
          <div class="place-info">
            <div class="place">
              {{ item.place }}
            </div>
            <div>
              <tiny-tag v-for="(city, cityKey) in item.citys" size="medium" :key="cityKey" class="cityCla">
                {{ city }}
              </tiny-tag>
            </div>
          </div>
          <div class="postContent">
            <div class="post-info">
              <div class="place">
                {{ item.posts }}
              </div>
              <div class="postsList">
                <p v-for="(job, jobKey) in item.jobList" :key="jobKey" class="post">
                  {{ job }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <tiny-collapse class="collapse-wrap" accordion>
          <tiny-collapse-item :title="jobIntroduction[0].directions" name="0">
            <div class="collapse-content">
              <div class="collapse-place">
                {{ jobIntroduction[0].place }}
              </div>
              <tiny-tag v-for="(city, cityKey) in jobIntroduction[0].citys" :key="cityKey" class="collapse-cityCla">
                {{ city }}
              </tiny-tag>
              <div class="collapse-postContent">
                <div class="collapse-place">
                  {{ jobIntroduction[0].posts }}
                </div>
                <div class="collapse-postsList">
                  <p v-for="(job, jobKey) in jobIntroduction[0].jobList" :key="jobKey" class="collapse-post">
                    {{ job }}
                  </p>
                </div>
              </div>
            </div>
          </tiny-collapse-item>
        </tiny-collapse>
        <tiny-collapse class="collapse-wrap" accordion>
          <tiny-collapse-item :title="jobIntroduction[1].directions" name="1">
            <div class="collapse-content">
              <div class="collapse-place">
                {{ jobIntroduction[1].place }}
              </div>
              <tiny-tag v-for="(city, cityKey) in jobIntroduction[1].citys" :key="cityKey" class="collapse-cityCla">
                {{ city }}
              </tiny-tag>
              <div class="collapse-postContent">
                <div class="collapse-place">
                  {{ jobIntroduction[1].posts }}
                </div>
                <div class="collapse-postsList">
                  <p v-for="(job, jobKey) in jobIntroduction[1].jobList" :key="jobKey" class="collapse-post">
                    {{ job }}
                  </p>
                </div>
              </div>
            </div>
          </tiny-collapse-item>
        </tiny-collapse>
        <tiny-collapse class="collapse-wrap" accordion>
          <tiny-collapse-item :title="jobIntroduction[2].directions" name="2">
            <div class="collapse-content">
              <div class="collapse-place">
                {{ jobIntroduction[2].place }}
              </div>
              <tiny-tag v-for="(city, cityKey) in jobIntroduction[2].citys" :key="cityKey" class="collapse-cityCla">
                {{ city }}
              </tiny-tag>
              <div class="collapse-postContent">
                <div class="collapse-place">
                  {{ jobIntroduction[2].posts }}
                </div>
                <div class="collapse-postsList">
                  <p v-for="(job, jobKey) in jobIntroduction[2].jobList" :key="jobKey" class="collapse-post">
                    {{ job }}
                  </p>
                </div>
              </div>
            </div>
          </tiny-collapse-item>
        </tiny-collapse>
      </div>
      <div class="about-contact">
        <h1>{{ $t('need_contacts') }}</h1>
        <div class="about-contact-flex">
          <div class="mail-name">
            <img :src="mesSvg" />
            <span>{{ $t('need_malibox') }}</span>
          </div>
          <img :src="pn" loading="lazy" />
          <p style="font-weight: 600; font-size: 14px">添加微信备注：26校招</p>
        </div>
      </div>
    </div>
    <!-- 锚点 -->
    <SectionAnchor v-if="!isMobile" :anchors="anchorData"></SectionAnchor>
  </div>
</template>
