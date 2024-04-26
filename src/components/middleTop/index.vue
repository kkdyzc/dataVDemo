<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { useuserStore } from '@/stores/user'

interface DataType {
  year: string
  processing: number
  process: number
  collect: number
}

const userStore = useuserStore()

const data = ref<DataType[]>([])
const zNum = ref(0)

watch(() => userStore.contentList, () => {
  if (userStore.contentList.length > 0) {
    const num = userStore.contentList[0][0]['总语料量']
    if (num)
      zNum.value = Number(String(num).split('T')[0])
    data.value = []
    userStore.contentList[6].forEach((item: any) => {
      if (Number(item['年份']) > 0) {
        data.value.push({
          year: item['年份'],
          processing: item['语料处理数据量T'],
          process: item['处理进程'],
          collect: Number(item['语料收集数据量T']) * 1000,
        })
      }
    })
  }
}, { immediate: true, deep: true })

onMounted(() => {
  const box = document.querySelector('.middleCont .content')
  if (box) {
    const imgArr = box.querySelectorAll('img')
    nextTick(() => {
      Array.from(imgArr).forEach((item) => {
        item.onmousemove = function (e) {
          const ev = e || event
          ev.preventDefault()
          // ev.cancelBubble = true
          // ev.returnValue = false
        }
        item.onmousedown = function (e) {
          const ev = e || event
          ev.preventDefault()
        }
      })
    })
  }
})
</script>

<template>
  <div class="middleCont">
    <div class="topBox">
      <img src="@/assets/middleLeftImg.png" class="middleLeftImg img" alt="" @mousemove.prevent @mousedown.prevent>
      <div class="content">
        <div class="contentBox">
          <div class="item">
            <div class="year beforeIcon">
              <div class="title">
                <div class="beforeIcon">
                  <img src="@/assets/yearIcon.png" alt="">
                </div>
                2019年
              </div>
              <p class="subTitle">
                语料量
              </p>
            </div>
            <div class="num">
              180G
            </div>
          </div>
          <div v-for="(item, index) of data" :key="item.year" class="item">
            <div v-if="index >= 2" class="num">
              {{ item.collect }}G
            </div>
            <div class="year" :class="index < 2 ? 'beforeIcon' : 'afterIcon'">
              <div class="title">
                <div v-if="index < 2" class="beforeIcon">
                  <img src="@/assets/yearIcon.png" alt="">
                </div>
                {{ item.year }}年
                <div v-if="index >= 2" class="afterIcon">
                  <img src="@/assets/yearIcon.png" alt="">
                </div>
              </div>
              <p class="subTitle">
                语料量
              </p>
            </div>
            <div v-if="index < 2" class="num">
              {{ item.collect }}G
            </div>
          </div>
        </div>
        <div class="circularBox">
          <img src="@/assets/circular.png" class="circular" alt="">
          <img src="@/assets/circularBorder.png" class="circularBorder" alt="">
          <img src="@/assets/masking.png" class="masking" alt="">
          <img src="@/assets/masking2.png" class="masking2" alt="">
          <img src="@/assets/borderBlur.png" class="borderBlur" alt="">
          <img src="@/assets/border1.png" class="border1" alt="">
          <img src="@/assets/border2.png" class="border2" alt="">
          <img src="@/assets/border3.png" class="border3" alt="">
          <div class="zNum">
            <p class="num">
              <dv-digital-flop
                :config="{
                  number: [zNum],
                  content: '{nt}T',
                  animationFrame: 100,
                  style: {
                    fontFamily: 'PangMenZhengDaoBiao',
                    fill: '#fff',
                    fontSize: 40,
                    fontWeight: '400',
                  },
                }"
              />
            </p>
            <p class="name">
              总语料量
            </p>
          </div>
        </div>
      </div>
      <img src="@/assets/middleRightImg.png" class="middleRightImg img" alt="" @mousemove.prevent @mousedown.prevent>
    </div>
    <img src="@/assets/middleBottomImg.png" class="middleBottomImg img" alt="" @mousemove.prevent @mousedown.prevent>
  </div>
</template>

