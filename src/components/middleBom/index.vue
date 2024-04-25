<script setup lang="ts">

</script>

<template>
  <div class="app">
    <div v-for="item of 5" :key="item" class="list">
      <div class="listData">
        <p>12%</p>
        <span>开源提供</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app{
  width: 100%;
  height: 100%;
  display: flex;

  .list{
    width: auto;
    flex: 1;
    height: 168px;
    animation: animateSprite 1s steps(4) infinite;
    display: flex;
    justify-content: center;
    align-items: center;
    .listData{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: -50px;
      p{
        font-size: 26px;
        font-family: 'PangMenZhengDao';
      }
      span{
        font-size: 14px;
        letter-spacing: 10px; /* 间距为2像素 */
        padding-left: 10px;

      }
    }
  }

  @keyframes animateSprite {
    0%,100%{
      background-image: url("@/assets/middleBottomBg/1.png");
      background-repeat: no-repeat;
      background-size:100%;
      background-position: center; /* 让背景图居中显示 */
    }
    9%{
      background-image: url("@/assets/middleBottomBg/2.png");
    }
    18%{
      background-image: url("@/assets/middleBottomBg/3.png");
    }
    27%{
      background-image: url("@/assets/middleBottomBg/4.png");
    }
    36%{
      background-image: url("@/assets/middleBottomBg/5.png");
    }
    45%{
      background-image: url("@/assets/middleBottomBg/6.png");
    }
    54%{
      background-image: url("@/assets/middleBottomBg/7.png");
    }
    63%{
      background-image: url("@/assets/middleBottomBg/8.png");
    }
    72%{
      background-image: url("@/assets/middleBottomBg/9.png");
    }
    81%{
      background-image: url("@/assets/middleBottomBg/10.png");
    }
    90%{
      background-image: url("@/assets/middleBottomBg/11.png");
    }
    99%{
      background-image: url("@/assets/middleBottomBg/12.png");
    }
  }
}
</style>
