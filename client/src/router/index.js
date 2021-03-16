import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Teacher from '../views/Teacher.vue'
import Student from '../views/Student.vue'
//引入老师子路由
import Desgin from '../components/teacher/Desgin.vue'
import Examine from '../components/teacher/Examine.vue'
import Rank from '../components/teacher/Rank.vue'
import StudentRank from '../components/teacher/StudentRank.vue'
//引入学生子路由
import Apply from '../components/student/Apply.vue'
import Mine from '../components/student/Mine.vue'

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
    meta: { title: '老师端' },
    children: [
      { path: '/desgin', component: Desgin },
      { path: '/examine', component: Examine },
      { path: '/rank', component: Rank },
      { path: '/stuRank', component: StudentRank }
    ]
  },
  {
    path: '/student',
    component: Student,
    meta: { title: '学生端' },
    children: [
      { path: '/apply', component: Apply },
      { path: '/mine', component: Mine }
    ]
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
  } else {
    document.title = '学生成果管理系统'
  }
  next()
})


export default router
