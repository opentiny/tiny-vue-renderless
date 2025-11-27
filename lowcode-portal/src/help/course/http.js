import { useHttp } from 'lowcode-design-http'

const http = useHttp()

export const updateProgress = (courseId, params = {}) =>
  http.put(`platform-center/api/course/${courseId}/progress`, params)

// 获取课程列表
export const requestCourseList = (params) => http.get('platform-center/api/courses', { params })
// 获取课程详情
export const requestCourseDetail = (courseId) => http.get(`platform-center/api/course/${courseId}`)
