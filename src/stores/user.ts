import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useuserStore = defineStore('user', () => {
  const routerList = ref(JSON.parse(localStorage.getItem('routerList') as string))
  const contentList = ref<any>([])
  return { routerList, contentList }
})
