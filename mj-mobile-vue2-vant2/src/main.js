import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ArticleItem from '@/components/ArticleItem.vue'

// 导入所有组件  导入所有组件
import Vant from 'vant'
import 'vant/lib/index.css'
import 'vant/lib/index.less'

Vue.component('ArticleItem', ArticleItem)

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
