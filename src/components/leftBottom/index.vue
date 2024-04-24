<script setup lang="ts">
import { ref, watch } from 'vue'
import { useuserStore } from '@/stores/user'

interface DataType {
  name: string
  value: number
  percentage: number
}

interface Config {
  unit: string
  data: DataType[]
  rowNum: number
  waitTime: number
  valueFormatter: any
}

const userStore = useuserStore()

const config = ref<Config>({
  data: [],
  unit: 'T',
  rowNum: 5,
  waitTime: 2000,
  valueFormatter(val: any) {
    val.percent = val.percentage
  },
})

watch(() => userStore.contentList, () => {
  config.value.data = []
  if (userStore.contentList.length > 0) {
    userStore.contentList[2].forEach((item: any) => {
      if (item['行业名称']?.length > 0 && typeof item['语料数据量T'] === 'number') {
        config.value.data.push({
          name: `<p class="title"><span class="name">${item['行业名称']}</span><span class="num">${item['语料数据量T']}T</span><span class="percentage">${item['标注完成比率%']}%</span></p>`,
          value: item['语料数据量T'],
          percentage: item['标注完成比率%'],
        })
      }
    })
  }
}, { immediate: true, deep: true })
</script>

<template>
  <div class="dataCont">
    <dv-scroll-ranking-board :config="config" />
  </div>
</template>

<style scoped lang="scss">
.dataCont {
  padding: 32px 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: url("@/assets/leftBottomBg.png") no-repeat;
  background-size: 100% 100%;

  :deep(.dv-scroll-ranking-board) {
    width:100%;
    height:100%;
    .row-item {
      position: relative;
      flex-direction: row;
      align-items: center;
      padding-right: 100px;
      .ranking-info {
        width: 100px;
        max-width: 100px;
        min-width: 100px;
        white-space: nowrap;
        .rank {
          display: none;
        }
        .info-name {
          width: 100%;
          font-size: 24px;
          .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .name {
              text-overflow: ellipsis;
              overflow: hidden;
              width: 100%;
            }
            .num {
              position: absolute;
              right: 0;
            }
            .percentage {
              position: absolute;
              top: 50%;
              right: 50%;
              transform: translate(20px, -50%);
              z-index: 10;
            }
          }
        }
        .ranking-value {
          font-size: 28px;
          display: none;
        }
      }
      .ranking-column {
        flex: 1;
        height: 60%;
        border: none;
        box-sizing: border-box;
        margin: 0;
        display: flex;
        align-items: center;
        &::before,
        &::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #E6F7FF80;
        }
        .inside-column {
          margin: 0 16px;
          height: 100%;
          background: linear-gradient(90deg, #00A3FF 1.42%, #75FBFD 100%);
          .shine {
            height: 50%;
            top: 50%;
            margin-top: -4px;
            display: none;
          }
        }
      }
    }
  }
}
</style>
