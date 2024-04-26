import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'home' },
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      // redirect: '/home',
      // children: [
      //   {
      //     path: '/detail',
      //     name: 'detail',
      //     component: () => import('@/views/detail.vue'),
      //   },
      // ],
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('@/views/DetailView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/404.vue'),
    },
  ],

})

// router.beforeEach(async (to, from, next) => {
//   const token = localStorage.getItem('token')
//   if (token === null && to.name !== 'login') {
//     next({ path: '/login' })
//     return
//   }
//   else if (token && to.path === '/login') {
//     next({ path: '/' })
//     return
//   }
//   next()
// })

export default router
