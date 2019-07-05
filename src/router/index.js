import Vue from 'vue'
import Router from 'vue-router'
import ProfessionModel from '../views/project/professionModel'
import CommonModel from '../views/project/commonModel'
import Main from '../views/index.vue'
import DataDisplay from '../views/project/linkouter/vectorTileDisplay'
import Abstract from '../views/layout/abstract'
import AnalyseModel from '../views/project/analyseModel'
import IndextoBase from '../views/project/indextoBase'
import ConnectionManager from '../views/project/connectionManager'
import VectorTileDisplay from '../views/project/linkouter/vectorTileDisplay'
import VectorMakeDisplay from '../views/project/linkouter/vectorMakeDisplay'
import RouteDisplay from '../views/project/linkouter/routeDisplay'
import allHistory from '../views/project/allHistory'
import loginRecord from '../components/Record/loginRecord'
import opRecord from '../components/Record/opRecord'
import serviceWatch from '../serviceManagement/modelprojectTable'

Vue.use(Router)

export const appRouter = [
  {
    meta: {
      title: '日志管理',
      requireAuth: true
    },
    name: '/log',
    path: 'log',
    icon: 'fa fa-address-card',
    component: Abstract,
    // component: IndextoBase,
    children: [
      {
        meta:{
          title:'登录日志',
          requireAuth:false
        },
        name:'loginLog',
        path:'loginLog',
        icon:'fa fa-book fa-lg',
        component: loginRecord
      },
      {
        meta:{
          title:'操作日志',
          requireAuth:false
        },
        name:'opLog',
        path:'opLog',
        icon:'fa fa-map-o',
        component: opRecord
      }]

  }
  ,
  {
    meta: {
      title: '数据管理',
    },
    requireAuth: true,
    name: '/index',
    path: 'index',
    icon: 'fa fa-database fa-lg',
    component: Abstract,
    children: [
      {
        meta: {
          title: '连接管理',
          requireAuth: false
        },
        name: 'connection',
        path: 'connection',
        icon: 'fa fa-cog fa-lg',
        component: ConnectionManager
      },
      // {
      //   meta: {
      //     title: '索引管理',
      //     requireAuth: true
      //   },
      //   name: 'IndextoBase',
      //   path: 'IndextoBase',
      //   icon: 'fa fa-dropbox fa-lg',
      //   component: IndextoBase
      // },
      {
        meta: {
          title: '用户管理',
          requireAuth: false
        },
        name: 'user',
        path: 'user',
        icon: 'fa fa-user-o fa-lg',
        component: IndextoBase
      },
      {
        meta: {
          title: '权限管理',
          requireAuth: false
        },
        name: 'auth',
        path: 'auth',
        icon: 'fa fa-users fa-lg',
        // component: IndextoBase,
      },
      {
        meta: {
          title: '历史记录',
          requireAuth: false
        },
        name: 'history',
        path: 'history',
        icon: 'fa fa-history',
        component: allHistory
      }
    ]
  },
  {
    meta: {
      title: '服务管理'
    },
    name: 'service',
    path: '/service',
    icon: 'fa fa-server fa-lg',
    component: Abstract,
    children: [
      {
        meta: {
          title: '服务监控',
          requireAuth: false
        },
        name: 'monitor',
        path: 'monitor',
        icon: 'fa fa-tachometer fa-lg',
        component: serviceWatch
      },
      {
        meta: {
          title: '服务统计',
          requireAuth: false
        },
        name: 'count',
        path: 'count',
        icon: 'fa fa-bar-chart fa-lg',
        component: CommonModel
      }, {
        meta: {
          title: '并行任务处理',
          requireAuth: false
        },
        name: 'parallel',
        path: 'parallel',
        icon: 'fa fa-tasks fa-lg',
        component: CommonModel
      }]
  },
  {
    meta: {
      title: '大数据挖掘分析'
    },
    name: 'model',
    path: '/model',
    icon: 'fa fa-th fa-lg',
    component: Abstract,
    children: [
      {
        meta: {
          title: '通用挖掘分析',
          requireAuth: false
        },
        name: 'common',
        path: 'common',
        icon: 'fa fa-dropbox fa-lg',
        component: CommonModel
      }, {
        meta: {
          title: '基础空间分析',
          requireAuth: false
        },
        name: 'profession',
        path: 'profession',
        icon: 'fa fa-cube fa-lg',
        componnt: ProfessionModel
      },
      {
        meta: {
          title: '专题数据分析',
          requireAuth: false
        },
        name: 'analyse',
        path: 'analyse',
        icon: 'fa fa-empire fa-lg',
        component: AnalyseModel
      }
    ]
  },
  {
    meta: {
      title: '可视化渲染',
    },
    requireAuth: true,
    name: '/dataViewM',
    path: 'dataViewM',
    icon: 'fa fa-globe fa-lg',
    component: Abstract,
    children: [
      {
        meta: {
          title: '空间数据可视化',
          requireAuth: false
        },
        name: 'vectorMakeDisplay',
        path: 'vectorMakeDisplay',
        icon: 'fa fa-cog fa-lg',
        component: VectorMakeDisplay
      },
      {
        meta: {
          title: '动态数据可视化',
          requireAuth: false
        },
        name: 'routeDisplay',
        path: 'routeDisplay',
        icon: 'fa fa-cog fa-lg',
        component: RouteDisplay
      }, {
        meta: {
          title: '切片样式可视化',
          requireAuth: false
        },
        name: 'vectorTileDisplay',
        path: 'vectorTileDisplay',
        icon: 'fa fa-cog fa-lg',
        component: VectorTileDisplay
      }
    ]
  }
];
export const mainRouter = {
  path: '/',
  name: 'index',
  meta: {
    title: '首页'
  },
  component: Main,
  children: appRouter
};
export const vectorTileRouter = {
  path: '/vector',
  name: 'index',
  meta: {
    title: '首页'
  },
  component: Main,
  children: appRouter
};
export const routers = [
  mainRouter
]
