import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import layout from '@/layout'
/**
 * 公开路由表
 */
const publicRoutes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index')
  },
  {
    path: '/',
    component: layout,
    redirect: '/login',
    children: [
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "profile" */ '@/views/profile/index'),
        meta: {
          title: '个人数据中心',
          icon: 'personnel'
        }
      }, {
        path: '/data',
        name: 'data',
        component: () => import(/* webpackChunkName: "data" */ '@/views/data/index'),
        meta: {
          title: '大模型部署模块',
          icon: 'data'
        }
      }, {
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: "error-page" */ '@/views/error-page/404')
      }, {
        path: '/401',
        name: '401',
        component: () => import(/* webpackChunkName: "error-page" */ '@/views/error-page/401')
      }
    ]
  },
  {
    path: '/product',
    component: layout,
    redirect: '/product/submit',
    meta: {
      title: '市场分析模块',
      icon: 'product'
    },
    children: [
      {
        path: '/product/submit',
        name: 'product-submit',
        component: () => import(/* webpackChunkName: "product" */ '@/views/product/Amounttop'),
        meta: {
          title: '成交额排名',
          icon: 'product'
        }
      }, {
        path: '/product/videosubmit',
        name: 'product-videosubmit',
        component: () => import(/* webpackChunkName: "product" */ '@/views/product/Amounthistory'),
        meta: {
          title: '成交额回顾',
          icon: 'product'
        }
      }, {
        path: '/product/release',
        name: 'product-release',
        component: () => import(/* webpackChunkName: "product" */ '@/views/product/Release'),
        meta: {
          title: '产品级任务发布',
          icon: 'product'
        }
      }, {
        path: '/product/history',
        name: 'product-history',
        component: () => import(/* webpackChunkName: "product" */ '@/views/product/History'),
        meta: {
          title: '历史查询',
          icon: 'product'
        }
      }
    ]
  },
  {
    path: '/workshop',
    component: layout,
    redirect: '/workshop/submit',
    meta: {
      title: '策略引擎模块',
      icon: 'workshop'
    },
    children: [
      {
        path: '/workshop/submit',
        name: 'workshop-submit',
        component: () => import(/* webpackChunkName: "workshop" */ '@/views/workshop/Submit'),
        meta: {
          title: '车间级任务提交',
          icon: 'workshop'
        }
      }, {
        path: '/workshop/release',
        name: 'workshop-release',
        component: () => import(/* webpackChunkName: "workshop" */ '@/views/workshop/Release'),
        meta: {
          title: '车间级任务发布',
          icon: 'workshop'
        }
      }, {
        path: '/workshop/history',
        name: 'workshop-history',
        component: () => import(/* webpackChunkName: "workshop" */ '@/views/workshop/History'),
        meta: {
          title: '历史查询',
          icon: 'workshop'
        }
      }
    ]
  },
  {
    path: '/monitor',
    component: layout,
    redirect: '/monitor/assignment',
    meta: {
      title: '服务流程监测',
      icon: 'tree'
    },
    children: [
      {
        path: '/monitor/assignment',
        name: 'monitor-assignment',
        component: () => import(/* webpackChunkName: "monitor" */ '@/views/monitor/Assignment'),
        meta: {
          title: '任务分配状态',
          icon: 'tree'
        }
      }, {
        path: '/monitor/calculation',
        name: 'monitor-calculation',
        component: () => import(/* webpackChunkName: "monitor" */ '@/views/monitor/Calculation'),
        meta: {
          title: '任务计算状态',
          icon: 'tree'
        }
      }
    ]
  }
]

const router = createRouter({
  history:
    process.env.NODE_ENV === 'production'
      ? createWebHistory()
      : createWebHashHistory(),
  routes: publicRoutes
})

export default router
