import Vue from 'vue'
import VueRouter from 'vue-router'

// 1. 导入所需模块
import Detail from '@/views/Detail'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Article from '@/views/Layout/Article'
import Collect from '@/views/Layout/Collect'
import Like from '@/views/Layout/Like'
import User from '@/views/Layout/User'

// 2. 调用 Vue.use() 函数，将 VueRouter 安装为 Vue 的插件
Vue.use(VueRouter)

// 3. 配置路由规则
const routes = [
  { path: '/detail/:id', component: Detail }, // 动态传参
  // { path: '/detail', component: Detail }, // 查询参数传参
  {
    path: '/home',
    redirect: '/home/article',
    component: Home,
    children: [
      { path: 'article', component: Article },
      { path: 'collect', component: Collect },
      { path: 'like', component: Like },
      { path: 'user', component: User }
    ]
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
]

const router = new VueRouter({
  routes
})

// 这里,加入导航守卫(全局前置导航守卫)
router.beforeEach((to, from, next) => {
  // 访问任何地址,都会执行这个函数

  // to 表示你要访问那个页面    to.path 表示你要访问的那个路由地址
  // 例如我访问的是  /login 这个路由地址
  // console.log(to)
  // console.log(to.path) // 这里打印的就是  /login

  // from 表示你哪里跳转过来的
  // console.log(from.path)
  // next()   -- 表示允许通过    next('/login')  --表示不允许通过,并且跳转到 /login
  if (
    !localStorage.getItem('mobile-token') &&
    to.path !== '/login' &&
    to.path !== 'register'
  ) {
    next('login')
  }

  next() // 不符合上述条件,允许通过
})

export default router
