<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import axios from 'axios'
import { read, utils } from 'xlsx'
import { useuserStore } from '@/stores/user'
import LeftTop from '@/components/leftTop/index.vue'
import LeftBottom from '@/components/leftBottom/index.vue'
import middleBom from '@/components/middleBom/index.vue'
import rightTop from '@/components/rightTop/index.vue'
import rightBom from '@/components/rightBom/index.vue'
import MiddleTop from '@/components/middleTop/index.vue'
import useDraw from '@/utils/useDraw'

const userStore = useuserStore()
const router = useRouter()
const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw()

const time = ref(0)
const currentDateTime = ref('')
const url = ref('http://camp-dev.effyic.com/api/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6ODIzLCJwdXIiOiJibG9iX2lkIn19--700cc052c015420366e6b72c8643abef5380d042/%E6%95%B0%E6%8D%AE%E8%AF%AD%E6%96%99%E5%B9%B3%E5%8F%B0%E7%BD%91%E9%A1%B5%E6%95%B0%E6%8D%AE.xlsx')
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
  calcRate()
  windowDraw()
  window.addEventListener('resize', windowSize)

  axios.get('/数据语料平台.xlsx', {
  // axios.get(url.value, {
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

onBeforeUnmount(() => {
  unWindowDraw()
})

function windowSize() {
  time.value = Date.now()
}

function goDetail() {
  router.replace({ name: 'detail' })
}
</script>

<template>
  <div class="main">
    <div id="dv-full-screen-container" ref="appRef">
      <div class="titleBox">
        <div class="logoBox">
          <img src="@/assets/logo.png" alt="" class="logo">
        </div>
        <div class="headerTime">
          <svg-icon name="timeIcon" class="icon" width="24px" height="24px" />
          <span style="font-size: 18px;margin:0 10px;font-weight: 600">实时数据</span>{{ currentDateTime }}
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
            <div class="footer" style="cursor: pointer" @click="goDetail">
              <MiddleTop />
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
              <img class="rightTopYuan" src="@/assets/rightTopYuan.png" alt="">
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
    </div>
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
    //padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 1920px;
    height: 1080px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-origin: left top;
    background:url("@/assets/BG3.png") no-repeat;
    background-size: 100%;
    .titleBox{
      height: 7%;
      min-height: 7%;
      background: url('@/assets/headerBg.png') no-repeat;
      background-size: 100%;
      position: relative;
      .logoBox {
        height: 25px;
        min-height: 25px;
        position: absolute;
        display: flex;
        align-items: center;
        top: 48px;
        left: 48px;
        .logo {
          height: 100%;
        }
      }
      .headerTime{
        font-family: 'dzFont';
        position: absolute;
        display: flex;
        align-items: center;
        top: 48px;
        right: 48px;
        color:#00F0FF;
        font-size: 16px;
        .icon {
          height: 24px;
        }
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
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          &:nth-child(1){
            height: 45%;
            min-height: 45%;
          }
          &:nth-child(2){
            overflow: hidden;
            height: 54%;

          }
          .header{
            height: 48px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .footer{
            padding-top: 20px;
            height: 90%;
            position: relative;
            .rightTopYuan{
              position: absolute;
              top: 12%;
              left: 25%;
              animation: rotate 5s linear infinite;
            }
            @keyframes rotate {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          }
        }

      }
      .middle{
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .middleBox{
          margin: 0 16px;
        }
        .middleBox:nth-child(1){
          height: 80%;
          margin-bottom: -20px;
          .footer{
            height: 100%;
          }
        }
        .middleBox:nth-child(2){
          flex: 1;
          box-sizing: border-box;
          background: url("@/assets/middleBomBg.png") no-repeat;
          background-size:100% 100%;
          .header{
            height: 22%;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .footer{
            height: 78%;
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
