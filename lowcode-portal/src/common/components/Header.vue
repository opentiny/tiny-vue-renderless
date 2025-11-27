<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="header-wrap">
    <div class="nav-left">
      <div v-if="!isInternalEnv()" class="opentiny-header">
        <a class="nav-logo" href="https://opentiny.design" title="OpenTiny">
          <img src="../../assets/main-logo.svg" class="header-logo" />
        </a>
        <div class="divider"></div>
      </div>
      <div :class="['logo-wrap', { 'logo-wrap-right': isInternalEnv() }]" @click="openHomePage">
        <img :src="logoUrl" class="open-logo-svg" alt="" />
        <h3>TinyEngine</h3>
      </div>
    </div>

    <header-menu class="header-menu" :menuData="headMenuList" @click="state.iconActive = false"></header-menu>
    <div class="toolbars">
      <div class="team-list-btn">
        <tiny-button @click="toApplyPage">加入组织</tiny-button>
      </div>

      <span
        v-if="!isNoTenant() && !isGuest()"
        :class="{ 'toolbars-item': true, active: $route.path?.indexOf('/permission-setting') > -1 }"
        @click="openPermission"
      >
        <tiny-tooltip effect="dark" content="设置中心" placement="top">
          <img src="../../assets/setting.svg" style="width: 20px" alt="" />
        </tiny-tooltip>
      </span>
      <span class="toolbars-item">
        <tiny-tooltip effect="dark" content="更新日志" placement="top">
          <router-link to="/help-center/changelog">
            <img src="../../assets/update.svg" style="width: 20px" alt="" />
          </router-link>
        </tiny-tooltip>
      </span>
      <span class="toolbars-item">
        <a :href="state.githubLink" target="_blank"><svg-icon class="git-hub" name="git-hub"></svg-icon></a>
      </span>
      <span class="split">|</span>
      <tiny-popover
        v-if="tenants?.length"
        placement="bottom-end"
        width="300"
        popper-class="team-list-pop"
        append-to-body
        :visible-arrow="false"
      >
        <template #reference>
          <span id="currentTenant" class="toolbars-item tenant">
            <span>{{ state.tenant?.tenant_id || '选择组织' }}</span>
            <icon-triangle-down class="team-select-down"></icon-triangle-down>
          </span>
        </template>
        <div class="team-list">
          <h3 class="team-list-title">选择组织</h3>
          <div v-if="tenants?.length">
            <ul class="team-list-group">
              <li
                v-for="item in tenants"
                :key="item.id"
                :class="['team-list-item', { active: item.id === state.tenant?.id }]"
                @click="changeTenant(item)"
              >
                <span class="team-list-item-logo">
                  <img src="../../assets/team.png" alt="team" />
                </span>
                <span :class="['team-list-item-name', { active: item.id === state.tenant?.id }]">{{
                  item.tenant_id
                }}</span>
              </li>
            </ul>
          </div>
          <div v-else class="team-list-no-group">
            <img class="no-group-img" :src="state.defaultImg" alt="" />
            <div class="no-group-text">
              当前您不在任何组织，<br />
              申请加入组织，体验更多功能；
            </div>
            <tiny-button type="primary" size="large" @click="toApplyPage">申请加入</tiny-button>
          </div>
        </div>
      </tiny-popover>

      <tiny-popover
        ref="personalRef"
        v-model="state.showPersonalCenterPop"
        placement="bottom-end"
        width="110"
        trigger="click"
        append-to-body
        :visible-arrow="false"
        popper-class="popItemClass"
      >
        <template #reference>
          <img id="personal" :src="state.userAvatar" class="user-avatar" @click="showPersonalCenterPop" />
        </template>
        <section class="pop-up">
          <div class="popItem" @click="toPersonalCenter">个人中心</div>
          <a v-if="isInternalEnv()" class="popItem" href="javascript:void(0);" @click="logout">退出</a>
        </section>
      </tiny-popover>
    </div>
    <div class="toolbars-mobile">
      <tiny-popover
        ref="personalRef"
        v-model="state.showPersonalCenterPop"
        placement="bottom-end"
        width="110"
        trigger="click"
        append-to-body
        :visible-arrow="false"
        popper-class="popItemClass"
      >
        <template #reference>
          <img id="personal" :src="state.userAvatar" class="user-avatar" @click="showPersonalCenterPop" />
        </template>
        <section class="pop-up">
          <div class="popItem" @click="toPersonalCenter">个人中心</div>
          <a v-if="isInternalEnv()" class="popItem" href="javascript:void(0);" @click="logout">退出</a>
        </section>
      </tiny-popover>
      <a :href="state.githubLink" target="_blank"><svg-icon class="git-hub" name="git-hub"></svg-icon></a>
      <tiny-popover
        ref="menuRef"
        v-model="state.showMenuCenterPop"
        placement="bottom-end"
        width="110"
        trigger="click"
        append-to-body
        :visible-arrow="false"
        popper-class="popItemClass"
      >
        <template #reference>
          <icon-editor-list class="icon-editor-list" @click="state.showMenuCenterPop = true" />
        </template>
        <section class="pop-up">
          <div v-for="item in menuData" :key="item.title" class="popItem">
            <div @click="toMenu(item)">{{ item.title }}</div>
          </div>
        </section>
      </tiny-popover>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { Popover, Tooltip, Button } from '@opentiny/vue'
