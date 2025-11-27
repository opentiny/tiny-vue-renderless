<template>
  <ul class="list">
    <li v-for="item in data" :key="item.id" class="list-item" @click="$router.push(`/help-center/course-detail/${item.id}`)">
      <div class="img-wrap">
        <img :src="item.poster" alt="">
      </div>
      <div class="content">
        <div class="content-desc" >
          <h3>{{item.name}}</h3>
          <p>{{item.desc}}</p>
        </div>
        <div class="content-footer">
          <p><img class="tel-logo" src="/img/television.svg" alt=""><span>{{item.videos?.length || 0}}节课</span></p>
          <span v-if="item.progress === 0" class="content-footer-status" :style="{ '--status-color': '#FF9100' }">待学习</span>
          <span v-else-if="item.progress === 100" class="content-footer-status" :style="{ '--status-color': '#ADB0B8' }">已学完</span>
          <span v-else><tiny-progress class="progress" :percentage="item.progress" :showText="false"></tiny-progress>已学习 {{item.progress || ''}}%</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { Progress } from '@opentiny/vue'

export default {
  components: {
    TinyProgress: Progress
  },
  props: {
    data: {
      type: Array,
      default: []
    },
    progress: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="less" scoped>
.list{
  margin-top: 32px;
}
.list-item + .list-item {
  padding-top: 20px;
  border-top: 1px solid #E9EBEE;
}
.list-item{
  display: grid;
  grid-template-columns: 234px 1fr;
  margin-top: 20px;
  cursor: pointer;
  .img-wrap{
    width: 234px;
    height: 132px;
    overflow: hidden;
    &:hover{
      img{
        transform: scale(1.1);
      }
    }
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: .5s all ease;
    }
  }
  .content{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 32px;
    color: #adb0b8;
    .content-desc{
      h3{
        font-size: 18px;
        color: #24292f;
        &:hover{
          color: #5E7CE0;
        }
      }
      p{
        font-size: 13px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .content-footer{
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      align-items: center;
      .tel-logo{
        width: 12px;
        height: 12px;
        margin-right: 4px;
        vertical-align: -2px;
      }
      .content-footer-status{
        position: relative;
        color: var(--status-color, #fff);
        &::before{
          content: '';
          width: 0;
          height: 0;
          border: 4px solid var(--status-color, #fff);
          border-radius: 50%;
          position: absolute;
          left: -10px;
          top: 4px;
        }
      }
    }
  }
}
</style>
