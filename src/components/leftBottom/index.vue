<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useuserStore } from '@/stores/user'

interface DataType {
  name: string
  value: number
  percentage: number
  title: string
}

interface Config {
  unit: string
  data: DataType[]
  rowNum: number
  waitTime: number
  valueFormatter: any
}

const userStore = useuserStore()
const color = ['A6CFFF', '97D664', 'ff5473', 'df27ea', '31ac76', '55B7EE', '31a6a0', '48E5E5', '4fad7b', '3CD495', '3254DD', '00A3FF']
const scrollBox = ref()
const popupVisibility = ref(false)
const config = ref<Config>({
  data: [],
  unit: 'T',
  rowNum: 8,
  waitTime: 2000,
  valueFormatter(val: any) {
    val.percent = val.percentage
    nextTick(() => {
      const el = scrollBox.value.$el.children as HTMLDivElement[]
      if (el.length > 0) {
        const item = el[el.length - 1]
        const press = item.querySelector('.inside-column') as HTMLDivElement
        const random1 = Math.floor(Math.random() * 12)
        press.style.background = `#${color[random1]}`
        item.onclick = () => {
          popupVisibility.value = true
        }
      }
    })
  },
})

watch(() => userStore.contentList, () => {
  config.value.data = []
  if (userStore.contentList.length > 0) {
    userStore.contentList[2].forEach((item: any) => {
      if (item['行业名称']?.length > 0 && typeof item['语料数据量T'] === 'number') {
        config.value.data.push({
          name: `<p class="title"><span class="name">${item['行业名称']}</span><span class="num">${item['语料数据量T']}<span class="dw">T</span></span><span class="percentage">${item['标注完成比率%']}%</span></p>`,
          title: item['行业名称'],
          value: item['语料数据量T'],
          percentage: item['标注完成比率%'],
        })
      }
    })
    nextTick(() => {
      const el = scrollBox.value.$el.children as HTMLDivElement[]
      if (el.length > 0) {
        Array.from(el).forEach((item) => {
          const random1 = Math.floor(Math.random() * 12)
          const press = item.querySelector('.inside-column') as HTMLDivElement
          press.style.background = `#${color[random1]}`
          item.onclick = () => {
            popupVisibility.value = true
          }
        })
      }
    })
  }
}, { immediate: true, deep: true })
</script>

<template>
  <div class="dataCont">
    <div class="titleCont">
      <span>行业</span>
      <span>标注完成比率</span>
      <span>语料数据量T</span>
    </div>
    <dv-scroll-ranking-board ref="scrollBox" :config="config" />
    <el-dialog
      v-model="popupVisibility"
      title=""
      class="popupVisibility"
      append-to-body
    >
      <div class="tableCont">
        <div class="title">
          行业语料分布
        </div>
        <el-table
          :data="config.data" height="100%"
          style="width: 100%;overflow: hidden;overflow-y: auto;"
        >
          <el-table-column fixed type="index" label="序号" min-width="80" />
          <el-table-column label="行业名称" prop="title" min-width="160" />
          <el-table-column label="语料总数据量T" prop="value" min-width="80" />
          <el-table-column label="标注完成比率%" prop="percentage" min-width="80">
            <template #default="{ row }">
              {{ row.percentage }}%
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.popupVisibility {
  width: 80vw;
  height: 80vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 !important;
  background: transparent url("@/assets/popupVisibilityBg.png") no-repeat;
  background-size: 100% 100%;
  .el-dialog__header {
    padding: 0;
    .el-dialog__headerbtn {
      .el-icon {
        display: none;
      }
      &::before {
        content: '';
        width: 24px;
        height: 24px;
        background: url("@/assets/close.png") no-repeat;
        background-size: 100% 100%;
        display: block;
      }
    }
  }
  .el-dialog__body {
    padding: 80px 50px 10px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .tableCont {
      width: 100%;
      height: 100%;
      .el-table--fit {
        background: transparent;
        .el-table__inner-wrapper::before {
          display: none !important;
        }
        .el-table__header-wrapper {
          overflow: hidden;
          tr {
            background: url('@/assets/tableThBg.png') no-repeat;
            background-size: 100% 100%;
            th {
              border: none;
              background: transparent;
            }
          }
          tr,
          th {
            height: 56px;
            //background: linear-gradient(360deg, rgba(90, 211, 251, 0.4) 0%, rgba(126, 220, 251, 0) 100%, rgba(90, 211, 251, 0) 100%);
            .cell {
              color: #B4C0CC;
              font-size: 16px;
              font-weight: 400;
              padding-left: 10px !important;
            }
          }
        }
        .el-table__body {
          tr {
            background: #365E723D !important;
            &:nth-of-type(2n) {
              background: #365E7280 !important;
            }
            td {
              background: transparent !important;
              border: none;
              color: #fff;
            }
          }
        }
      }
    }
    .title {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, -50%);
      font-size: 32px;
      font-weight: 700;
      color: #fff;
    }
  }
}
</style>

<style scoped lang="scss">
@function random-color(){
  $red: random(255);
  $green: random(255);
  $blue: random(255);
  @return rgb($red, $green, $blue);
}
$color:random-color();

.dataCont {
  padding: 16px 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: url("@/assets/leftBottomBg.png") no-repeat;
  background-size: 100% 100%;
  .titleCont {
    height: 16px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    font-size: 12px;
    span:nth-of-type(2) {
      padding-left: 80px;
    }
  }
  :deep(.dv-scroll-ranking-board) {
    width:100%;
    height:100%;
    max-height: calc(100% - 30px);
    .row-item {
      position: relative;
      flex-direction: row;
      align-items: center;
      padding-right: 60px;
      cursor: pointer;
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
          .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            .name {
              text-overflow: ellipsis;
              overflow: hidden;
              width: 100%;
            }
            .num {
              position: absolute;
              right: 0;
              .dw {
                color: #FFFFFF80;
                margin-left: 4px;
              }
            }
            .percentage {
              width: 100%;
              padding-left: 41px;
              position: absolute;
              top: 50%;
              right: 0;
              transform: translate(0, -50%);
              text-align: center;
              z-index: 10;
            }
          }
        }
        .ranking-value {
          font-size: 14px;
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
          margin: 0 8px;
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
    //@for $i from 1 through 5{
    //  .row-item .inside-column {
    //    background: rgba(random(255), random(255), random(255), 0.8) !important;
    //  }
    //}
  }
}
</style>
