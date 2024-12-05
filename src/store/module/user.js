import { defineStore } from 'pinia'

import { useAppStore } from './app'
import pinia from '@/store'

const menu = [
  {
    name: '仪表盘', // 菜单名称(router用)
    label: '仪表盘', // 菜单名称(menu用)
    key: '/dashboard', // 菜单路径，点击所跳转的地址，全局唯一
    icon: 'DashboardOutlined', // 菜单图标
    component: 'Dashboard', // 菜单对应的页面组件，这个在router里边回用到
  },
  {
    name: '工单',
    label: '工单',
    key: '/order',
    icon: 'SettingOutlined',
    children: [ // 子菜单
      {
        name: '工单列表',
        label: '工单列表',
        key: '/order/list',
        icon: 'AppstoreOutlined',
        component: 'OrderList',
      }
    ]
  }
]

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
    }
  },
  actions: {
    // 获取用户信息
    getProfile() {
      return new Promise((resolve, reject) => {
        // 模拟异步获取用户信息
        setTimeout(() => {
          let userInfo = {
            username: 'admin',
            avatar: '',
            roles: [],
            menu: menu
          }
          
          // 设置app的菜单和路由
          let appStore = useAppStore(pinia)
          appStore.setMenu(userInfo.menu)
          appStore.setRoute(userInfo.menu)

          resolve(userInfo)
        }, 50)
      })
    }
  }
})
