import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  )
}

let List = []
let newOrder = function() {
  const count = 200
  for (let i = 0; i < count; i++) {
    List.push(
      Mock.mock({
        id: Mock.Random.guid(),
        sName: Mock.Random.cname(),
        sAddr: Mock.Random.county(true),
        orderNum: Mock.Random.integer(10000),
        rName: Mock.Random.cname(),
        rAddr: Mock.Random.county(true)
      })
    )
  }
}
newOrder()

export default {
  /**
   * 获取列表
   * 要带参数 name, page, limt; name可以不填, page,limit有默认值。
   * @param name, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getOrderList: config => {
    const { name, page = 1, limit = 15 } = param2Obj(config.url)
    // console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit)
    const mockList = List.filter(user => {
      if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      count: mockList.length,
      list: pageList
    }
  },
  /**
   * 增加订单
   * @param sName, sAddr, rName, rAddr, orderNum
   * @return {{code: number, data: {message: string}}}
   */
  createOrder: config => {
    const { sName, sAddr, rName, rAddr, orderNum } = JSON.parse(config.body)
    List.unshift({
      id: Mock.Random.guid(),
      sName: sName,
      sAddr: sAddr,
      rName: rName,
      rAddr: rAddr,
      orderNum: orderNum
    })
    return {
      code: 20000,
      data: {
        message: '订单添加成功'
      }
    }
  },
  /**
   * 删除订单
   * @param id
   * @return {*}
   */
  deleteOrder: config => {
    const { id } = param2Obj(config.url)
    if (!id) {
      return {
        code: -999,
        message: '删除失败'
      }
    } else {
      List = List.filter(u => u.id !== id)
      return {
        code: 20000,
        message: '删除成功'
      }
    }
  },
  //搜索用户
  searchOrder: config => {
    const { orderNum } = param2Obj(config.url)
    let result = List.some(u => u.orderNum == orderNum)
    if (!result) {
      return {
        code: -999,
        message: '订单号不存在或错误'
      }
    } else {
      List = List.filter(u => u.orderNum == orderNum)
      return {
        code: 20000,
        message: '查找成功'
      }
    }
  },
  /**
   * 修改订单
   * @param id,sName, sAddr, rName, rAddr, orderNum
   * @return {{code: number, data: {message: string}}}
   */
  updateOrder: config => {
    const { id, sName, sAddr, rName, rAddr, orderNum } = JSON.parse(config.body)
    List.some(u => {
      if (u.id === id) {
        u.sName = sName
        u.sAddr = sAddr
        u.rName = rName
        u.rAddr = rAddr
        u.orderNum = orderNum
        return true
      }
    })
    return {
      code: 20000,
      data: {
        message: '编辑成功'
      }
    }
  }
}
