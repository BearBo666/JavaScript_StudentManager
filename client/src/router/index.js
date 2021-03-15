import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Teacher from '../views/Teacher.vue'
import Student from '../views/Student.vue'

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
  },
  {
    path: '/teacher',
    component: Teacher,
    meta: { title: '老师端' }
  },
  {
    path: '/student',
    component: Student,
    meta: { title: '学生端' }
  }
]

const router = new VueRouter({
  routes
})

//路由导航守卫
router.beforeEach((to, from, next) => {
  //设置动态title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})


export default router
