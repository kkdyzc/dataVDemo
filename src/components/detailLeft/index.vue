<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { useuserStore } from '@/stores/user'

const userStore = useuserStore()

const config = reactive({
  header: ['任务名称', '执行时长', '处理状态', '操作'],
  headerBGC: 'rgba(0, 163, 255, 0.2)',
  headerHeight: 40,
  oddRowBGC: 'transparent',
  evenRowBGC: 'transparent',
  data: [] as any[][],
  index: false,
  align: ['center'],
  rowNum: 20,
})

watch(() => userStore.content2List, () => {
  if (userStore.content2List.length > 0) {
    config.data = []
    userStore.content2List[0].forEach((item: any) => {
      if (item['任务名称']?.length > 0)
        config.data.push([item['任务名称'], `${item['执行时长（小时）']}h`, switchFn(item['处理状态']), '<span class="detail">查看详情</span>'])
    })
  }
}, { immediate: true, deep: true })

function switchFn(str: string) {
  let el = '<span class="handle"></span>'
  switch (str) {
    case '已完成':
      el = '<span class="success"></span>'
      break
    case '已停止':
      el = '<span class="error"></span>'
      break
  }
  return el
}

// function mouseoverHandler(e: any) {
//   console.log(e)
// }
//
// function clickHandler(e: any) {
//   console.log(e)
// }
</script>

<template>
  <div class="app">
    <dv-scroll-board
      :config="config" style="width: 100%;height: 100%;"
    />
  </div>
</template>

<style scoped lang="scss">
.app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  background: url("@/assets/detailLeftBg.png") no-repeat;
  background-size: 100% 100%;

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
