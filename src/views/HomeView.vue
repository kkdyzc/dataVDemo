<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { read, utils } from 'xlsx'
import { useuserStore } from '@/stores/user'
import LeftTop from '@/components/leftTop/index.vue'
import LeftBottom from '@/components/leftBottom/index.vue'

const userStore = useuserStore()
const router = useRouter()
const time = ref(0)
const currentDateTime = ref('')

onMounted(() => {
  const updateDateTime = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const day = now.getDate().toString().padStart(2, '0')
    const time = now.toLocaleTimeString()
    currentDateTime.value = `${year}-${month}-${day} ${time}`
  }

  // 初始更新时间
  updateDateTime()

  // 每秒更新一次时间
  setInterval(updateDateTime, 1000)
  window.addEventListener('resize', windowSize)

  axios.get('/src/assets/数据语料平台.xlsx', {
    responseType: 'blob',
  }).then((response) => {
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const file = new File([blob], 'example.xlsx', { type: blob.type })

    const fileReader = new FileReader()
    fileReader.onload = (ev: any) => {
      try {
        const data = ev.target.result
        const workbook = read(data, {
          type: 'binary',
        })

        const allWorksheetsData = workbook.SheetNames.map((sheetName) => {
          const ws = utils.sheet_to_json(workbook.Sheets[sheetName])
          return ws
        })
        userStore.contentList = allWorksheetsData
        console.log(allWorksheetsData)
        // 取第一张表
        // console.log(workbook.SheetNames)
        // const wsname = workbook.SheetNames[1]
        // // 生成json表格内容
        // const ws = utils.sheet_to_json(workbook.Sheets[wsname])
        // console.log(ws)
        // 后续数据的处理
      }
      catch (e) {
        return false
      }
    }
    fileReader.readAsBinaryString(file)
  })
})

function windowSize() {
  time.value = Date.now()
}
</script>

<template>
  <div class="main">
    <dv-full-screen-container>
      <div class="titleBox">
        <div class="headerTime">
          <svg-icon name="timeIcon" width="24px" height="24px" />
          <span style="font-size: 22px;margin:0 10px;">实时数据</span>{{ currentDateTime }}
        </div>
      </div>
      <div class="content">
        <div class="left ">
          <div class="leftBox contentBox">
            <div class="header">
              <img src="@/assets/leftTop.png" alt="">
            </div>
            <div class="footer">
              <LeftTop />
            </div>
          </div>
          <div class="leftBox contentBox">
            <div class="header">
              <img src="@/assets/leftBon.png" alt="">
            </div>
            <div class="footer">
              <LeftBottom />
            </div>
          </div>
        </div>
        <div class="middle ">
          <div class="middleBox contentBox">
            <div class="footer">
              2
            </div>
          </div>
          <div class="middleBox contentBox">
            <div class="header">
              <img src="@/assets/contentBon.png" alt="">
            </div>
            <div class="footer">
              <middleBom />
            </div>
          </div>
        </div>
        <div class="right">
          <div class="rightBox contentBox">
            <div class="header">
              <img src="@/assets/rightTop.png" alt="">
            </div>
            <div class="footer">
              <rightTop />
            </div>
          </div>
          <div class="rightBox contentBox">
            <div class="header">
              <img src="@/assets/rightBon.png" alt="">
            </div>
            <div class="footer">
              <rightBom />
            </div>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #000;
  color: #fff;
  :deep(#dv-full-screen-container) {
    //box-sizing: border-box;
    //height: 100%;
    display: flex;
    flex-direction:column;
    background:url("@/assets/BG3.png") no-repeat;
    background-size: 100%;
    .titleBox{
      height: 7%;
      min-height: 7%;
      background: url('@/assets/headerBg.png') no-repeat;
      background-size: 100%;
      position: relative;
      .headerTime{
        font-family: 'dzFont';
        position: absolute;
        display: flex;
        align-items: center;
        top: 48px;
        left: 43px;
        color:#00F0FF;
        font-size: 18px;
      }
    }
    .content{
      width: 100%;
      height: 93%;
      padding:24px;
      display: flex;
      .left,.right{
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .contentBox{
          height: calc(50% - 1%);
          width: 100%;
          .header{
            height: 10%;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .footer{
            padding-top: 20px;
            height: 90%;
          }
        }

      }
      .middle{
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .middleBox:nth-child(1){
          height: 80%;

        }
        .middleBox:nth-child(2){
          flex: 1;
          border: 1px red solid;
          .header{
            height: 22%;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .right{
        width: 25%;
        height: 100%;

      }
    }
  }
}
</style>
