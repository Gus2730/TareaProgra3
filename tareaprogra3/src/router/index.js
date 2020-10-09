import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/Tramites',
    name: 'Tramites',
    component: () => import('../views/Tramites.vue')
  },
  {
    path: '/Mantenimiento',
    name: 'Mantenimiento',

    component: () => import('../views/Mantenimiento.vue')
  },
  {
    path: '/',
    name:'Login',
    
    component: () => import('../views/Login.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
