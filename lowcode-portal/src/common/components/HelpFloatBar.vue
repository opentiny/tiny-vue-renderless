<template>
  <div class="help-floatbar">
    <a href="http://opentiny.design" target="_blank">
      <icon-customer-service class="icon-help"></icon-customer-service>
    </a>

    <tiny-popover placement="left-end" width="264" trigger="hover" :visible-arrow="false">
      <div class="contact-us-content">
        <div class="label">加入我们</div>
        <div class="contact-methods">设计器技术支持群：530362348</div>
        <div class="label">接口人</div>
        <a class="contact-person" href="im:m00657866">莫春辉 00657866</a>
      </div>
      <template #reference>
        <div class="contact-us">联系我们</div>
      </template>
    </tiny-popover>
  </div>
</template>

<script>
import { IconCustomerService } from '@opentiny/vue-icon'
import { Popover } from '@opentiny/vue'

export default {
  components: {
    TinyPopover: Popover,
    IconCustomerService: IconCustomerService()
  }
}
</script>

<style lang="less" scoped>
.help-floatbar {
  position: fixed;
  right: 30px;
  bottom: 100px;
  width: 40px;
  text-align: center;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.15);
  font-size: 14px;
  background-color: #fff;
  z-index: 999;
  .icon-help {
    font-size: 16px;
    fill: #8a8e99;
    margin: 12px;
  }
  :deep(.contact-us) {
    color: #fff;
    background-color: #526ecc;
    word-wrap: break-word;
    padding: 10px;
  }
}

.contact-us-content {
  padding: 8px 12px;
  .contact-methods {
    font-size: 12px;
    color: #8a8e99;
    margin: 8px 0 16px;
  }
  .contact-person {
    display: block;
    margin-top: 8px;
    font-size: 12px;
    color: #526ecc;
  }
}
</style>

<style>
.tiny-popover.tiny-popper {
  border-width: 0px;
}
</style>
