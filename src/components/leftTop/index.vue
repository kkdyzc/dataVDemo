<script setup lang="ts">
import { ref, watch } from 'vue'
import { useuserStore } from '@/stores/user'

interface DataType {
  name: string
  value: number
}

interface Config {
  unit: string
  data: DataType[]
  rowNum: number
  waitTime: number
  valueFormatter: any
}

const userStore = useuserStore()

const zNum = ref(0)

const config = ref<Config>({
  data: [],
  unit: 'T',
  rowNum: 3,
  waitTime: 2000,
  valueFormatter(val: any) {
    val.percent = val.value / zNum.value * 100
  },
})

watch(() => userStore.contentList, () => {
  if (userStore.contentList.length > 0) {
    zNum.value = 0
    config.value.data = userStore.contentList[1].map((item: any) => {
      zNum.value += item['提供语料数据量T']
      return {
        name: `<p class="title">${item['供应商名称']}<span>${item['提供语料数据量T']}T</span></p>`,
        value: item['提供语料数据量T'],
      }
    })
  }
}, { immediate: true, deep: true })
</script>

<template>
  <div class="dataCont">
    <dv-scroll-ranking-board :config="config" style="width:100%;height:100%" />
  </div>
</template>

<style scoped lang="scss">
.dataCont {
  padding: 16px 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: url("@/assets/leftTopBg.png") no-repeat;
  background-size: 100% 100%;

  :deep(.dv-scroll-ranking-board) {
    .row-item {
      .ranking-info {
        .rank {
          display: none;
        }
        .info-name {
          font-size: 14px;
          .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
        .ranking-value {
          font-size: 14px;
          display: none;
        }
      }
      .ranking-column {
        height: 40%;
        border: 1px solid #A6CFFF80;
        padding: 5px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        .inside-column {
          height: 100%;
          max-height: 24px;
          background: linear-gradient(90deg, #00A3FF 1.42%, #75FBFD 100%);
          .shine {
            height: 50%;
            top: 50%;
            margin-top: -5px;
          }
        }
      }
    }
  }
}
</style>