import { LOCAL_STORAGE } from 'lowcode-design-controller/utils'
import { useRoute, useRouter } from 'vue-router'
import { user, isAdmin, isNoTenant, isGuest, headMenuList } from 'lowcode-design-controller'
import { IconTriangleDown, IconEditorList } from '@opentiny/vue-icon'
import { isInternalEnv } from '@/utils/env'
import HeaderMenu from './HeaderMenu.vue'

export default {
  components: {
    TinyPopover: Popover,
    TinyTooltip: Tooltip,
    TinyButton: Button,
    IconTriangleDown: IconTriangleDown(),
    IconEditorList: IconEditorList(),
    HeaderMenu
  },
  setup(props) {
    const personalRef = ref(null)
    const menuRef = ref(null)
    const route = useRoute()
    const router = useRouter()
    const guestGroup = 'guestGroup'
    const logoUrl = `${import.meta.env.BASE_URL}img/TinyEngine.svg`
    const otherData = [
      {
        title: '加入组织',
        link: '/home/Apply'
      },
      {
        title: '设置中心',
        link: isAdmin() ? '/permission-setting' : '/permission-setting/member-list'
      },
      {
        title: '更新日志',
        link: '/help-center/changelog'
      }
    ]

    const state = reactive({
      iconActive: false,
      defaultImg: `${import.meta.env.BASE_URL}img/default.png`,
      tenant: {},
      visible: true,
      showPersonalCenterPop: true,
      showMenuCenterPop: true,
      userAvatar: '',
      githubLink: 'https://github.com/opentiny/tiny-engine'
    })

    const isHome = computed(() => route.name === 'teamHome')

    const tenants = computed(() => {
      if (user.current.tenants?.length === 1 && user.current.tenants[0].tenant_id === guestGroup) {
        return []
      }

      let newTenants = user.current.tenants?.filter((item) => item && item.tenant_id !== guestGroup)

      if (newTenants) {
        newTenants = Array.from(new Map(newTenants.map((obj) => [obj.tenant_id, obj])), (item) => item[1])
      }

      return newTenants
    })

    const menuData = computed(() => {
      const newData = [...headMenuList.value, ...otherData]

      return newData
    })

    state.tenant = computed(
      () =>
        user.current?.tenants?.find(
          (item) => item.id === Number(user.current?.tenant?.id) && item.tenant_id !== guestGroup
        ) || {}
    )

    if (isInternalEnv()) {
      state.userAvatar = `https://opentiny.design/${user.current?.w3?.sn}/120`
    } else {
      state.userAvatar = import.meta.env.BASE_URL + 'img/default-user-avatar.jpg'
    }

    const openPermission = () => {
      state.iconActive = true
      isAdmin() ? router.push('/permission-setting') : router.push('/permission-setting/member-list')
    }

    const changeTenant = (item) => {
      user.current.tenant = item
      localStorage.setItem(LOCAL_STORAGE.tenant, JSON.stringify(item))
      router.go(0)
    }

    const openHomePage = () => {
      router.push('/home')
    }

    const toApplyPage = () => {
      router.push('/home/Apply')
    }

    const showPersonalCenterPop = () => {
      state.showPersonalCenterPop = true
    }

    const toPersonalCenter = () => {
      router.push('/personal-center')
      state.showPersonalCenterPop = false
      personalRef.value.state.showPopper = false
    }

    const toMenu = (item) => {
      router.push(item.link)
      state.showMenuCenterPop = false
      menuRef.value.state.showPopper = false
    }

    const logout = () => {
      window.location.href = '/platform-center/api/logout'
      localStorage.setItem(LOCAL_STORAGE.tenant, null)
    }

    return {
      logoUrl,
      user,
      headMenuList,
      tenants,
      state,
      isAdmin,
      isNoTenant,
      isGuest,
      isHome,
      personalRef,
      menuRef,
      menuData,
      openPermission,
      changeTenant,
      openHomePage,
      toApplyPage,
      showPersonalCenterPop,
      toPersonalCenter,
      logout,
      isInternalEnv,
      toMenu
    }
  }
}
</script>

