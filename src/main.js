/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-04-11 12:20:34
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-04-11 16:56:29
 * @FilePath: /micro-child-vue2-job/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koroFileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import './public-path'  // 必须在最前面引入
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import '@/assets/styles/global.scss'
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/scss/findjob.scss'  // 确保在 Element UI 样式之后引入

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
