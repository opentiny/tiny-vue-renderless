import { state } from '../state'

export default [
  {
    url: '/platform-center/api/editor/business/category/list',
    proxy: `${import.meta.env.BASE_URL}mock/editor/business-list.json`,
    handleData({ data }, config) {
      if (!state.business_categories.length) {
        state.business_categories = [...data]
      }

      return { data }
    }
  }
]
