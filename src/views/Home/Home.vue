<template>
  <el-row :gutter="20" class="home">
    <el-col :span="6">
      <el-card shadow="hover" style="height:280px;margin-bottom:20px">
        <div class="user">
          <img :src="userImg" alt="" />
          <div class="userInfo">
            <p class="name">Nick</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="loginInfo">
          <p>上次登录时间: <span>2020-6-29</span></p>
          <p>上次登录地点: <span>四川</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="height:548px">
        <el-table :data="tableData">
          <el-table-column
            show-overflow-tooltip
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="18">
      <div class="num">
        <el-card
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="num">￥ {{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover" style="margin-bottom:20px">
        <echart :chartData="this.echartData.order" style="height:280px"></echart>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <echart :chartData="this.echartData.user" style="height:260px"></echart>
        </el-card>
        <el-card shadow="hover">
          <echart :chartData="echartData.video" :isAxisChart="false" style="height:260px"></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Echart from '../../components/Echart'
export default {
  name: '',
  props: [''],
  components: {
    Echart
  },
  data() {
    return {
      userImg: require('../../assets/images/user.png'),
      tableData: [],
      tableLabel: {
        name: '订单种类',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [
        {
          name: '今日支付订单',
          icon: 'success',
          value: 1928,
          color: '#2ec7c9'
        },
        {
          name: '今日收藏订单',
          icon: 'star-on',
          value: 342,
          color: '#ffb910'
        },
        {
          name: '今日未支付订单',
          icon: 's-goods',
          value: 12,
          color: '#5ab1ef'
        },
        {
          name: '本月支付订单',
          icon: 'success',
          value: 3762,
          color: '#2ec7c9'
        },
        {
          name: '本月收藏订单',
          icon: 'star-on',
          value: 654,
          color: '#ffb910'
        },
        {
          name: '本月未支付订单',
          icon: 's-goods',
          value: 36,
          color: '#5ab1ef'
        }
      ],
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    }
  },
  methods: {
    // 获取table表数据
    getTableData() {
      this.$http
        .get('/home/getData')
        .then(res => {
          console.log(res)
          res = res.data
          this.tableData = res.data.tableData

          // 获取echartsdata--order--订单折线图
          const order = res.data.orderData
          //设置横坐标
          this.echartData.order.xData = order.date
          // 取出series中name部分---键名,做简单处理
          let keyArray = Object.keys(order.data[0])
          keyArray.forEach(key => {
            this.echartData.order.series.push({
              name: key === 'wechat' ? '小程序' : key,
              data: order.data.map(item => item[key]),
              type: 'line'
            })
          })
          // 用户柱状图
          this.echartData.user.xData = res.data.userData.map(item => item.date)
          //传递两个对象
          this.echartData.user.series.push({
            name: '新增用户',
            data: res.data.userData.map(item => item.new),
            type: 'bar'
          })
          this.echartData.user.series.push({
            name: '活跃用户',
            data: res.data.userData.map(item => item.active),
            type: 'bar',
            barGap: 0
          })
          // 视频饼图
          this.echartData.video.series.push({
            data: res.data.videoData,
            type: 'pie'
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getTableData()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/home';
</style>
