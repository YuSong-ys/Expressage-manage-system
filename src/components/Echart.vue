<template>
  <div style="height: 100%" ref="echart"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: []
        }
      }
    },
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    //判断需要绘制的图表类型
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption
    },
    //侧边栏是否收缩
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  },
  methods: {
    initChart() {
      //初始化数据
      this.initChartData()
      if (this.echart) {
        //设置配置
        this.echart.setOption(this.options)
      } else {
        //如果echart不存在就需要初始化
        this.echart = echarts.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    },
    //设置数据,带坐标轴的设置xAxis.data，饼图不需要
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData
        this.axisOption.series = this.chartData.series
      } else {
        this.normalOption.series = this.chartData.series
      }
    },
    // 页面大小改变重置图的大小
    resizeChart() {
      this.echart ? this.echart.resize() : ''
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeChart)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeChart)
  },
  watch: {
    //数据发生改变重新绘制
    chartData: {
      handler: function() {
        this.initChart()
      },
      deep: true
    },
    //侧边栏收缩改变图表大小
    isCollapse() {
      setTimeout(() => {
        this.resizeChart()
      }, 300)
    }
  },
  data() {
    return {
      echart: null,
      //有坐标轴的配置
      axisOption: {
        //   配置标题颜色
        legend: {
          textStyle: {
            color: '#333'
          }
        },
        // 偏移
        grid: {
          left: '13%'
        },
        // 悬浮提示
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: [],
          //   坐标轴颜色
          axisLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          },
          axisLabel: {
            color: '#333'
          }
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
          }
        ],
        color: [
          '#2ec7c9',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
          '#d87a80',
          '#8d98b3',
          '#e5cf0d',
          '#97b552',
          '#95706d',
          '#dc69aa',
          '#07a2a4',
          '#9a7fd1',
          '#588dd5',
          '#f5994e',
          '#c05050',
          '#59678c',
          '#c9ab00',
          '#7eb00a',
          '#6f5553',
          '#c14089'
        ],
        series: []
      },
      //无坐标轴的配置
      normalOption: {
        tooltip: {
          // 触发时机
          trigger: 'item'
        },
        // 设置为南丁格尔图
        // roseType: 'angle',
        color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
        series: []
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
