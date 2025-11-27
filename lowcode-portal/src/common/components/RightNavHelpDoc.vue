<template>
  <div v-if="showHelpDoc" class="help-documents">
    <div class="help-documents-header">
      <svg-icon class="help-documents-svg" name="view-help"></svg-icon>
      <p class="help-documents-title">帮助文档</p>
    </div>
    <div class="help-documents-content">
      <div v-if="router.currentRoute.value.name === 'applicationSettingBase'">
        <p class="tips-documents-title">Git仓库地址</p>
        <p class="tips-documents-desc">请给所填仓库添加公共账号 xxx，并确保该账号至少具有开发者权限</p>
        <p class="tips-documents-title">默认提交分支</p>
        <p class="tips-documents-desc">请注意默认提交分支不能是受保护分支</p>
      </div>
      <div v-if="router.currentRoute.value.name === 'componentImport'">
        <p class="tips-documents-title">标识成官方组件</p>
        <p class="tips-documents-desc">可以添加图片，链接等，可长可短，描述文字描述文字描述文字描述文字描述</p>
        <p class="tips-documents-title">标识成默认组件</p>
        <p class="tips-documents-desc">
          可以添加图片，链接等，可长可短，描述文字描述文字描述文字描述文字描述可以添加图片，链接等，可长可短，描述文字描述文字描述文字描述文字描述
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const showHelpDoc = ref(false)
    const isShow = ref(false)
    const marginTop = ref('0px')

    watchEffect(() => {
      const routerName = router.currentRoute.value.name

      showHelpDoc.value = ['applicationSettingBase', 'componentImport'].includes(router.currentRoute.value.name)
      marginTop.value = routerName === 'componentImport' ? '50px' : '0px'
    })

    return {
      router,
      showHelpDoc,
      isShow,
      marginTop
    }
  }
}
</script>

<style lang="less" scoped>
.help-documents {
  width: 350px;
  height: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #f5f5f5;
  padding: 30px 58px 30px 30px;
  box-sizing: border-box;
  margin-top: v-bind(marginTop);
  .help-documents-header {
    display: flex;
    align-items: center;
    .help-documents-svg {
      font-size: 24px;
      margin-right: 2px;
      margin-bottom: 2px;
    }
    .help-documents-title {
      font-size: 18px;
      line-height: 20px;
      color: #191919;
      font-weight: bold;
      margin: 0;
    }
  }
  .help-documents-content {
    margin: 16px 0;
    .tips-documents-title {
      font-size: 14px;
      line-height: 18px;
      color: #191919;
      font-weight: bold;
      margin: 0;
      margin-top: 16px;
    }
    .tips-documents-desc {
      font-size: 12px;
      line-height: 18px;
      color: #595959;
      margin: 0;
      margin-top: 16px;
    }
  }
  .help-documents-footer {
    .tips-documents-img {
      width: 260px;
      height: 140px;
      margin: 16px 0;
      position: relative;
      cursor: zoom-in;
      .tips-image {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: 260px;
        height: 140px;
        background-color: rgba(242, 48, 48, 0.11);
        color: #f23030;
        line-height: 140px;
        text-align: center;
        font-size: 18px;
      }
      .tips-img {
        width: 100%;
        height: 100%;
      }
    }
    .tips-bigImg {
      width: 500px;
      height: 400px;
      z-index: 2;
    }
  }
}

:deep(.tiny-dialog-box) {
  height: 70%;
  top: 17vh;
  .tiny-dialog-box__body {
    margin-bottom: 0;
    padding: 0;
    max-height: 70vh;
  }
}
</style>
