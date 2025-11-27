<template>
  <div>
    <team-list></team-list>
    <tenant-user-list></tenant-user-list>
  </div>
</template>

<script>
import TeamList from './TeamList.vue'
import TenantUserList from './TenantUserList.vue'

export default {
  components: {
    TeamList,
    TenantUserList
  }
}
</script>
