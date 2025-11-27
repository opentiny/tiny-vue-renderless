const state = {
  platformList: [],
  platform: {},
  materialList: [],
  materialVersionMap: {},
  ecologyList: [],
  applicationList: [],
  components: [],
  componentLibrary: [],
  blocks: [],
  tenants: null,
  authList: [],
  userList: [],
  roleList: [],
  applyTenantList: [],
  business_categories: [],
  courses: [],
  taskStatus: {},
  platformStatus: {},
  vscodeStatus: {}
}

const TASK_STATUS = {
  INIT: 0,
  RUNNING: 1,
  STOPPED: 2,
  FINISHED: 3,
  INITERROR: 4
}

export { state, TASK_STATUS }
