import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//引入公共样式
import "@/style/index.scss"

//全局注册组件 指令等
import "@/utils/config"

//引入 elementUI 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

//引入vant UI
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 使用axios
import {http} from "@/utils/axios";
Vue.prototype.$axios = http;   // this.$axios = axios 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
