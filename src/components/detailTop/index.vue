<script setup lang="ts">

</script>

<template>
  <div class="content">
    <div class="topBox">
      <img src="@/assets/collect.png" class="collect" alt="">
      <div class="centerBox">
        <img src="@/assets/cirBg.png" class="cirBg" alt="">
        <img src="@/assets/imgCenter.png" class="imgCenter" alt="">
        <img src="@/assets/cirTop.png" class="cirTop" alt="">
      </div>
      <img src="@/assets/generate.png" class="generate" alt="">
    </div>
    <img src="@/assets/contentBottom.png" class="imgBottom" alt="">
  </div>
</template>

<style scoped lang="scss">
.content {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url("@/assets/contentBg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .topBox {
    padding-top: 90px;
    display: flex;
    align-items: center;
    .collect,
    .generate {
      cursor: pointer;
    }
    .centerBox {
      width: 222px;
      height: 222px;
      margin: 0 45px;
      position: relative;
      .imgCenter,
      .cirTop {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .cirTop {
        z-index: 10;
        animation: rotate1 3s linear infinite;
      }
      .cirBg {
        animation: rotate2 4s linear infinite;
      }
    }
  }
  .imgBottom {
    transform: translateY(-34px);
  }
}

@keyframes rotate1 {
  0% {
    transform: translate(-50%, -50%) rotate(0);
  }
  100% {
    transform: translate(-50%, -50%) rotate(359.9deg);
  }
}

@keyframes rotate2 {
  0% {
    transform: rotate(359.9deg);
  }
  100% {
    transform: rotate(0);
  }
}
</style>
