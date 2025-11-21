import hdc from '@/assets/tech/hdc.svg'
import xian from '@/assets/tech/xian.svg'
import cloud from '@/assets/tech/cloud.svg'
import w3 from '@/assets/tech/w3.svg'
import open from '@/assets/tech/open.svg'
import avtive from '@/assets/tech/avtive.svg'
import teacher from '@/assets/tech/teacher.svg'
import summer from '@/assets/tech/summer.svg'
import give from '@/assets/tech/give.svg'
import discuss from '@/assets/tech/discuss.svg'
import contact from '@/assets/tech/contact.svg'
import voice from '@/assets/tech/voice.svg'
import goism from '../mark-down/image/hot-events/goism-2.jpg'

export function activeData() {
  const hot = {
    type: 'hot',
    name: '热门活动',
    data: [
      {
        markId: 'goism', //与markdown文件同名
        title: 'OpenTiny NEXT 亮相 GOSIM HANGZHOU2025，携手开发者共筑开源智能生态！',
        content:
          '华为 Web 前端框架专家、OpenTiny 项目负责人莫春辉老师以《探索与实践智能体 Web 应用开发》为题，展开了一场关于下一代 Web 应用范式的前瞻分享。',
        link: '/opentiny-design/article/hot/goism?name=热门活动&type=hot',
        instruct: {
          write: '原创',
          declaration: '作者：',
          author: '胡艳鑫',
          date: '2025年9月22日',
          apply: ''
        },
        img: goism
      },
      {
        markId: '1', //与markdown文件同名
        title: 'HDC 2025|仰望星空，低头看路！OpenTiny再启航，持续打造前端智能化解决方案',
        content:
          '6月21日下午，华为云高级前端开发工程师曾令卡在《AI+开源：赋能开发者迈向AI时代》的专题论坛上发表了关于《基于 MCP 协议：快速解锁 AI 操作 Web 组件》的分享，本次演讲聚焦于 TinyVue 智能组件库的探索与实践。',
        link: '/opentiny-design/article/hot/1?name=热门活动&type=hot',
        instruct: {
          write: '原创',
          declaration: '作者：',
          author: '胡艳鑫',
          date: '2025年6月25日',
          apply: ''
        },
        img: hdc
      },
      {
        markId: '2', //与markdown文件同名
        title: '开源之夏·西安电子科技大学站精彩回顾：OpenTiny开源技术下沉校园，点燃高校开发者技术热情',
        content:
          '开源之夏2025编程活动正在如火如荼的进行中，当前也迎来了报名的倒计时阶段，开源之夏组织方也通过高校行系列活动进入各大高校，帮助高校开发者科普开源文化、开源活动、开源技术。',
        link: '/opentiny-design/article/hot/2?name=热门活动&type=hot',
        instruct: {
          write: '原创',
          declaration: '作者：',
          author: '胡艳鑫',
          date: '2025年6月9日',
          apply: ''
        },
        img: xian
      },
      {
        markId: '3', //与markdown文件同名
        title: '是观察者，也是实践者！|华为云开源开发者大前端技术论坛完满结束',
        content:
          '本次大前端技术论坛围绕7个议题展开分享，聚焦业务驱动的前端工具实践。包含OpenTiny、DevUI、GitCode等技术的创新应用。',
        link: '/opentiny-design/article/hot/3?name=热门活动&type=hot',
        instruct: {
          write: '原创',
          declaration: '作者：',
          author: '胡艳鑫',
          date: '2024年11月21日',
          apply: ''
        },
        img: cloud
      },
      {
        markId: '4', //与markdown文件同名
        title: 'OpenTiny 亮相 W3C 2024春季顾问委员会会议，共话行业新趋势',
        content:
          '万维网联盟（World Wide Web Consortium，简称 W3C）于4月8日-4月9日在日本召开2024年顾问委员会会议（Advisory Committee Meeting）。华为产业发展专家丁蔚博士及华为云 OpenTiny 项目的 Web 前端框架技术专家莫春辉老师也受邀参与了本次 W3C 的顾问委员会会议。',
        link: '/opentiny-design/article/hot/4?name=热门活动&type=hot',
        instruct: {
          write: '原创',
          declaration: '作者：',
          author: '胡艳鑫',
          date: '2024年4月22日',
          apply: ''
        },
        img: w3
      },
      {
        markId: '5', //与markdown文件同名
        title: '官宣！OpenTiny 前端 Web 应用开发挑战赛开赛啦~30万奖金等你拿！',
        content: '报名入口： https://competition.atomgit.com/competitionInfo?id=341b80d53f52b95c53606723e10f575b',
        link: '/opentiny-design/article/hot/5?name=热门活动&type=hot',
        instruct: {
          write: '原创',
          declaration: '作者：',
          author: '胡艳鑫',
          date: '2024年1月16日',
          apply: ''
        },
        img: open
      },
      {
        markId: '6', //与markdown文件同名
        title: '精彩回顾|OpenTiny 成功参与华为云开发者日·2023年度创享峰会！',
        content:
          '12月20日，华为云开发者日·2023年度创享峰会成功举办，众多开发者与技术爱好者齐聚一堂，在现场，有600余名开发者与华为云技术专家共同就大模型应用、CodeArts软件开发等技术话题进行深入探讨，分享实战技巧与解决方案。',
        link: '/opentiny-design/article/hot/6?name=热门活动&type=hot',
        instruct: {
          write: '原创',
          declaration: '作者：',
          author: '胡艳鑫',
          date: '2023年12月29日',
          apply: ''
        },
        img: avtive
      }
    ]
  }

  const news = {
    type: 'news',
    name: '最新活动',
    data: [
      {
        markId: '1', //与markdown文件同名
        title: 'OpenTiny技术直播讲师招募：与开源同行，点亮技术影响力！',
        tag: '',
        type: 'warning',
        content: 'OpenTiny技术直播讲师招募：与开源同行，点亮技术影响力！',
        instruct: {
          write: '原创',
          declaration: '作者：',
          author: '胡艳鑫',
          date: '2025年3月20日',
          apply: ''
        },
        img: teacher,
        link: '/opentiny-design/article/news/1?name=最新活动&type=news'
      },
      {
        markId: '2', //与markdown文件同名
        title: '15个项目，12000奖金！OpenTiny 开源之夏2025编程活动来袭！',
        tag: 'NEW',
        type: 'danger',
        content:
          '学生可自主选择感兴趣的项目进行申请，中选后在项目开发者（社区导师）的指导下进行开发。根据项目的难易程度和完成情况，结项者将获取开源之夏活动奖金和结项证书。',
        link: '/opentiny-design/article/news/2?name=最新活动&type=news',
        instruct: {
          write: '原创',
          declaration: '作者：',
          author: '胡艳鑫',
          date: '2025年5月7日',
          apply: ''
        },
        img: summer
      },
      {
        markId: '3', //与markdown文件同名
        title: '朋友你好，一起加入OpenTiny社区吧~',
        content:
          '近期，OpenTiny 社区收到很多开发者对于 TinyEngine 低代码引擎二开教程的建议，项目工程师们根据社区开发者们的建议也紧锣密鼓的推进项目的演进更新。',
        link: '/opentiny-design/article/news/3?name=最新活动&type=news',
        instruct: {
          write: '原创',
          declaration: '作者：',
          author: '胡艳鑫',
          date: '2025年3月25日',
          apply: ''
        },
        img: discuss
      },
      {
        markId: '4', //与markdown文件同名
        title: '2024年OpenTiny年度人气贡献者评选正式开始',
        content: '2024年，OpenTiny持续在前端开源领域扎根，每一位开发者都是推动项目共同前行的宝贵力量。',
        link: '/opentiny-design/article/news/4?name=最新活动&type=news',
        instruct: {
          write: '原创',
          declaration: '作者：',
          author: '胡艳鑫',
          date: '2024年12月25日',
          apply: ''
        },
        img: give
      },
      {
        markId: '5', //与markdown文件同名
        title: '活动回顾|体验技术大会暨OpenTiny技术交流茶话会圆满结束~',
        content:
          '此次活动不仅让社区的开发者们有机会面对面交流技术心得，还见证了TinyEngine低代码引擎2.0与TinyVue组件库新版本发布的相关内容，为社区的发展注入了新的活力。',
        link: '/opentiny-design/article/news/5?name=最新活动&type=news',
        instruct: {
          write: '原创',
          declaration: '作者：',
          author: '胡艳鑫',
          date: '2024年11月5日',
          apply: ''
        },
        img: contact
      },
      {
        markId: '6', //与markdown文件同名
        title: '【OpenTiny调研征集】共创技术未来，分享您的声音！',
        content:
          '随着 OpenTiny 开源项目的不断发展，我们一直致力于为开发者提供高质量的 Web 前端开发解决方案。为了更好地满足用户需求，提升项目的实用性和易用性，我们决定发起一项用户调研活动，诚挚邀请您参与。',
        link: '/opentiny-design/article/news/6?name=最新活动&type=news',
        instruct: {
          write: '原创',
          declaration: '作者：',
          author: '胡艳鑫',
          date: '2025年2月20日',
          apply: ''
        },
        img: voice
      }
    ]
  }

  return { hot, news }
}
