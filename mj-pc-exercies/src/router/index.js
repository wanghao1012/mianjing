import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/login') }, // 登录页
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/views/layout'),
    children: [
      { path: 'article', component: () => import('@/views/article') },
      { path: 'dashboard', component: () => import('@/views/dashboard') }
    ]
  } // 首页
]

const router = new VueRouter({
  routes
})

// 加入全局前置导航守卫
router.beforeEach((to, from, next) => {
  // to.path ---- 即将要访问的hash地址
  // from.path ---- 从哪里来的，上一个hash地址是什么
  // next()--放行  next(false)--不放行  next('/login')--跳转到指定的地址
  if (to.path === '/login') {
    next() // 访问的是登录，无条件的放行
  } else {
    // 说明访问的不是登录页。 还得判断是否登录过，如果登录过则允许访问，没有登录过不允许访问
    if (store.state.user.token) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
