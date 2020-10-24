import Mock from 'mockjs'

// 图表数据
let List = []
export default {
  getStatisticalData: () => {
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          数码: Mock.Random.float(100, 8000, 0, 2),
          家装: Mock.Random.float(100, 8000, 0, 2),
          百货: Mock.Random.float(100, 8000, 0, 2),
          洗护: Mock.Random.float(100, 8000, 0, 2),
          电器: Mock.Random.float(100, 8000, 0, 2),
          食品: Mock.Random.float(100, 8000, 0, 2)
        })
      )
    }
    return {
      code: 20000,
      data: {
        // 饼图
        videoData: [
          {
            name: '数码',
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: '家装',
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: '百货',
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: '洗护',
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: '电器',
            value: Mock.Random.float(1000, 10000, 0, 2)
          },
          {
            name: '食品',
            value: Mock.Random.float(1000, 10000, 0, 2)
          }
        ],
        // 柱状图
        userData: [
          {
            date: '周一',
            new: Mock.Random.integer(1, 200),
            active: Mock.Random.integer(100, 800)
          },
          {
            date: '周二',
            new: Mock.Random.integer(1, 200),
            active: Mock.Random.integer(100, 800)
          },
          {
            date: '周三',
            new: Mock.Random.integer(1, 200),
            active: Mock.Random.integer(100, 800)
          },
          {
            date: '周四',
            new: Mock.Random.integer(1, 200),
            active: Mock.Random.integer(100, 800)
          },
          {
            date: '周五',
            new: Mock.Random.integer(1, 200),
            active: Mock.Random.integer(100, 800)
          },
          {
            date: '周六',
            new: Mock.Random.integer(1, 200),
            active: Mock.Random.integer(100, 800)
          },
          {
            date: '周日',
            new: Mock.Random.integer(1, 200),
            active: Mock.Random.integer(100, 800)
          }
        ],
        // 折线图
        orderData: {
          date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
          data: List
        },
        tableData: [
          {
            name: '数码',
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
          },
          {
            name: '手机',
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
          },
          {
            name: '家装',
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
          },
          {
            name: '百货',
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
          },
          {
            name: '食品',
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
          },
          {
            name: '电器',
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2)
          }
        ]
      }
    }
  }
}
