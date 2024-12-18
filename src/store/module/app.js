import { defineStore } from 'pinia'
import { h } from 'vue'
import * as icons from '@ant-design/icons-vue'
import routerComponents from '@/router/view_component'
import router from '@/router/index.js'

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      sideCollapsed: false, // 控制左侧菜单栏是否折叠
      theme: 'dark', // 主题
      menu: [], // 菜单列表
      selectedKeys: [], // 菜单中选中的项
      openKeys: [] // 菜单中展开的项
    }
  },
  actions: {
    changeTheme() {
      this.theme = this.theme == 'light' ? 'dark' : 'light'
    },
    changeCollapsed() {
      this.sideCollapsed = !this.sideCollapsed
    },
    setMenu(menu) {
      // 首先深拷贝一下menu参数，因为这里需要对参数值进行一些修改
      let menuList = JSON.parse(JSON.stringify(menu))

	    // 定义一个获取Icon的方法，将后端传过来的Icon图标名称解析为图标组件
      const genMenuIcon = (list) => {
        for(let item of list) {
          if (item.icon && typeof item.icon === 'string') {
            item.icon = h(eval('icons.' + item.icon))
          }

          if (item.hasOwnProperty('children')) {
            genMenuIcon(item.children)
          }
        }
      }

      // 格式化菜单
      genMenuIcon(menuList)

      // 设置menu状态值
      this.menu = menuList
    },
    getMenu() {
      return this.menu
    },
    setRoute(menu) {
      // 拷贝menu对象
      let menuList = JSON.parse(JSON.stringify(menu))

      // childrenNav用来存放路由数据，由于动态加载的路由都处于basic路由之下
      const childrenNav = []

      // 定义一个递归方法用于处理菜单数据
      const makeRouter = (list) => {
        for(let item of list) {
          if (item.component) {
            childrenNav.push({
              path: item.key,
              name: item.component,
              component: routerComponents[item.component],
              meta: {
                keepAlive: true
              }
            })
          }

          if (item.hasOwnProperty('children')) {
            makeRouter(item.children)
          }
        }
      }

      makeRouter(menuList)

      // 将childrenNav注册到basic路由下
      childrenNav.forEach(r => {
        router.addRoute('basic', r)
      })
      console.log('childrenNav', childrenNav)
    }
  },
  persist: {
    enabled: true,
    key: 'app',
    paths: ['theme', 'sideCollapsed'],
  }
})
