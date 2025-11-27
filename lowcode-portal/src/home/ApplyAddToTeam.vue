<template>
  <div class="apply-member-wrap home-create-main">
    <div class="apply-member-title title-wrap">
      <span class="title">加入组织</span>
      <tiny-alert
        type="info"
        description="选择加入的组织，经管理员审批后，您将成为该组织成员；如没有想加入的组织，您可以申请创建自己的组织。"
      ></tiny-alert>
    </div>
    <div class="team-list">
      <section class="operation">
        <tiny-button @click="openCreateDialog">
          <span class="ml4">创建组织</span>
        </tiny-button>
        <tiny-search
          v-if="state.tenants.length"
          v-model="state.searchValue"
          placeholder="请输入关键字搜索"
          class="search"
          clearable
          @input="searchTenant"
        ></tiny-search>
      </section>
      <div v-if="!state.tenants.length && state.loading" id="loadCard"></div>
      <section class="mt20">
        <common-card-list ref="cardListRef" :data="state.data" height="auto" @selected="getSelected">
          <template v-slot="item">
            <section class="">
              <div class="apply-container">
                <div class="apply-icon"></div>
                <div class="apply-content">
                  <tiny-tooltip class="item" effect="light" :content="item.item.tenant_id" placement="top-start">
                    <span class="title">{{ item.item.tenant_id }}</span>
                  </tiny-tooltip>
                  <tiny-tooltip
                    class="item"
                    effect="light"
                    :content="item.item.description || '该组织的具体描述'"
                    placement="top-start"
                  >
                    <div class="description">{{ item.item.description || '该组织的具体描述' }}</div>
                  </tiny-tooltip>
                  <a v-if="item.item.extra?.[0]" class="contact mt8" :href="getIMContact(item)">
                    <div class="icon"></div>
                    <tiny-tooltip class="item" effect="light" :content="getDisplayed(item)" placement="top-start">
                      <div class="content">
                        <span class="ml4">{{ getDisplayed(item) }}</span>
                      </div>
                    </tiny-tooltip>
                  </a>
                </div>
              </div>
            </section>
          </template>
          <template #pager>
            <tiny-pager
              v-if="state.tenants.length"
              hide-on-single-page
              layout="sizes, total, prev, pager, next"
              :page-sizes="state.pageSizes"
              :page-size="state.pageSize"
              :total="state.searchTenants.length"
              :current-page="state.currentPage"
              @size-change="sizeChange(state, $event)"
              @current-change="currentChange(state, $event)"
            ></tiny-pager>
          </template>
          <template #empty>
            <div v-if="!state.loading" class="team-list-no-group">
              <img class="no-group-img" :src="state.defaultImg" alt="" />
              <div class="no-group-text">
                当前还没有任何组织可以加入<br />
                请<a class="link" @click="openCreateDialog">创建新的组织</a>
              </div>
            </div>
          </template>
        </common-card-list>
      </section>
      <div v-if="state.tenants.length" class="team-list-btn">
        <tiny-button type="primary" @click="addTenant">立即加入</tiny-button>
      </div>
    </div>
    <apply-member
      :showCreateDialog="state.showCreateDialog"
      :all-tenants="state.allTenants"
      @apply="createSuccess"
      @close="cancelApplyMember"
    ></apply-member>
  </div>
</template>

