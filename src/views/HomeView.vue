<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const router = useRouter()
const time = ref(0)

onMounted(() => {
  window.addEventListener('resize', windowSize)
})

function windowSize() {
  time.value = Date.now()
}
</script>

<template>
  <div class="main">
    <dv-full-screen-container :key="time">
      <div class="titleBox">
        <div class="headerTime">
          实时数据123
        </div>
      </div>
      <div class="content">
        <div class="left ">
          <div class="leftBox contentBox">
            <div class="header">
              <img src="@/assets/leftTop.png" alt="">
            </div>
            <div class="footer">
              2
            </div>
          </div>
          <div class="leftBox contentBox">
            <div class="header">
              <img src="@/assets/leftBon.png" alt="">
            </div>
            <div class="footer">
              2
            </div>
          </div>
        </div>
        <div class="middle ">
          <div class="middleBox contentBox">
            <div class="header" />
            <div class="footer">
              2
            </div>
          </div>
          <div class="middleBox contentBox">
            <div class="header" />
            <div class="footer">
              2
            </div>
          </div>
        </div>
        <div class="right">
          <div class="rightBox contentBox">
            <div class="header">
              <img src="@/assets/rightTop.png" alt="">
            </div>
            <div class="footer">
              2
            </div>
          </div>
          <div class="rightBox contentBox">
            <div class="header">
              <img src="@/assets/rightBon.png" alt="">
            </div>
            <div class="footer">
              2
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
    box-sizing: border-box;
    height: 100%;
    border: 1px solid red;
    display: flex;
    flex-direction:column;
    background:url("@/assets/BG3.png") no-repeat;
    background-size: 100%;
    .titleBox{
      height: 7%;
      background: url('@/assets/headerBg.png') no-repeat;
      background-size: 100%;
      .headerTime{
        font-family: 'dzFont';
      }
    }
    .content{
      width: 100%;
      height: 100%;
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
        }

      }
      .middle{
        width: 50%;
        border: 1px solid red;
        height: 100%;

      }
      .right{
        width: 25%;
        border: 1px solid red;
        height: 100%;

      }
    }
  }
}
</style>
