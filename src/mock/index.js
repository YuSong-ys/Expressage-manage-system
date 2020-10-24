import Mock from 'mockjs'
import homeApi from './home'
import userApi from './user'
import orderApi from './order'
import permissionApi from './permission'

Mock.setup({
  //延迟事件
  timeout: '200 - 1000'
})

//首页相关
Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)

// 用户相关
Mock.mock(/\/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/\/user\/del/, 'get', userApi.deleteUser)
Mock.mock(/\/user\/add/, 'post', userApi.createUser)
Mock.mock(/\/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/\/user\/search/, 'get', userApi.searchUser)

//订单相关
Mock.mock(/\/order\/getOrder/, 'get', orderApi.getOrderList)
Mock.mock(/\/order\/del/, 'get', orderApi.deleteOrder)
Mock.mock(/\/order\/add/, 'post', orderApi.createOrder)
Mock.mock(/\/order\/edit/, 'post', orderApi.updateOrder)
Mock.mock(/\/order\/search/, 'get', orderApi.searchOrder)

// 权限相关
Mock.mock(/\/permission\/getMenu/, 'post', permissionApi.getMenu)
