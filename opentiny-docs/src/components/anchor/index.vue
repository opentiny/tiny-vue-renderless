<template>
  <div class="anchor-point">
    <ul>
      <li
        v-for="(item, index) in navList"
        :key="index"
        :class="heightTitle === index ? 'line' : ''"
      >
        <a
          :href="`#${item.id}`"
          :title="item.innerText"
          @click="handleClick(item, index)"
          >{{ item.innerText }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, watch, inject, nextTick } from 'vue';
  import { useRoute } from 'vue-router';

  let titleList = document.querySelectorAll('h1,h2,h3');
  let navList = ref(Array.from(titleList) as any);
  let heightTitle = ref(0);

  // 点击hover
  const handleClick = (item: any, index: any) => {
    // 点击锁定高亮
    heightTitle.value = index;
  };
  // 滚动高亮
  let scroll = ref();
  onMounted(async () => {
    window?.addEventListener('scroll', () => {
      // 获取当前页面的滚动高度
      scroll.value = document.documentElement.scrollTop;

      // 获取标题元素相对页面顶部的偏移高度
      let list = navList.value.map(
        (i: { getBoundingClientRect: () => any }) => {
          return {
            top: i.getBoundingClientRect().top + scroll.value,
          };
        }
      );
      // 遍历高度，如果当前页面的滚动高度 小于某一标题元素 距离顶部高度 + 页面滚动高度 + 当前标题元素高度
      // 则为目标标题元素
      for (let i = 0; i < list.length; i += 1) {
        if (scroll.value < list[i].top) {
          heightTitle.value = i;
          return heightTitle.value;
        }
      }
      return 0;
    });
  });

  let url = useRoute();
  watch(
    url,
    (newValue, oldValue) => {
      nextTick(() => {
        let test = document.querySelectorAll('h1,h2,h3');
        navList.value = Array.from(test) as any;
      });
    },
    { immediate: true }
  );
  const currentTitle = ref('' as any);
  currentTitle.value = inject('currentTitle');
  watch(
    currentTitle,
    (newValue) => {
      setTimeout(() => {
        const currentEle = navList.value.find((item: any, index: any) => {
          item.id === newValue
            ? (heightTitle.value = index)
            : (heightTitle.value = 0);
        });
      });
    },
    { immediate: true }
  );
</script>

<style scoped lang="less">
  .anchor-point {
    max-height: calc(100vh - 200px);
    padding-top: 2px;
    overflow-y: auto;
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
  }

  .anchor-point::-webkit-scrollbar {
    width: 6px;
    height: 1px;
  }

  .anchor-point:hover::-webkit-scrollbar-thumb {
    background-color: #adb0b8;
    border-radius: 10px;
    box-shadow: inset 0 0 5px #0004;
  }

  .anchor-point:hover ::-webkit-scrollbar-track {
    background-color: #adb0b8;
    border-radius: 10px;
    box-shadow: inset 0 0 5px #0004;
  }

  ul {
    margin: 0 5%;
    padding: 0;
    list-style: none;
    border-left: 1px #dfe1e6 solid;
    cursor: pointer;
  }

  ul li {
    position: relative;
    margin-bottom: 4px;
    font-size: 12px;

    a {
      position: relative;
      left: -1px;
      display: block;
      padding-left: 16px;
      overflow: hidden;
      color: rgba(0, 0, 0, 0.6);
      line-height: 20px;
      white-space: nowrap;
      text-decoration: none;
      text-overflow: ellipsis;
      border-left: 1px #dfe1e6 solid;

      &:hover,
      &:active,
      &:focus,
      &:target {
        color: #5e7ce0;
      }
    }

    &:hover {
      a {
        color: #5e7ce0;
      }
    }

    &.line {
      a {
        color: #5e7ce0;
        border-color: #5e7ce0;
      }
    }
  }
</style>
