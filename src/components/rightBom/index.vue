<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import * as echarts from 'echarts'
import { useuserStore } from '@/stores/user'

const userStore = useuserStore()
const appRef = ref()
const title = ref<any>([])
const handle = ref<any>([])
const data1 = ref<any>([])
const data2 = ref<any>([])
const seriesData = ref<any>([])

watchEffect(() => {
  if (userStore.contentList) {
    if (userStore.contentList[6]) {
      userStore.contentList[6].forEach((item) => {
        if (item['年份']) {
          title.value.push(item['年份'])
          handle.value.push(item['处理进程%'].toFixed(0))
          data1.value.push(item['语料收集数据量T'])
          data2.value.push(item['语料处理数据量T'])
        }
      })
      init()
    }
  }
})
function init() {
  // userStore.contentList[6].forEach((item) => {
  //   console.log(item)
  //   title.value.push(item['年份'])
  // })
  // console.log(title.value)
  const myChart = echarts.init(appRef.value)
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
      formatter(params) {
        let content = `${params[0].name}<br/>`
        params.forEach((item) => {
          // 保留颜色的圆点
          content += `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:5px;height:5px;background-color:${item.color}"></span>`
          content += `${item.seriesName}: ${item.value}<br/>`
        })
        // 新增月收信息
        content += '处理进程:' + `${`${handle.value[params[0].dataIndex]}%`}` + '<br/>'
        return content
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: title.value,
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '{value} ', // 格式化 yAxis 标签
          color: 'rgba(255, 255, 255, 0.85)',
          fontSize: '12px',
        },
        splitLine: {
          lineStyle: {
            type: 'dashed', // 虚线样式
            color: 'rgba(117, 168, 202, 0.3)',
          },
        },
      },
    ],
    series: [
      {
        name: '语料收集数据量T',
        type: 'line',
        symbolSize: 10,
        smooth: false,

        emphasis: {
          focus: 'series',
        },
        areaStyle: {
          color: {
            type: 'linear',
            colorStops: [
              {
                offset: 0,
                color: 'rgba(1, 180, 255, 0.5)',
              },
              {
                offset: 1,
                color: 'rgba(1, 180, 255, 0.2)',
              },
            ],
          },
        },
        lineStyle: {
          width: 2,
        },
        data: data1.value,
      },
      {
        name: '语料处理数据量T',
        type: 'line',
        symbolSize: 10,
        smooth: false,
        emphasis: {
          focus: 'series',
        },
        areaStyle: {
          color: {
            type: 'linear',
            colorStops: [
              {
                offset: 0,
                color: 'rgba(142,220,152,0.5)',
              },
              {
                offset: 1,
                color: 'rgba(142,220,152, 0.2)',
              },
            ],
          },
        },
        lineStyle: {
          width: 2,
        },
        data: data2.value,
      },
    ],
  })
}
</script>

<template>
  <div ref="appRef" class="app" style="width: 100%;height: 100%;" />
</template>

<style scoped lang="scss">

</style>
