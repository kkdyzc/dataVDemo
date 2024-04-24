<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import * as echarts from 'echarts'
import { useuserStore } from '@/stores/user'

const userStore = useuserStore()
const appRef = ref()
const dataContent = ref<any>([])
onMounted(() => {
  // init()
})

watchEffect(() => {
  if (userStore.contentList) {
    if (userStore.contentList[5]) {
      userStore.contentList[5].forEach((item) => {
        if (item['语料用途名称']) {
          dataContent.value.push({
            name: item['语料用途名称'],
            value: item['用途数据量T'],
          })
        }
      })
      console.log(dataContent.value)
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
  const echartData = [
    {
      value: 5555,
      name: '低风险',
      progress: 25,
    },
    {
      value: 3221,
      name: '一般风险',
      progress: 30,
    },
    {
      value: 1222,
      name: '较大风险',
      progress: 50,
    },
    {
      value: 1222,
      name: '较大风险1',
      progress: 50,
    },
    {
      value: 1222,
      name: '较大风险2',
      progress: 50,
    },
    {
      value: 1222,
      name: '较大风险3',
      progress: 50,
    },
    {
      value: 1222,
      name: '较大风险4',
      progress: 50,
    },
  ]

  const color = [
    [
      { offset: 0, color: '#FF8B55' },
      { offset: 1, color: '#FF8B55' },
    ],
    [
      { offset: 0, color: '#6DBEFF' },
      { offset: 1, color: '#6DBEFF' },
    ],
    [
      { offset: 0, color: '#72f6d3' },
      { offset: 1, color: '#72f6d3' },
    ],
    [
      { offset: 0, color: '#909aef' },
      { offset: 1, color: '#909aef' },
    ],
    [
      { offset: 0, color: '#7344ea' },
      { offset: 1, color: '#7344ea' },
    ],
    [
      { offset: 0, color: '#8391fc' },
      { offset: 1, color: '#8391fc' },
    ],
    [
      { offset: 0, color: '#ffa854' },
      { offset: 1, color: '#ffa854' },
    ],
  ]
  dataContent.value.forEach((item: any, index) => {
    item.itemStyle = {
      color: new echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1,
        color[index],
      ),
    }
  })

  myChart.setOption({
    tooltip: {
      formatter(params) {
        let content = ''
        if (params.seriesType === 'pie')
          content += `${params.marker + params.name}: ${params.value}`

        return content
      },
    },
    title: {
      text: dataContent.value && `${dataContent.value.reduce((prev, cur) => {
        return prev + cur.value
      }, 0)}%`, // 将总数放在标题中
      subtext: '分类占比', // 将“总数”放在副标题中
      textStyle: {
        color: '#FFF',
        fontSize: 25, // 调整标题字体大小
        align: 'center',
      },
      subtextStyle: {
        fontSize: 20,
        color: ['#FFF'],
        align: 'center', // 调整副标题位置
      },
      x: 'center',
      y: '35%', // 调整标题和副标题的位置
    },
    legend: {
      orient: 'horizontal', // 设置水平方向
      x: 'center',
      y: '80%',
      width: '80%',
      textStyle: {
        color: '#FFF',
        fontSize: 20,
      },
      itemGap: 20, // 设置分类之间的间距
      itemWidth: 10, // 设置分类图标的宽度
      itemHeight: 10, // 设置分类图标的高度
      rich: {
        circle: {
          width: 10, // 设置圆的直径
          height: 10,
          lineHeight: 10,
          align: 'center',
          backgroundColor: '#FFF', // 设置圆的颜色
          borderRadius: 5, // 设置圆的圆角半径，使其看起来更圆润
        },
      },

    },
    series: [
      {
        type: 'pie',
        minAngle: 5,
        startAngle: 10, // 起始角度
        labelLine: {
          show: true,
          length: 50, // 调整连接线的长度
          length2: 10,
          lineStyle: {
            width: 2,
            color: '#808589',
          },
        },
        label: {
          formatter: (params) => {
            const name = params.name
            const value = params.value
            return `{t|${name}}\n{b|${value}%}`
          },
          rich: {
            t: {
              color: '#FFF',
              lineHeight: 20,
              fontSize: 20,
              align: 'left',
            },
            b: {
              color: '#FFF',
              lineHeight: 20,
              fontSize: 24, // 调整数字部分的字体大小
              fontWeight: 'bold', // 加粗效果
              align: 'left',
            },
          },
        },
        center: ['50%', '40%'], // 调整饼图的位置
        radius: ['35%', '50%'], // 调整饼图的大小
        data: dataContent.value,
      },
      {
        type: 'pie',
        silent: true, // Make it silent to prevent interaction
        center: ['50%', '40%'], // Same center as the main pie chart
        radius: ['55%', '55.9%'], // 调整圆圈的半径，使其位于整个饼图的最外层并且距离20px
        itemStyle: {
          color: 'rgba(255, 255, 255, .3)', // 0.7透明度的白色
          borderColor: 'rgba(255, 255, 255, .3)', // 边框颜色为白色
          borderWidth: 1, // 边框宽度
        },
        label: {
          show: false, // Hide labels
        },
        data: [{ value: 1 }], // Just add a placeholder data
      },
      {
        type: 'pie',
        silent: true, // Make it silent to prevent interaction
        center: ['50%', '40%'], // Same center as the main pie chart
        radius: ['0%', '31%'], // Adjust the radius for the white circle
        itemStyle: {
          color: 'rgba(255, 255, 255, .2)', // 完全透明的白色
          borderColor: 'rgba(175,175,175,0.6)', // 边框颜色为白色
          borderWidth: 8, // 边框宽度
        },
        label: {
          show: false, // Hide labels
        },
        data: [{ value: 1 }], // Just add a placeholder data
      },
    ],
  })
}
</script>

<template>
  <div
    ref="appRef" class="app" style="width: 100%;height: 100%;background: linear-gradient(90deg, rgba(0, 163, 255, 0.1) 0%, rgba(0, 163, 255, 0) 100%);
"
  />
</template>

<style scoped lang="scss">

</style>