<script>
import { Button, Alert, Pager, Notify, Search, Tooltip, Loading } from '@opentiny/vue'
import { IconSearch, IconPlusCircle } from '@opentiny/vue-icon'
import { reactive, onMounted, ref } from 'vue'
import { user, useModal } from 'lowcode-design-controller'
import { requestApply } from './http'
import { fetchTenant } from '../permission/http'
import CommonCardList from '../common/components/CommonCardList.vue'
import ApplyMember from './ApplyMember'
export default {
  components: {
    TinyButton: Button,
    TinyPager: Pager,
    TinyAlert: Alert,
    TinySearch: Search,
    TinyTooltip: Tooltip,
    CommonCardList: CommonCardList,
    ApplyMember
  },

  emits: ['apply'],
  setup(props, { emit }) {
    const cardListRef = ref()
    const { message } = useModal()
    const getUser = (item) => item.item.extra?.[0].user
    const getDisplayed = (item) => {
      const { username, resetPasswordToken } = getUser(item)

      return `${username} ${resetPasswordToken}`
    }
    const getIMContact = (item) => {
      const { resetPasswordToken } = getUser(item)

      return `im:${resetPasswordToken}`
    }

    const state = reactive({
      allTenants: [],
      tenants: [],
      searchTenants: [],
      searchValue: '',
      tenant: null,
      defaultImg: `${import.meta.env.BASE_URL}img/default.png`,
      showCreateDialog: false,
      pageSizes: [10, 20, 30, 40],
      currentPage: 1,
      pageSize: 20,
      data: [],
      loading: true
    })

    const addTenant = () => {
      if (!state.tenant) {
        message({
          message: '请选择组织',
          status: 'warning'
        })

        return
      }

      const params = {
        action: 'joinTenant',
        status: 0,
        tenant_id: state.tenant.tenant_id
      }

      const messagePeopleInfo = state.tenant.extra?.length
        ? `【${state.tenant.extra[0]?.user.username}${state.tenant.extra[0]?.user.resetPasswordToken}】`
        : ''

      const messageNotice = `您加入【${state.tenant.tenant_id}】的申请已提交，请联系管理员${messagePeopleInfo}审批。`

      const errorCode = 'CM003'

      requestApply(params)
        .then(() => {
          Notify({
            type: 'success',
            message: messageNotice,
            position: 'top-right'
          })
        })
        .catch((error) => {
          if (error.code === errorCode) {
            message({
              message: '申请失败: 您已加入该组织，无法重复添加',
              status: 'info'
            })
          } else {
            message({
              message: `申请失败: ${error.message || error}`,
              status: 'info'
            })
          }
        })
    }

    const getTenants = () => {
      fetchTenant({
        add_admin_info: 1
      })
        .then((data) => {
          state.loading = false
          state.allTenants = data
          state.tenants = data.filter((item) =>
            user.current.tenants.every((tenant) => item.tenant_id !== tenant.tenant_id)
          )
          state.searchTenants = state.tenants
          currentChange(state, state.currentPage)
        })
        .catch((error) => {
          state.loading = false
          message({
            message: `获取组织列表失败: ${error.message || error}`,
            status: 'error'
          })
        })
    }

    const setTenant = (item) => {
      state.tenant = item
      state.searchTenants.forEach((item) => {
        item.selected = state.tenant.id === item.id
      })
    }

    const searchTenant = () => {
      state.searchTenants = state.tenants.filter(
        (item) => item.tenant_id.toLowerCase().indexOf(state.searchValue.toLowerCase().trim()) > -1
      )
      currentChange(state, state.currentPage)
    }

    const openCreateDialog = () => {
      state.showCreateDialog = true
    }

    const sizeChange = (state, size) => {
      state.pageSize = size
      const data = state.searchTenants.slice(
        (state.currentPage - 1) * state.pageSize,
        state.currentPage * state.pageSize
      )

      state.data = data
    }

    const currentChange = (state, current) => {
      state.currentPage = current
      const data = state.searchTenants.slice(
        (state.currentPage - 1) * state.pageSize,
        state.currentPage * state.pageSize
      )

      state.data = data
    }

    const getSelected = (value) => {
      state.tenant = value
    }

    const cancelApplyMember = () => {
      state.showCreateDialog = false
    }

    const createSuccess = () => {
      state.showCreateDialog = false
      Notify({
        type: 'success',
        message: '您的信息已提交，稍后会有工作人员与您联系',
        position: 'top-right'
      })
    }

    onMounted(() => {
      getTenants()
      Loading.service({
        text: '加载中',
        target: document.getElementById('loadCard')
      })
    })

    return {
      state,
      addTenant,
      setTenant,
      searchTenant,
      openCreateDialog,
      IconSearch: IconSearch(),
      IconPlusCircle: IconPlusCircle(),
      sizeChange,
      currentChange,
      cardListRef,
      getSelected,
      cancelApplyMember,
      createSuccess,
      getDisplayed,
      getIMContact
    }
  }
}
</script>
<style lang="less" scoped>
.apply-member-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.team-list {
  margin-top: 10px;
  height: 100%;
  overflow-y: auto;
  .operation {
    display: flex;
    justify-content: space-between;
  }

  :deep(.tiny-button--default) {
    width: 120px;
    margin-right: 10px;
  }

  .search {
    width: 92%;
  }

  .apply-container {
    display: flex;
    align-items: center;
    height: 118px;

    .apply-icon {
      background: url('@/svgs/assets/apply.svg') no-repeat;
      width: 48px;
      height: 48px;
      margin: 16px 0 15px 20px;
      flex: 0 0 37px;
    }

    .apply-content {
      margin: 12px 16px;
      flex: 1;
      overflow: auto;
      height: 80px;

      .title {
        font-size: 20px;
        font-weight: bold;
        font-family: Microsoft YaHei;
        line-height: 24px;
        width: 100%;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .description {
        font-size: 12px;
        font-family: Microsoft YaHei;
        color: #808080;
        margin-top: 8px;
        width: 100%;
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .contact {
        font-size: 12px;
        display: flex;
        align-items: center;
        color: #808080;
        margin-top: 8px;

        &:hover {
          color: var(--ti-common-color-icon-graybg-hover);
        }

        .icon {
          width: 12px;
          height: 12px;
          background: url('@/svgs/assets/admin.svg') no-repeat;
        }

        .content {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 0;
        }
      }
    }
  }

  .team-list-title {
    font-size: 16px;
    line-height: 22px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .team-list-box {
    height: 100%;
    width: 100%;

    .team-list-group {
      height: 82%;
      overflow: auto;
      margin-top: 16px;
    }
  }

  .team-list-btn {
    height: 50px;
    line-height: 50px;
    margin-top: 10px;
  }

  .team-list-no-group {
    height: 90%;
    width: 100%;
    text-align: center;
    padding-top: 100px;

    .no-group-img {
      width: 80px;
      height: 80px;
    }

    .no-group-text {
      box-sizing: border-box;
      margin-top: 10px;
      height: 70px;
      width: 100%;
      padding: 0 20px;
      line-height: 26px;
      color: #333;
    }
  }

  .team-list-item {
    display: flex;
    align-items: center;
    height: 118px;
    border-radius: 6px;
    background-color: #fff;
    cursor: pointer;
    padding: 8px 12px;
    box-sizing: border-box;

    &.active {
      color: #5e7ce0;
      background: rgba(24, 144, 255, 0.06);
    }
  }

  .team-list-item-logo {
    height: 28px;
    width: 28px;
    border-radius: 8px;
    font-size: 16px;
    background: #5e7ce0;
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;

    .team-icon {
      color: #fff !important;
    }
  }

  .team-list-item-name {
    height: 22px;
    font-size: 14px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.8);
    flex: 1;
    margin-right: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &.active {
      color: #5e7ce0;
    }
  }

  .team-list-item-icon {
    font-size: 20px;
    color: #38acff;
  }
}

.ml4 {
  margin-left: var(--ti-common-space-base);
}

.mt8 {
  margin-top: var(--ti-common-space-2x);
}

.mt20 {
  margin-top: var(--ti-common-space-5x);
}

.link {
  cursor: pointer;
  color: var(--ti-common-color-text-link);
}
#loadCard {
  height: 500px;
}
</style>
