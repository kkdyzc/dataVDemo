<script lang="ts" setup>
import { reactive } from 'vue'

const config = reactive({
  header: ['任务名称', 'URL', '服务器', '语料文件夹'],
  headerBGC: 'rgba(0, 163, 255, 0.2)',
  headerHeight: 40,
  oddRowBGC: 'transparent',
  evenRowBGC: 'transparent',
  data: [
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivNhttps://www.figma.com/file/iGdXZ7koVUUR7https://www.figma.com/file/iGdXZ7koVUUR7</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
    ['任务1', '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', '172.16.0.250-256', '文件夹'],
  ],
  columnWidth: [150, 360],
  index: false,
  align: ['center'],
  rowNum: 6,
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
      :config="config" style="width: 100%;height: 100%;margin-top: 20px"
      @mouseover="mouseoverHandler" @click="clickHandler"
    />
  </div>
</template>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  :deep(.header) {
    align-items: center;
    display: flex;

  }

  :deep(.row-item) {
    .urlColor{
      color: #00A3FF;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      cursor: pointer;
    }
  }

}
</style>
