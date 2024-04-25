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
      formatter(params: any) {
        let content = `${params[0].name}<br/>`
        params.forEach((item: any) => {
          if (item.seriesName === '处理进程') {
            content += `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:5px;height:5px;background-color:${item.color}"></span>`
            content += `${item.seriesName}: ${item.value}%<br/>`
          }
          else {
            content += `<span style="display:inline-block;margin-right:5px;border-radius:50%;width:5px;height:5px;background-color:${item.color}"></span>`
            content += `${item.seriesName}: ${item.value}<br/>`
          }
        })
        // 新增月收信息
        return content
      },
    },
    legend: {
      orient: 'horizontal', // 设置水平方向
      x: 'right',
      y: '5%',
      icon: 'circle',
      // width: '80%',
      textStyle: {
        color: '#FFF',
        fontSize: 12,
      },
      itemGap: 20, // 设置分类之间的间距
      itemWidth: 10, // 设置分类图标的宽度
      itemHeight: 10, // 设置分类图标的高度
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
                color: 'rgba(34, 118, 252, 0.4)',
              },
              {
                offset: 1,
                color: 'rgba(34, 118, 252, 0.2)',
              },
            ],
          },
        },
        lineStyle: {
          width: 2,
          color: '#00A3FF',
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
                color: 'rgba(0,163,255,0.4)',
              },
              {
                offset: 1,
                color: 'rgba(0,163,255, 0.2)',
              },
            ],
          },
        },
        lineStyle: {
          width: 2,
          color: '#00F0FF',
        },
        data: data2.value,
      },

      {
        name: '处理进程',
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
                color: 'rgba(255, 207, 95, .2)',
              },
              {
                offset: 1,
                color: 'rgba(255, 207, 95, 0.2)',
              },
            ],
          },
        },
        lineStyle: {
          width: 2,
          color: '#FFCF5F',
        },
        data: handle.value,
      },
    ],
  })
}
</script>

<template>
  <div ref="appRef" class="app" style="width: 100%;height: 100%;" />
</template>

<style scoped lang="scss">
.app{
  background: url("@/assets/rightTopBg.png") no-repeat;
  background-size: 100% 100%;
  height: 100%;
}
</style>
