// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
//import axios from "axios"
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from "../store/index"
import VueWechatTitle from 'vue-wechat-title'
import IScrollView from "vue-iscroll-view"
import IScroll from "iscroll"
import AlloyFinger from 'alloyfinger'
import AlloyFingerPlugin from 'alloyfinger/vue/alloy_finger.vue'
import wx from 'weixin-js-sdk'
import common from '../static/js/commonFunction/common.js'
import axios from '../static/js/commonFunction/axios.js'
import utils from './utils'
window.utils = utils

Vue.prototype.common = common


fastClick.attach(document.body)
Vue.config.productionTip = false

Vue.use(MintUI)
Vue.use(AlloyFingerPlugin,{
  AlloyFinger
})
Vue.use(VueWechatTitle)
Vue.use(IScrollView,IScroll)
Vue.prototype.$http = axios
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})