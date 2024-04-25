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
      userStore.contentList[5].forEach((item: any) => {
        if (item['语料用途名称']) {
          dataContent.value.push({
            name: item['语料用途名称'],
            value: (item['用途数据量T'] / userStore.contentList[0][0]['总语料量'].split('T')[0] * 100).toFixed(2),
          })
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
  dataContent.value.forEach((item: any, index: any) => {
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
      formatter(params: any) {
        let content = ''
        if (params.seriesType === 'pie')
          content += `${params.marker + params.name}: ${params.value}`

        return content
      },
    },
    title: {
      text: '100%',
      // text: dataContent.value && `${dataContent.value.reduce((prev: any, cur: any) => {
      //   return prev + cur.value
      // }, 0)}%`, // 将总数放在标题中
      subtext: '分类占比', // 将“总数”放在副标题中
      textStyle: {
        color: '#FFF',
        fontSize: 22, // 调整标题字体大小
        align: 'center',
      },
      subtextStyle: {
        fontSize: 12,
        color: ['#FFF'],
        align: 'center', // 调整副标题位置
      },
      x: 'center',
      y: '33%', // 调整标题和副标题的位置
    },
    legend: {
      orient: 'horizontal', // 设置水平方向
      x: 'center',
      y: '90%',
      width: '80%',
      icon: 'circle',
      textStyle: {
        color: '#FFF',
        fontSize: 12,
      },
      itemGap: 10, // 设置分类之间的间距
      itemWidth: 10, // 设置分类图标的宽度
      itemHeight: 10, // 设置分类图标的高度
    },

    series: [
      {
        type: 'pie',
        minAngle: 5,
        startAngle: 10, // 起始角度
        labelLine: {
          show: true,
          length: 20, // 调整连接线的长度
          length2: 20,
          lineStyle: {
            width: 2,
            color: '#808589',
          },
        },
        label: {
          formatter: (params: any) => {
            const name = params.name
            const value = params.value
            return `{t|${name}}\n{b|${value}%}`
          },
          rich: {
            t: {
              color: '#FFF',
              lineHeight: 20,
              fontSize: 12,
              align: 'left',
            },
            b: {
              color: '#FFF',
              lineHeight: 20,
              fontSize: 18, // 调整数字部分的字体大小
              fontWeight: 'bold', // 加粗效果
              align: 'center',
            },
          },
        },
        center: ['50%', '40%'], // 调整饼图的位置
        radius: ['40%', '50%'], // 调整饼图的大小
        data: dataContent.value,
      },
      {
        type: 'pie',
        silent: true, // Make it silent to prevent interaction
        center: ['50%', '40%'], // Same center as the main pie chart
        radius: ['55%', '55.5%'], // 调整圆圈的半径，使其位于整个饼图的最外层并且距离20px
        itemStyle: {
          color: 'rgba(255, 255, 255, .1)', // 0.7透明度的白色
          borderColor: 'rgba(255, 255, 255, .1)', // 边框颜色为白色
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
          borderColor: 'rgba(175,175,175,0.2)', // 边框颜色为白色
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
    ref="appRef" class="app" style="width: 100%;height: 100%;"
  />
</template>

<style scoped lang="scss">
.app{
  background: url("@/assets/rightTopBg.png") no-repeat;
  background-size: 100% 100%;
}
</style>
