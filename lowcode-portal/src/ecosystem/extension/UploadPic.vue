<template>
  <div class="content">
    <tiny-file-upload
      ref="pictureUploadRef"
      v-model="imgData.image"
      :action="action"
      :limit="limit"
      class="upload-demo picture-demo"
      list-type="picture-card"
      :auto-upload="false"
      @exceed="handleExceed"
      @change="handleChange"
    >
      <template #default>
        <IconPlus class="upload-svg-icon" />
      </template>
      <template #file="{ file }">
        <div>
          <img class="tiny-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="tiny-upload-list__item-actions">
            <span v-if="!disabled" class="tiny-upload-list__item-delete" @click="removePicture(file)">
              <IconDel class="upload-svg-icon" />
            </span>
          </span>
        </div>
      </template>
    </tiny-file-upload>
    <tiny-dialog-box v-model:visible="dialogVisible" width="40%">
      <img style="width: 90%" :src="dialogImageUrl" alt="" />
    </tiny-dialog-box>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import { FileUpload, Modal } from '@opentiny/vue'
import { IconPlus, IconDel } from '@opentiny/vue-icon'

export default {
  components: {
    TinyFileUpload: FileUpload,
    IconPlus: IconPlus(),
    IconDel: IconDel()
  },
  emits: ['change'],
  setup(props, { emit }) {
    const action = ref('http://localhost:3000/api/upload')
    const dialogVisible = ref(false)
    const dialogImageUrl = ref('')
    const disabled = ref(false)
    const pictureUploadRef = ref()
    const limit = ref(1)

    const imgData = reactive({
      image: '',
      image_name: ''
    })

    const handleExceed = () => {
      Modal.message({ message: `上传文件个数不能超过${limit.value}个`, status: 'warning' })
    }

    const handleChange = async (file, fileList) => {
      imgData.image_name = file.name
      const baseFile = file.raw

      imgData.image = await fileToBase64(baseFile)
      emit('change', imgData)
    }

    const fileToBase64 = (baseFile) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.readAsDataURL(baseFile)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    }

    const removePicture = (file) => {
      pictureUploadRef.value.handleRemove(file)
    }

    return {
      imgData,
      removePicture,
      action,
      dialogVisible,
      dialogImageUrl,
      disabled,
      pictureUploadRef,
      limit,
      handleExceed,
      fileToBase64,
      handleChange
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  height: 84px;
}
.upload-svg-icon {
  font-size: 28px;
  margin-bottom: 64px;
}
:deep(.tiny-upload-list--picture-card .tiny-upload-list__item) {
  width: 84px;
  height: 84px;
  margin: 0 8px 0 0;
  .tiny-svg {
    width: 18px;
    height: 18px;
    margin-top: 30px;
  }
}
:deep(.tiny-upload--picture-card) {
  width: 84px;
  height: 84px;
}
</style>
<style lang="less">
.v-modal {
  z-index: 2000 !important;
}
</style>