<style lang="less" scoped>
.header-wrap {
  height: 56px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  justify-content: space-between;
  .nav-left,
  .opentiny-header,
  .nav-logo {
    display: flex;
    align-items: center;
  }
  .header-logo {
    margin-left: 32px;
  }
  .header-name {
    line-height: 32px;
    font-size: 22px;
    font-weight: 700;
    color: #272727;
    margin-left: 12px;
    vertical-align: middle;
    letter-spacing: 0.55px;
  }
  .divider {
    width: 1px;
    height: 18px;
    background: #7b7e84;
    opacity: 0.3;
    margin: 0 20px;
    margin-top: 1px;
  }
  .logo-wrap {
    display: flex;
    align-items: center;
    margin-left: 16px;
    cursor: pointer;
    h3 {
      margin: 4px 0 0 -2px;
    }
    .svg-icon {
      font-size: 40px;
    }
    .open-logo-svg {
      height: 26px;
      width: 36px;
      margin-top: 3px;
      margin-right: 14px;
    }
  }

  .logo-wrap-right {
    margin-right: 200px;
  }

  .toolbars {
    display: flex;
    align-items: center;
    margin-right: 24px;

    .toolbars-item {
      position: relative;
      padding: 6px;
      border-radius: 6px;
      &:hover {
        cursor: pointer;
        background-color: #f1f2f3;
      }
      &.active {
        background-color: #e5e6e8;
      }
      :deep(.breath-tip) {
        left: 3px;
      }
      :deep(.breath-tip-content) {
        width: 300px;
        left: -150px;
        top: 48px;
      }
      :deep(.breath-tip-triangle) {
        left: 10px;
        top: 42px;
      }
      .icon-update-log {
        font-size: 24px;
        color: #878f95;
      }
      .git-hub {
        width: 20px;
        height: 20px;
        padding-bottom: 4px;
      }
    }
    .tenant {
      display: flex;
      align-items: center;
    }
    .team-select-down {
      margin-left: 4px;
    }
    .split {
      margin: 0 14px;
      font-size: 16px;
      color: #e5e6e8;
    }
    .tiny-svg {
      color: #878f95;
      font-size: 20px;
      outline: none;
    }

    .icon-down {
      font-size: 10px;
      margin-left: 4px;
    }

    .tiny-user-head {
      margin-left: 8px;
    }
  }
}

@media screen and (min-width: 1024px) {
  .toolbars-mobile {
    display: none;
  }
}

@media screen and (max-width: 1023px) {
  .header-wrap {
    .header-menu,
    .toolbars {
      display: none;
    }

    .logo-wrap-right {
      margin-right: 0;
    }
    .toolbars-mobile {
      display: flex;
      margin-top: 4px;
      align-items: center;
      .git-hub,
      .icon-editor-list {
        width: 24px;
        height: 24px;
        margin-left: 16px;
      }
      .icon-editor-list {
        margin: 0 16px;
      }

      #personal {
        margin-top: 6px;
      }
      :deep(.tiny-nav-menu) {
        background-color: #fff;
        padding: 0;
      }
      :deep(.tiny-nav-menu > .more-button) {
        fill: #000;
        margin-right: 10px;
        .tiny-svg {
          width: 20px;
          height: 20px;
        }
      }
      :deep(.tiny-nav-menu > .more-button:hover) {
        background-color: #fff;
      }
      :deep(.tiny-nav-menu > .popmenu > .more-menu) {
        border-right: none;
      }
      :deep(.tiny-nav-menu > .popmenu) {
        border: none;
        width: 240px;
        left: -200px !important;
      }
    }
  }
}
</style>

<style lang="less">
.team-list-pop {
  .team-list {
    .team-list-title {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      padding-left: 20px;
      margin: 8px 0px 12px;
      color: #191919;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    }

    .team-list-group {
      height: auto;
      max-height: 240px;
      overflow: auto;
    }

    .team-list-no-group {
      height: 220px;
      width: 100%;
      text-align: center;
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
      height: 48px;
      background-color: #fff;
      cursor: pointer;
      padding: 12px 20px;
      box-sizing: border-box;

      &.active {
        background: rgba(0, 0, 0, 0.05);
      }

      &:hover {
        background: #f5f5f5;
      }
    }

    .team-list-item-logo img {
      height: 24px;
      width: 24px;
      border-radius: 8px;
      font-size: 16px;
      margin-right: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .team-list-item-name {
      height: 22px;
      font-size: 16px;
      line-height: 20px;
      color: #191919;
      flex: 1;
      margin-right: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-family: Microsoft YaHei, Microsoft YaHei-Normal;
      &.active {
        font-size: 16px;
        font-weight: 600;
        color: #191919;
      }
    }

    .team-list-item-icon {
      font-size: 20px;
      color: #38acff;
    }
  }
}

.team-list-btn {
  margin-right: 6px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-left: 12px;
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 8px 8px 12px;
  .tiny-user-head {
    margin-right: 8px;
  }
  .user-info-name {
    flex: 1;
    overflow: hidden;
    font-size: 16px;
    color: #171a1d;
    line-height: 24px;
    font-weight: 500;
  }
}

.pop-up {
  display: flex;
  flex-direction: column;
}
.popItem {
  padding: 10px;
  cursor: pointer;
}

.popItemClass {
  padding: 0;
  .popItem {
    &:hover {
      background: #f2f5fc;
      color: #526ecc;
    }
  }
}

.tiny-popover.tiny-popper {
  padding: 10px 0;
}
</style>
