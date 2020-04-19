import Vue from 'vue'
import VueRouter from 'vue-router'

import util from '@/libs/util.js'
// 路由数据
import routes from '../routerConfig'

Vue.use(VueRouter)

// 导出路由 在 main.js 里使用
const router = new VueRouter({
  // mode:'history',
  routes
})

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach((to, from, next) => {
  // 验证当前路由所有的匹配中是否需要有登陆验证的
  if (to.matched.some(r => r.meta.requiresAuth)) {
    let token = util.cookies.get('token');;
    if (token) {
      // TODO ajax验证token有效性？ 或者通过token获取用户数据
      Vue.prototype.$axios.defaults.headers.common['token'] = token;
      next()
    } else {
      // 没有登陆的时候跳转到登陆界面
      next({
        name: 'login'
      })
    }
  } else {
    // 不需要身份校验 直接通过
    next()
  }
})

router.afterEach((to) => {
  // 需要的信息
  const { app } = router
  const { name, params, query } = to
  // 多页控制 打开新的页面
  app.$store.commit('d2adminPageOpenNew', { name, params, query })
  // 更改标题
  util.title(to.meta.title)
})

export default router
