// 每种用户角色对应的路由黑名单
const routeMap = {
  // 超级管理员，看不到我的设计器、创建设计器、我的应用、应用设置、设计器设置、成员申请列表、AKSK申请
  Tinybuilder_Admin: [
    'myPlatform',
    'myPlatformCreate',
    'myApplication',
    'applicationSetting',
    'applicationSettingBase',
    'applicationSettingPermission',
    'applicationSettingHistory',
    'platformSetting',
    'platformSettingBase',
    'platformSettingPermission',
    'platformSettingHistory',
    'memberApplyList',
    'akskManage'
  ],
  // 组织管理员，看不到权限管理，应用管理，组织申请列表, 应用权限，默认设计器管理，学院课程管理
  Tinybuilder_Tenant_Admin: [
    'permissionList',
    'applicationManage',
    'applicationList',
    'applicationSettingPermission',
    'defaultPlatformManage',
    'appTemplateManage',
    'courseManage'
  ],
  // 设计器管理员，看不到创建设计器，设计器设置、权限管理，应用管理，组织申请列表，成员列表，成员申请列表，默认设计器管理，学院课程管理
  Tinybuilder_Platform_Admin: [
    'myPlatformCreate',
    'platformSetting',
    'platformSettingBase',
    'platformSettingPermission',
    'platformSettingHistory',
    'permissionList',
    'applicationList',
    'applicationManage',
    'memberApplyList',
    'memberList',
    'defaultPlatformManage',
    'appTemplateManage',
    'courseManage'
  ],
  // 应用管理员，看不到我的设计器、创建设计器、设计器设置、权限管理，应用管理，组织申请列表，成员列表，成员申请列表，默认设计器管理，学院课程管理
  Tinybuilder_App_Admin: [
    'myPlatform',
    'myPlatformCreate',
    'platformSetting',
    'platformSettingBase',
    'platformSettingPermission',
    'platformSettingHistory',
    'permissionList',
    'applicationList',
    'applicationManage',
    'memberApplyList',
    'memberList',
    'defaultPlatformManage',
    'appTemplateManage',
    'courseManage'
  ],
  // 应用开发者，看不到我的设计器、创建设计器、应用设置、设计器设置、权限管理，应用管理，组织申请列表，成员列表，成员申请列表，默认设计器管理，学院课程管理
  Tinybuilder_App_Developer: [
    'myPlatform',
    'myPlatformCreate',
    'applicationSetting',
    'applicationSettingBase',
    'applicationSettingPermission',
    'applicationSettingHistory',
    'platformSetting',
    'platformSettingBase',
    'platformSettingPermission',
    'platformSettingHistory',
    'permissionList',
    'applicationList',
    'applicationManage',
    'memberApplyList',
    'memberList',
    'defaultPlatformManage',
    'appTemplateManage',
    'courseManage'
  ],
  // 游客，看不到我的设计器、创建设计器、我的应用、应用设置、设计器设置、创建物料、权限管理，应用管理，组织申请列表，成员列表，成员申请列表，默认设计器管理，学院课程管理，AKSK申请
  Guest: [
    'myPlatform',
    'myPlatformCreate',
    'myApplication',
    'applicationSetting',
    'applicationSettingBase',
    'applicationSettingPermission',
    'applicationSettingHistory',
    'platformSetting',
    'platformSettingBase',
    'platformSettingPermission',
    'platformSettingHistory',
    'myMaterial',
    'myMaterialCreate',
    'permissionList',
    'applicationList',
    'applicationManage',
    'memberApplyList',
    'memberList',
    'defaultPlatformManage',
    'appTemplateManage',
    'courseManage',
    'akskManage'
  ]
}

export default routeMap
