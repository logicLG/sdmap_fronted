// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {routers} from './router'
import VueRouter from 'vue-router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Bus from './util/bus'
import {get, patch, post, put, remove} from './util/axios'
import {classificationSystem, typeFields} from './data/staticData'
import {tableData} from "./data/test/test";
import URL from './util/url'
import {timestampConvert} from './util/tool'

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Vuetify);

Vue.prototype.$URL = URL;
Vue.prototype.$Bus = Bus;
Vue.prototype.$tool = {
  timestampConvert:timestampConvert
};

Vue.prototype.$axios = {
  get,
  post,
  patch,
  put,
  remove
};//定义axios标签
// 路由配置
const RouterConfig = {
  mode: 'hash',
  routes: routers
};
//全局数据配置
Vue.prototype.$globalData = {
  classificationSystem: classificationSystem,
  typeFields: typeFields,
  tableData: tableData
}
const router = new VueRouter(RouterConfig)

Vue.config.productionTip = false
Vue.prototype.$serverUrl = "http://172.20.3.106:15000/sdmap"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