<style scoped lang="scss">
.middleCont {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .topBox {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    .img {
      width: 40px;
      min-width: 40px;
      transform: translateY(80px);
    }
    .content {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transform: translateY(30px);
      .circularBox {
        width: 240px;
        height: 240px;
        transform-style: preserve-3d;
        perspective: 700px;
        position: relative;
        .circular {
          width: 100%;
          transform-origin: 51.6% 50%;
          animation: rotate1 2s linear infinite;
        }
        .circularBorder {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          animation: rotate1 9s linear infinite;
        }
        .masking {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          transform: translateZ(10px) scale(1.04);
          z-index: 10;
        }
        .masking2 {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          transform: translateZ(10px) scale(1.1);
          animation: rotate1 2s linear infinite;
          z-index: 20;
        }
        .borderBlur,
        .border1,
        .border2,
        .border3 {
          width: 370px !important;
          max-width: 370px !important;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .borderBlur {
          width: 300px !important;
          max-width: 300px !important;
        }
        .border1 {
          width: 290px !important;
          max-width: 290px !important;
        }
        .border2 {
          width: 340px !important;
          max-width: 340px !important;
          opacity: .6;
          z-index: 100;
        }
        .border3 {
          opacity: .6;
          z-index: 100;
        }

        .zNum {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 30;
          text-align: center;
          .num {
            font-family: 'PangMenZhengDaoBiao';
            font-size: 40px;
            font-weight: 400;
            color: #fff;
            height: 46px;
          }
          .name {
            margin-top: 8px;
            font-size: 24px;
            font-weight: 700;
            color: #fff;
          }
        }
      }

      .contentBox {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        .item {
          position: absolute;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          .num {
            font-family: 'PangMenZhengDaoBiao';
            font-size: 28px;
            font-weight: 400;
            background: linear-gradient(180deg, #FFFFFF 21.88%, #00F0FF 100%);
            -webkit-background-clip: text;
            color: transparent;
          }

          .year {
            &.beforeIcon {
              margin-right: 20px;
            }
            &.afterIcon {
              margin-left: 20px;
              .subTitle {
                padding-right: 20px;
                padding-left: 0;
                text-align: right;
              }
            }
            .title {
              display: flex;
              align-items: center;
              font-size: 16px;
              font-weight: 400;
              color: #FFFFFFE5;
              white-space: nowrap;

              .beforeIcon {
                width: 14px;
                height: 14px;
                margin-right: 6px;
                position: relative;
                img {
                  width: 38px;
                  min-width: 38px;
                  height: 38px;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
              }
              .afterIcon {
                width: 14px;
                height: 14px;
                margin-left: 6px;
                position: relative;
                img {
                  width: 38px;
                  min-width: 38px;
                  height: 38px;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                }
              }
            }
            .subTitle {
              margin-top: 5px;
              padding-left: 20px;
              font-size: 12px;
              font-weight: 600;
              color: #fff;
            }
          }

          &:nth-of-type(1) {
            width: 50%;
            height: 92px;
            background: url('@/assets/contentBg/rightBg1.png');
            background-size: 100% 100%;
            top: 10px;
            right: 70px;
            padding-left: 200px;
          }
          &:nth-of-type(2) {
            width: 36.6%;
            height: 92px;
            background: url('@/assets/contentBg/rightBg2.png');
            background-size: 100% 100%;
            top: 110px;
            right: 0;
            padding-left: 76px;
          }
          &:nth-of-type(3) {
            width: 36.6%;
            height: 92px;
            background: url('@/assets/contentBg/rightBg3.png');
            background-size: 100% 100%;
            top: 210px;
            right: -16px;
            padding-left: 70px;
          }
          &:nth-of-type(4) {
            width: 38%;
            height: 92px;
            background: url('@/assets/contentBg/leftBg1.png') no-repeat;
            background-size: 100% 100%;
            top: 130px;
            left: -28px;
            justify-content: flex-end;
            padding-right: 80px;
          }
          &:nth-of-type(5) {
            width: 34%;
            height: 92px;
            background: url('@/assets/contentBg/leftBg2.png') no-repeat;
            background-size: 100% 100%;
            top: 228px;
            left: 18px;
            justify-content: flex-end;
            padding-right: 80px;
          }
          &:nth-of-type(6) {
            width: 50%;
            height: 92px;
            background: url('@/assets/contentBg/leftBg3.png') no-repeat;
            background-size: 100% 100%;
            bottom: 10px;
            left: 72px;
            justify-content: flex-end;
            padding-right: 220px;
          }
        }
      }
    }
  }
  .middleBottomImg {
    width: 88%;
    margin-bottom: 20px;
    transform: translateY(-20px);
  }
}
@keyframes rotate1 {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(359deg);
  }
}
</style>
