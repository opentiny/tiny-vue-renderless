<template>
  <div v-if="visible" class="video-modal-overlay" @click="closeModal">
    <div class="video-modal-container" @click.stop>
      <div class="video-modal-content" ref="modalContent">
        <!-- 这里将显示传入的video元素 -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onUnmounted } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  videoElement: {
    type: Object,
    default: null
  },
  title: {
    type: String,
    default: '视频播放'
  }
})

const emit = defineEmits(['update:visible', 'close'])

const modalContent = ref(null)
const originalParent = ref(null)
const originalNextSibling = ref(null)
const originalStyles = ref({})

const closeModal = () => {
  // 将video元素移回原位置
  moveVideoBack()
  emit('update:visible', false)
  emit('close')
}

// 将video元素移动到弹窗中
const moveVideoToModal = () => {
  if (props.videoElement && modalContent.value) {
    // 保存原始位置信息
    originalParent.value = props.videoElement.parentNode
    originalNextSibling.value = props.videoElement.nextSibling

    // 保存原始样式
    originalStyles.value = {
      width: props.videoElement.style.width,
      height: props.videoElement.style.height,
      position: props.videoElement.style.position,
      zIndex: props.videoElement.style.zIndex
    }

    // 设置弹窗样式
    props.videoElement.style.width = '100%'
    props.videoElement.style.height = 'auto'
    props.videoElement.style.position = 'static'
    props.videoElement.style.zIndex = 'auto'
    props.videoElement.classList.add('modal-video')

    // 移动到弹窗容器
    modalContent.value.appendChild(props.videoElement)
  }
}

// 将video元素移回原位置
const moveVideoBack = () => {
  if (props.videoElement && originalParent.value) {
    // 恢复原始样式
    Object.keys(originalStyles.value).forEach(key => {
      props.videoElement.style[key] = originalStyles.value[key]
    })

    // 移除弹窗样式类
    props.videoElement.classList.remove('modal-video')

    // 移回原位置
    if (originalNextSibling.value) {
      originalParent.value.insertBefore(props.videoElement, originalNextSibling.value)
    } else {
      originalParent.value.appendChild(props.videoElement)
    }
  }
}

// 监听弹窗显示状态
watch(() => props.visible, async (newVal) => {
  if (newVal) {
    await nextTick()
    moveVideoToModal()
  } else {
    moveVideoBack()
  }
})

// 组件卸载时确保video元素回到原位置
onUnmounted(() => {
  moveVideoBack()
})
</script>

<style scoped>
.video-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.video-modal-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  max-width: 90vw;
  max-height: 90vh;
  width: 900px;
  min-height: 500px;
  overflow: hidden;
  animation: modalSlideIn 0.3s ease-out;
  display: flex;
  flex-direction: column;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(-50px);
  }

  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.video-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.video-modal-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: #6b7280;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
}

.close-btn:hover {
  background-color: #e5e7eb;
  color: #374151;
}

.video-modal-content {
  padding: 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  background: #000;
}

.modal-video {
  width: 100%;
  height: auto;
  max-height: 100%;
  max-width: 100%;
  display: block;
  background: #000;
  object-fit: contain;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .video-modal-container {
    width: 95vw;
    margin: 20px;
    min-height: 300px;
  }

  .video-modal-header {
    padding: 16px 20px;
  }

  .video-modal-header h3 {
    font-size: 16px;
  }

  .video-modal-content {
    min-height: 250px;
    max-height: 60vh;
  }
}
</style>
