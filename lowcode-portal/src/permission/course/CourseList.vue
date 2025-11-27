<template>
  <div class="course-list">
    <div v-for="item in list" :key="item.id" class="course-list-item">
      <div class="course-list-item-poster">
        <img :src="item.poster">
      </div>
      <div class="course-list-item-content">
        <div class="content-top">
            <h5>{{item.name}}</h5>
            <p class="ellipsis desc">{{item.desc}}</p>
        </div>
        <p>{{item.createTime}}</p>
      </div>
      <div class="course-list-item-options">
        <icon-edit class="tiny-svg-size icon-edit" @click="$emit('editCourse', item)"></icon-edit>
        <icon-del class="tiny-svg-size icon-del" @click="deleteCourse(item)"></icon-del>
      </div>
    </div>
  </div>
</template>

<script>
import { requestDeleteCourse } from '../http'
import { IconDel, IconEdit } from '@opentiny/vue-icon'
import { useModal } from 'lowcode-design-controller'

export default {
  components: {
    IconDel: IconDel(),
    IconEdit: IconEdit()
  },
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  emits: ['editCourse', 'getList'],
  setup(_, { emit }) {
    const { confirm, message } = useModal()

    const deleteCourse = (data) => {
      confirm({
        title: '删除课程',
        status: 'warning',
        message: `你确定删除课程：《${data?.name}》 吗？`,
        exec: () => {
          requestDeleteCourse(data.id)
            .then(() => {
              emit('getList')
              message({
                message: '删除成功',
                status: 'success'
              })
            })
            .catch(err => {
              message({
                message: `删除失败${JSON.stringify(err)}`,
                status: 'error'
              })
            })
        }
      })
    }

    return {
      deleteCourse
    }
  }
}
</script>

<style lang="less" scoped>
.course-list-item{
  padding-bottom: 30px;
  display: grid;
  grid-template-columns: 234px 1fr 46px;
  column-gap: 34px;
  align-items: center;
  margin-top: 40px;
  border-bottom: 1px solid #ECEDF0;
  &-poster{
    width: 234px;
    height: 132px;
    overflow: hidden;
    border-radius: 4px;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &-content{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-self: stretch;
    h5{
      font-size: 18px;
      line-height: 20px;
      color: #24292F;
      margin-bottom: 16px;
      margin-top: 8px;
    }
    .desc{
      margin-top: 0;
      --ellipsis-line: 4;
    }
    p{
      font-size: 12px;
      color: #ADB0B8;
      margin-bottom: 0;
    }
  }
  &-options{
    .icon-edit{
      cursor: pointer;
      &:hover{
        color: #526ECC;
      }
    }
    .icon-del{
      margin-left: 12px;
      cursor: pointer;
      &:hover{
        color: red;
      }
    }
  }
}
.course-list-item + .course-list-item{
  margin-top: 30px;
}
</style>
