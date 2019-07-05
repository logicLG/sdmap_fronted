import Vue from 'vue'
import Vuex from 'vuex'
import layout from './modules/layout'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
  modules: {
    layout
  },
  //关闭vuex严格模式——深度监测撞态树来检测不合规的状态变更
  // TODO:发布后需要关闭
  // strict: debug,
  strict: false
})
