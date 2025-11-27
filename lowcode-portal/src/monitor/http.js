import { useHttp } from 'lowcode-design-http'
const http = useHttp()

// 获取监控中心概览数据
export const fetchOverview = () => http.get('platform-center/api/platform/monitoring/overview')

/**
 * 监控事件上传
 * @param { json } params {"event_type": open_canvas / login_portal,"url": "elit in reprehenderit enim incididunt" }
 * @returns { Promise }
 */
export const requestEvent = (params) => http.post('platform-center/api/platform/monitoring/event', params)
