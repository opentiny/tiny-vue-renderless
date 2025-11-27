<template>
  <div class="personal-center">
    <div class="user-header">
      <div class="user-img" style="bac">
        <img :src="avatar" alt="" />
      </div>
    </div>

    <div class="user-information">
      <div class="title">基本信息</div>
      <ul>
        <li>
          <div class="label">账号</div>
          <div class="content">{{ user.current.resetPasswordToken }}</div>
        </li>
        <li>
          <div class="label">姓名</div>
          <div class="content">{{ user.current.username }}</div>
        </li>
        <li>
          <div class="label">当前所属组织</div>
          <div class="content">{{ tenant?.tenant_id }}</div>
        </li>
        <li>
          <div class="label">邮箱</div>
          <div class="content">{{ user.current.email }}</div>
        </li>
        <li>
          <div class="label">角色</div>
          <div class="content">
            <div v-if="user.current.resetPasswordToken === 'developer'">开发者</div>
            <div v-if="user.current.is_admin">超级管理员</div>
            <div v-for="item in auths" :key="item.id">
              {{ `${typeMatch[item.unit?.type]} ${item.unit?.name} 的 ${item.role?.description}` }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { user } from 'lowcode-design-controller'
import { computed } from 'vue'
import { ROLE, PERMISSION_TYPE } from 'lowcode-design-controller/utils'
import { isInternalEnv } from '@/utils/env'

export default {
  setup() {
    const tenant = JSON.parse(localStorage.getItem('tiny_lowcode_tenant'))
    const avatar = isInternalEnv()
      ? `https://opentiny.design/${user.current?.w3?.sn}/120`
      : import.meta.env.BASE_URL + 'img/default-user-avatar.jpg'
    const typeMatch = {
      apps: '应用',
      platforms: '设计器',
      tenant: '组织'
    }
    const auths = computed(() =>
      user.current.auths?.filter(
        (item) => !(item.unit?.type !== PERMISSION_TYPE.tenant && item.role?.name === ROLE.guest)
      )
    )

    return {
      user,
      tenant,
      avatar,
      typeMatch,
      auths
    }
  }
}
</script>

<style lang="less" scoped>
.personal-center {
  display: flex;
  background: #fff;
  padding: 20px 0;
  height: 100%;
  box-sizing: border-box;
  .user-header {
    width: 200px;
    display: flex;
    justify-content: center;
    .user-img {
      width: 100px;
      height: 100px;
      overflow: hidden;
      border-radius: 50%;
      img {
        height: 100%;
      }
    }
  }

  .user-information {
    flex: 1;
    .title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    li {
      height: 30px;
      line-height: 30px;
      text-align: left;
      display: flex;
      margin-bottom: 10px;
      .label {
        width: 150px;
      }
    }
  }
}
</style>
