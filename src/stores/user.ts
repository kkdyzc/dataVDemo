import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useuserStore = defineStore('user', () => {
  const routerList = ref(JSON.parse(localStorage.getItem('routerList') as string))
  const contentList = ref<any>([])
  const content2List = ref<any>([])
  return { routerList, contentList, content2List }
})
