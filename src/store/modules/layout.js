/* eslint-disable no-unused-vars */
import * as types from '../mutation-types'
import {appRouter} from '../../router'

// initial state
const state = {
  ready: false,
  routers: [],
  appRouter: [],
  openedMenuNameList: [],
  menuList: [],
  tabList: [],
  pageOpenedList: [],
  currentPath: [],  // 面包屑数组
  menuTheme: null, // 主题
  theme: null,
  currentconId: ""
}

// getters
const getters = {}

// actions
const actions = {
  initial({dispatch, commit, state}, data) {
    dispatch('initLayout').then(() => {
      dispatch('setMenuList');
    })
  },
  initLayout({dispatch, commit, state}, data) {
    commit(types.INIT_LAYOUT)
  },
  setMenuList({dispatch, commit, state}, data) {
    commit(types.SET_MENU_LIST)
  }
}

// mutations
const mutations = {
  [types.SET_CURRENTCONNID](state, id) {
    state.currentconId = id;
  },
  [types.SET_MENU_LIST](state, list) {
    // clear menuList
    // TODO filter menuList according to the user role
    state.menuList = []
    state.menuList = appRouter.slice()
  },
  //TODO 修改首次打开的活动页面
  [types.INIT_LAYOUT](state, name) {
    state.appRouter = appRouter.slice()
    state.pageOpenedList = [appRouter[0]]
    state.currentPath = [
      {
        meta: {
          title: '首页'
        },
        path: '',
        name: 'home_index'
      }
    ]
    state.menuTheme = localStorage.menuTheme ? localStorage.menuTheme : 'dark' // 主题
    state.theme = localStorage.theme ? localStorage.theme : 'b'
  },
  changeTheme(state, theme) {
    state.menuTheme = theme
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
