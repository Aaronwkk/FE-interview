const menu = [
  {
    name: '仪表盘', // 菜单名称(router用)
    label: '仪表盘', // 菜单名称(menu用)
    key: '/dashboard', // 菜单路径，点击所跳转的地址，全局唯一
    icon: 'DashboardOutlined', // 菜单图标
    component: 'Dashboard', // 菜单对应的页面组件，这个在router里边回用到
  },
  {
    name: '系统设置',
    label: '系统设置',
    key: '/system',
    icon: 'SettingOutlined',
    children: [ // 子菜单
      {
        name: '用户管理',
        label: '用户管理',
        key: '/user/list',
        icon: 'AppstoreOutlined',
        component: 'UserList',
      }
    ]
  }
]

export default menu
