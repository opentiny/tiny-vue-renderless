import { ref } from 'vue'

const menuTitle = ref('')

const setMenuTitle = (title) => {
  menuTitle.value = title
}

const useData = () => 
   ({ menuTitle, setMenuTitle })


export default useData
