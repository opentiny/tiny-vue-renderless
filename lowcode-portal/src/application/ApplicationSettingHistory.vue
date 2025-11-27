<template>
  <div class="application-setting-history">
    <div class="title">历史记录</div>
    <div class="explain">【{{ state.name }}】应用的历史变更记录</div>
    <history-backup class="backup" :data="state.data" type="app" preivewMessage="应用未发布"></history-backup>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { user, useModal } from 'lowcode-design-controller'
import HistoryBackup from '../common/components/HistoryBackup.vue'
import { fetchApplicationVersion } from './http'
import { SESSION_STORAGE } from 'lowcode-design-controller/utils'

export default {
  components: {
    HistoryBackup
  },
  setup() {
    const { message } = useModal()
    const appSetting = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.appSetting))

    const state = reactive({
      name: appSetting?.name,
      data: []
    })

    const getVersion = (id) => {
      fetchApplicationVersion(id)
        .then((data) => {
          data.forEach((item) => {
            item.url = appSetting.editor_url
              ? `${appSetting.editor_url}&tenant=${user.current.tenant?.id}&version=${item.version}`
              : ''
          })

          state.data = data
        })
        .catch((error) => {
          message({ message: `获取应用历史版本失败: ${error.message || error}`, status: 'error' })
        })
    }

    onMounted(() => {
      getVersion(appSetting?.id)
    })

    return {
      state
    }
  }
}
</script>

<style lang="less" scoped>
.application-setting-history {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 20px 24px;
  border-radius: 8px;
  .title {
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: Bold;
    color: #191919;
    line-height: 24px;
    margin-bottom: 4px;
  }
  .explain {
    padding-right: 50%;
    margin-bottom: 24px;
    color: #808080;
    font-size: 12px;
  }
  .backup {
    height: calc(100% - 50px - 50px);
  }
}
</style>
