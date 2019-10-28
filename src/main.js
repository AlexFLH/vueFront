// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import components from './components'
import 'vue-easytable/libs/themes-base/index.css'
import {VTable,VPagination} from 'vue-easytable'
import VueVideoPlayer  from "vue-video-player/src"
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import hls from 'videojs-contrib-hls'


// import Mock from './mock'
// Mock.start();
import store from './store/index'

// Vue.prototype.$axios = Axios

Vue.use(ElementUI);
Vue.use(components);
Vue.use(hls)
Vue.config.productionTip = false
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

router.beforeEach((to, from, next) => {
  if(to.path === '/login') {
    sessionStorage.removeItem('username');
  }
  let user = JSON.parse(sessionStorage.getItem('username'));
  if(!user && to.path !== '/login') {
    next({ path: '/login' });
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
