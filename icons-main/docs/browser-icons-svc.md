<script setup>
import { useData , useRoute,contentUpdatedCallbacks } from 'vitepress'
import { ref, onMounted } from "vue"
import BrowserIconsVue from "./browser-icons.vue"

 
onMounted(()=>{
    contentUpdatedCallbacks.forEach(fn=>fn())
})
</script>

<BrowserIconsVue cat='svc'/>
