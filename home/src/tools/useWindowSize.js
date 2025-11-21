import { ref, computed } from 'vue'
import { throttle } from './utils'

const mobileScreenWidth = 814

const resizeEvent = []
const width = ref(window.innerWidth)
const height = ref(window.innerHeight)
const isMobile = computed(() => width.value <= mobileScreenWidth)
const bodyWidth = ref(document.body.clientWidth)

const prefix = computed(() => (isMobile.value ? 'mobile-' : 'pc-'))

const updateSize = ({ width: newWidth, height: newHeight }) => {
  width.value = newWidth
  height.value = newHeight
  bodyWidth.value = document.body.clientWidth
}

resizeEvent.push(updateSize)

window.addEventListener(
  'resize',
  throttle(() => {
    resizeEvent.forEach((eventFn) => {
      eventFn({ width: window.innerWidth, height: window.innerHeight })
    })
  }, 16)
)

const useWindowSize = () => 
   ({ width, height, isMobile, prefix, bodyWidth, resizeEvent })


export default useWindowSize
