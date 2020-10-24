import Cookie from 'js-cookie'
export default {
  state: {
    //侧边栏是否缩放
    isCollapse: false,
    // 面包屑导航
    currentMenu: null,
    menu: [],
    //控制tag标签的数组
    tabsList: [
      {
        id: 1,
        name: 'home',
        path: '/',
        label: '首页',
        icon: 's-home'
      }
    ]
  },
  mutations: {
    //点击tag标签和侧边导航菜单操作
    selectMenu(state, val) {
      if (val.name !== 'home') {
        //改变面包屑导航显示
        state.currentMenu = val
        //在tags数组中加入，没找到则push
        let result = state.tabsList.findIndex(item => item.name === val.name)
        result === -1 ? state.tabsList.push(val) : ''
      } else {
        //若点击的是home则置空tag数组
        state.currentMenu = null
      }
      //   val.name !== 'home' ? (state.currentMenu = val) : (state.currentMenu = null)
    },
    //关闭tag标签
    closeTab(state, val) {
      let result = state.tabsList.findIndex(item => item.name === val.name)
      state.tabsList.splice(result, 1)
    },
    //收缩侧边导航菜单
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    // 动态路由设置
    setMenu(state, val) {
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    // 清除cookid
    clearMenu(state) {
      state.menu = []
      Cookie.remove('menu')
    },
    // 动态添加路由方法
    addMenu(state, router) {
      // 查看是否存在menu
      if (!Cookie.get('menu')) {
        return
      }
      let menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      let currentMenu = [
        {
          path: '/',
          component: () => import(`@/views/Main`),
          children: []
        }
      ]
      menu.forEach(item => {
        if (item.children) {
          //含有子路由的特殊处理
          item.children = item.children.map(item => {
            item.component = () => import(`@/views/${item.url}`)
            return item
          })
          currentMenu[0].children.push(...item.children)
        } else {
          item.component = () => import(`@/views/${item.url}`)
          currentMenu[0].children.push(item)
        }
      })
      //动态路由添加
      router.addRoutes(currentMenu)
    }
  },
  actions: {}
}
