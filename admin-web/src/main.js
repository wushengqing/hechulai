import 'babel-polyfill'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//引入iconfont的svg图标
let iconFontScript = document.createElement('script');
iconFontScript.setAttribute('src', '//at.alicdn.com/t/font_1765072_44ahim6up5.js');
document.head.appendChild(iconFontScript);

import '@/assets/svg-icons'
import '@/components'
import '@/plugin/axios'
import '@/mock/register'
import api from '@/api'
import util from '@/libs/util.js'
import store from '@/store/index'
import pluginOpen from '@/plugin/open'
import vueFilter from '@/filter'
import screenfull from 'screenfull'
import App from './App'

// 菜单和路由设置
import router from './router'
import { menuHeader} from './menuConfig'
import { frameInRoutes } from './routerConfig'

Vue.use(ElementUI)
Vue.use(vueFilter)
Vue.use(pluginOpen)

Vue.config.productionTip = false

Vue.prototype.$env = process.env.NODE_ENV // production development
Vue.prototype.$baseUrl = process.env.BASE_URL
Vue.prototype.$api = api
Vue.prototype.$util = util

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.getAllPageFromRoutes()
    // 设置顶栏菜单
    this.$store.commit('d2adminMenuHeaderSet', menuHeader)
    // 设置侧边栏菜单
    let userId = util.cookies.get('userId');
    let name = util.cookies.get('name');
    let clanId = util.cookies.get('clanId');
    if(userId){
      //通过coolies设置登录的用户，通过用户获取菜单
      this.$store.commit('d2adminUserInfoSet', {name, userId});
      this.$store.dispatch('d2adminSetMenuAside',{ vm:this });
    }
    //this.$store.commit('d2adminMenuAsideSet', menuAside)
  },
  mounted () {
    // 获取并记录用户 UA
    this.$store.commit('d2adminUaGet')
    // 展示系统信息
    util.showInfo()
    // 用户登陆后从数据库加载一系列的设置
    this.$store.commit('d2adminLoginSuccessLoad')
    // 初始化全屏监听
    this.fullscreenListenerInit()
  },
  methods: {
    /**
     * 初始化全屏监听
     */
    fullscreenListenerInit () {
      if (screenfull.enabled) {
        screenfull.on('change', () => {
          if (!screenfull.isFullscreen) {
            this.$store.commit('d2adminFullScreenSet', false)
          }
        })
      }
    },
    /**
     * 处理路由 得到所有的页面
     */
    getAllPageFromRoutes () {
      const pool = []
      function push (routes) {
        routes.forEach((route) => {
          if (route.children) {
            push(route.children)
          } else {
            const { meta, name, path } = route
            pool.push({ meta, name, path })
          }
        })
      }
      push(frameInRoutes)
      this.$store.commit('d2adminPagePoolSet', pool)
    }
  }
}).$mount('#app')
