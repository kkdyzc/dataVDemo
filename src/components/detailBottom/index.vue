<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { useuserStore } from '@/stores/user'

const userStore = useuserStore()

const config = reactive({
  header: ['任务名称', 'URL', '服务器', '语料文件夹'],
  headerBGC: 'rgba(0, 163, 255, 0.2)',
  headerHeight: 40,
  oddRowBGC: 'transparent',
  evenRowBGC: 'transparent',
  data: [] as any[][],
  columnWidth: [150, 360],
  index: false,
  align: ['center'],
  rowNum: 6,
})

watch(() => userStore.content2List, () => {
  if (userStore.content2List.length > 0) {
    config.data = []
    userStore.content2List[2].forEach((item: any) => {
      if (item['任务名称']?.length > 0)
        config.data.push([item['任务名称'], item?.url ? `<span class="urlColor">${item.url}</span>` : '<span class="urlColor">https://www.figma.com/file/iGdXZ7koVUUR7LFivN...</span>', item?.ip || '172.16.0.250-256', item?.type || '文件夹'])
    })
  }
}, { immediate: true, deep: true })
</script>

<template>
  <div class="app">
    <dv-scroll-board
      :config="config" style="width: 100%;height: 100%;margin-top: 20px"
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
