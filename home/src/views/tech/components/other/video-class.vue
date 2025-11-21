<template>
  <div class="tech-homepage-video-content">
    <div class="tech-homepage-video-content-item" v-for="(item, key) in props.data" :key="key">
      <project
        :card-container="'tech-homepage-video-card'"
        :card-other="'tech-homepage-video-card-img'"
        :card-title="'tech-homepage-video-card-title'"
        :card-content="'tech-homepage-video-card-content'"
      >
        <template #card-other>
          <a :href="item.link" target="_blank" rel="noopener noreferrer">
            <img :src="item.img" />
          </a>
        </template>
        <template #card-title>
          <p :title="item.title">
            <a :href="item.link" target="_blank" rel="noopener noreferrer">{{ item.title }}</a>
          </p>
        </template>
        <template #card-content>
          <div class="tech-homepage-video-card-item">
            <div class="tech-homepage-video-card-item-content">
              <a :href="item.link" target="_blank" rel="noopener noreferrer">{{ item.desc['info'] }}</a>
            </div>
            <div class="tech-homepage-video-card-item-desc">
              <div class="tech-homepage-video-card-item-name">
                <div>{{ item.desc['name'] }}</div>
                <div class="tech-homepage-video-card-item-tag">{{ item.desc['tag'] }}</div>
                <div>{{ item.desc['other'] }}</div>
              </div>
              <div>{{ item.desc['date'] }}</div>
            </div>
          </div>
        </template>
      </project>
    </div>
  </div>
</template>
<script setup lang="ts">
import project from '../common/project.vue'
import { MyType } from '../ts/desc'

const props = defineProps({
  data: {
    type: Array<MyType>,
    default: []
  }
})
</script>
