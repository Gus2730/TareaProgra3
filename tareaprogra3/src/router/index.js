import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/Tramites',
    name: 'Tramites',
    component: () => import(/* webpackChunkName: "Tramites" */ '../views/Tramites.vue')
  },
  {
    path: '/Mantenimiento',
    name: 'Mantenimiento',

    component: () => import(/* webpackChunkName: "Mantenimiento" */ '../views/Mantenimiento.vue')
  },
  {
    path: '/',
    name:'Login',
    
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
