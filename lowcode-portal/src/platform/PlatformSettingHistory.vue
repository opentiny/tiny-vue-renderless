<template>
  <div class="platform-setting-history">
    <div class="title">历史记录</div>
    <div class="explain">【{{ state.name }}】设计器的历史变更记录</div>
    <history-backup class="backup" :data="state.data" type="platform" :isShowPreview="false"></history-backup>
  </div>
</template>

<script>
import HistoryBackup from '../common/components/HistoryBackup.vue'
import { onMounted, reactive } from 'vue'
import { useModal } from 'lowcode-design-controller'
import { fetchVersion } from './http'
import { SESSION_STORAGE } from 'lowcode-design-controller/utils'

export default {
  components: {
    HistoryBackup
  },
  setup(props) {
    const { message } = useModal()
    const platformSetting = JSON.parse(sessionStorage.getItem(SESSION_STORAGE.platformSetting))

    const state = reactive({
      name: platformSetting?.name,
      data: []
    })

    const getVersion = (id) => {
      fetchVersion(id)
        .then((data) => {
          state.data = data
        })
        .catch((error) => {
          message({ message: `获取设计器历史版本失败: ${error.message || error}`, status: 'error' })
        })
    }

    onMounted(() => {
      getVersion(platformSetting?.id)
    })

    return {
      state
    }
  }
}
</script>

<style lang="less" scoped>
.platform-setting-history {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 20px 24px;
  .title {
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: Bold;
    color: #252b3a;
    line-height: 24px;
    margin-bottom: 4px;
  }
  .explain {
    padding-right: 50%;
    margin-bottom: 20px;
    color: #808080;
  }
  .backup {
    height: calc(100% - 50px - 50px);
  }
}
</style>
