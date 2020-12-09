import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import {request} from "./network/request";

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

Vue.use(VueLazyload,{
  loading: require('./assets/img/lazyloadimg/image.png')
})


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
