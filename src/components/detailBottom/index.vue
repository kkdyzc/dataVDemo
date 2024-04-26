<script lang="ts" setup>
import { reactive } from 'vue'

const config = reactive({
  header: ['任务名称', '执行时长', '处理状态', '操作'],
  headerBGC: 'rgba(0, 163, 255, 0.2)',
  headerHeight: 40,
  oddRowBGC: 'transparent',
  evenRowBGC: 'transparent',
  data: [
    ['任务1', '6h', '<span class="error" />', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="success" />', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="handle"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
    ['任务1', '6h', '<span class="error"/>', '<span class="detail">查看详情</span>'],
  ],
  index: false,
  align: ['center'],
  rowNum: 20,
})

function mouseoverHandler(e: any) {
  console.log(e)
}

function clickHandler(e: any) {
  console.log(e)
}
</script>

<template>
  <div class="app">
    <dv-scroll-board
      :config="config" style="width: 100%;height: 100%;"
      @mouseover="mouseoverHandler" @click="clickHandler"
    />
  </div>
</template>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100%;

  :deep(.header) {
    align-items: center;
    display: flex;

  }

  :deep(.row-item) {
    .error {
      &::before {
        content: '已停止';
        color: #FF386B;
        padding: 3px 8px;
        background: rgba(255, 56, 107, 0.2);
      }
    }

    .success {
      &::before {
        content: '已完成';
        color: #00A3FF;
        padding: 3px 8px;
        background: rgba(0, 163, 255, 0.2);
      }
    }
    .handle{
      &::before {
        content: '处理中';
        color: #00F0FF;
        padding: 3px 8px;
        background: rgba(0, 240, 255, 0.1);
      }
    }
    .detail{
      color: #00A3FF;
      cursor: pointer;
    }
  }

}
</style>
