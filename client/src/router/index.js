import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    component: Login
  },
  {
    path: '/login',
    component: Login,
    meta: { title: '登录' }
  }
]

const router = new VueRouter({
  routes
})

export default router
