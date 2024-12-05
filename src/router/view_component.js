const routerComponents = {
  Dashboard: () => import('../view/dashboard.vue'),
  UserList: () => import('../view/user_list.vue'),
  OrderList: () => import('../view/order/list.vue')
}

export default routerComponents
