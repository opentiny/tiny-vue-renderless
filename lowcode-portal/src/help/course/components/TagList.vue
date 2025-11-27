<template>
  <ul class="tags-list">
    <li v-for="item in data" :key="item.id" :class="['tag-item', { 'active': activeTags.includes(item.value) }]" @click="$emit('selectTag', item.value)">
      <span class="tag-title">{{item.label}}</span>
      <span class="tag-desc">{{item.lesson}}节课</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    activeTags: {
      type: Array,
      default: []
    }
  },
  emits: ['selectTag']
}
</script>

<style lang="less" scoped>
.tags-list{
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.tag-item{
  border-radius: 4px;
  background-color: #EBEFFB;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &.active{
    background-color: #5e7ce0;
    .tag-title,.tag-desc{
      color: #fff;
    }
  }
  .tag-title{
    font-size: 16px;
    color: #252b3a;
  }
  .tag-desc{
    font-size: 12px;
    color: #8a8b99;
    margin-left: 22px;
  }
}
@media only screen and (max-width: 1550px) {
  .tag-item{
    padding: 12px 6px;
    .tag-title{
      font-size: 14px;
    }
    .tag-desc{
      margin-left: 10px;
    }
  }
}
</style>
