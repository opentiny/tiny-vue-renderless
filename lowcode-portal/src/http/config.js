const baseURL = import.meta.env.VITE_APP_ORIGIN

// 仅在本地开发时，启用 withCredentials
const dev = import.meta.env.DEV

export default {
  baseURL,
  withCredentials: false,
  headers: {
    'x-lowcode-mode': dev ? 'develop' : null
  }
}
