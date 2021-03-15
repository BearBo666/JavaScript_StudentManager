import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入element UI库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入全局样式
import './assets/css/global.css'

Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
