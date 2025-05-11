<script setup>
import { useData , useRoute,contentUpdatedCallbacks } from 'vitepress'
import { ref, onMounted } from "vue"
import BrowserIconsVue from "./browser-icons.vue"

const catChanged=(val)=>{
 contentUpdatedCallbacks.forEach(fn=>fn())
}

onMounted(()=>{
    contentUpdatedCallbacks.forEach(fn=>fn())
})
</script>

<BrowserIconsVue cat='ext'   />
