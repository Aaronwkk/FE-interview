import routerComponents from './view_component'
import router from './index'

const genRouter = (menu) => {
  const childrenNav = []

  const makeRouter = (list) => {
    for (let item of list) {
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

      if (item.hasOwnProperty('children') && item.children.length > 0) {
        makeRouter(item.children)
      }
    }
  }

  makeRouter(menu)

  return childrenNav;
}

const initRouter = (menu) => {
  const routers = genRouter(menu)
  routers.forEach(r => {
    router.addRoute('basic', r)
  })
}

export default initRouter
