import { state } from '../state'

let { courses } = state
const getCourseById = (id, data) => {
  getCourse(data)
  const res = courses.find((item) => String(item.id) === id)

  return res
}

const deleteCourseById = (id) =>
  courses.splice(
    courses.findIndex((item) => String(item.id) === id),
    1
  )

const createCourse = (config) => {
  const url = config.url

  if (!url.includes('video')) {
    const id = courses.length + 1
    const data = JSON.parse(config.data)

    const course = { ...data }

    course.id = id
    courses.unshift(course)

    return course
  }

  return {}
}

const updateCourse = (id, config) => {
  const url = config.url
  const data = JSON.parse(config.data)

  if (!url.includes('video')) {
    data.id = id

    courses.splice(
      courses.findIndex((item) => String(item.id) === id),
      1,
      data
    )
  }

  return data
}

const getCourse = (data) => {
  if (!courses.length) {
    courses.push(
      ...data.map((item, idx) => ({
        ...item,
        poster: `${import.meta.env.BASE_URL}img/courses/course${(idx % 10) + 1}.jpg`
      }))
    )
  }
}

export default [
  {
    url: /\/platform-center\/api\/courses/,
    proxy: `${import.meta.env.BASE_URL}mock/platform/course.json`,
    handleData({ data }, config) {
      getCourse(data)

      return { data: courses }
    }
  },
  {
    url: /\/platform-center\/api\/course/,
    proxy: `${import.meta.env.BASE_URL}mock/platform/course.json`,
    handleData({ data }, config) {
      const { method, url } = config
      const id = url.split('/')[3]

      let result

      switch (method) {
        case 'get':
          result = getCourseById(id, data)
          break
        case 'delete':
          result = deleteCourseById(id)
          break
        case 'post':
          result = createCourse(config)
          break
        case 'put':
          result = updateCourse(id, config)
          break
        default:
          break
      }

      return { data: result }
    }
  }
]
