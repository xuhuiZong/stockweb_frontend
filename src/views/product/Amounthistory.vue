<template>
  <div class="monitor-assignment">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleTabClick">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.id"
        :label="(item.type === 'amount' ? '成交额' : '成交额百分比')"
        :name="item.id"
      >
        <!-- 只在点击产品任务1时显示图表 -->
        <div v-show="item.id === activeName && item.type === 'amount'">
          <div id="chart-container" class="chart-container" style="width: 100%; height: 400px;"></div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import * as echarts from 'echarts'

const tabList = ref([
  { id: 'WOS001', type: 'amount' },
  { id: 'WOS002', type: 'amountper' }
])

const activeName = ref(tabList.value[0].id)

const showChart = async () => {
  // 使用 nextTick 确保 DOM 渲染完成后再初始化图表
  await nextTick()

  const chartContainer = document.getElementById('chart-container')

  const chart = echarts.init(chartContainer, 'white', {
    renderer: 'svg',
    useDirtyRect: false
  })

  try {
    const response = await fetch('http://45.249.247.254:5000/api/stocks/mv_amount_strategy')
    const data = await response.json()

    const dates = data.map(item => item.Time)
    const seriesData = {
      '(0-39)': data.map(item => item['(0-39)']),
      '(39-139)': data.map(item => item['(39-139)']),
      '(139-500)': data.map(item => item['(139-500)']),
      '(>500)': data.map(item => item['(>500)'])
    }

    const option = {
      title: {
        text: '不同市值成交额变化',
        left: 'center',
        textStyle: {
          fontSize: 24,
          fontWeight: 'bold',
          color: '#333'
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(50,50,50,0.8)',
        textStyle: { color: '#fff' },
        borderRadius: 8,
        borderWidth: 2
      },
      legend: {
        data: Object.keys(seriesData),
        top: '15%',
        textStyle: { fontSize: 14, color: '#333' }
      },
      xAxis: {
        type: 'category',
        data: dates,
        axisLine: { lineStyle: { color: '#333' } },
        axisLabel: { fontSize: 12, rotate: 45 }
      },
      yAxis: {
        type: 'value',
        name: '成交额（亿）',
        nameTextStyle: { fontSize: 14, fontWeight: 'bold' },
        axisLine: { lineStyle: { color: '#333' } },
        splitLine: { lineStyle: { type: 'dashed', color: '#aaa' } }
      },
      dataZoom: [
        { type: 'slider', start: 90, end: 100 },
        { type: 'inside', start: 90, end: 100 }
      ],
      series: [
        {
          name: '(0-39)',
          type: 'line',
          data: seriesData['(0-39)'],
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: { color: '#5470c6' },
          lineStyle: { width: 3 }
        },
        {
          name: '(39-139)',
          type: 'line',
          data: seriesData['(39-139)'],
          smooth: true,
          symbol: 'triangle',
          symbolSize: 6,
          itemStyle: { color: '#91cc75' },
          lineStyle: { width: 3 }
        },
        {
          name: '(139-500)',
          type: 'line',
          data: seriesData['(139-500)'],
          smooth: true,
          symbol: 'diamond',
          symbolSize: 6,
          itemStyle: { color: '#fac858' },
          lineStyle: { width: 3 }
        },
        {
          name: '(>500)',
          type: 'line',
          data: seriesData['(>500)'],
          smooth: true,
          symbol: 'rect',
          symbolSize: 6,
          itemStyle: { color: '#ee6666' },
          lineStyle: { width: 3 }
        }
      ],
      grid: {
        top: '30%',
        left: '5%',
        right: '5%',
        bottom: '10%',
        containLabel: true
      }
    }

    chart.setOption(option)
  } catch (error) {
    console.error('Error fetching chart data:', error)
  }

  window.addEventListener('resize', chart.resize)
}

// 当选项卡点击时，显示图表
const handleTabClick = (tab) => {
  if (tab.name === 'WOS001') {
    // 需要重新渲染图表
    showChart()
  }
}

onMounted(() => {
  // 自动显示图表，防止选项卡首次点击时图表未加载
  if (activeName.value === 'WOS001') {
    showChart()
  }
})

// 监听选中的选项卡
watch(activeName, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    showChart()
  }
})
</script>

<style scoped>
.chart-container {
  /* 给图表容器加上阴影和边框，使其更美观 */
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background-color: #fff;
}
</style>
