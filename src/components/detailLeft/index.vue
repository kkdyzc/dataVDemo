<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import VueOfficePdf from '@vue-office/pdf'
import { useuserStore } from '@/stores/user'

const userStore = useuserStore()
const popupVisibility = ref(false)
const detailHeaderName = ref('任务详情')
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

const tabConfig = reactive({
  header: ['任务名称', '任务类型', '数据源名称', '服务器', '合规语料知识'],
  headerHeight: 40,
  headerBGC: 'transparent',
  oddRowBGC: 'transparent',
  evenRowBGC: 'transparent',
  data: [] as any[][],
  index: false,
  align: ['center'],
  rowNum: 20,
})

const pdfUrl = ref('')

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

function detailDialog(row: any) {
  const dataArr = ['原料收集任务', '平行语料生成任务', '指令对齐语料任务', '知识提取任务']
  tabConfig.data = []
  const a = ['《塑料成分数据库.xlsx》', '《聚乙烯材料技术说明书.pdf》', '《高分子材料科学期刊-第20卷第3期.pdf》']
  const b = ['《铝合金牌号及化学成分表.xlsx》', '《铝合金材料物理性能测试报告.pdf》', '《铝合金加工工艺及性能优化研究.doc》']
  const c = ['《硅酸盐矿物地质勘探报告.pdf》', '《高效破碎与筛分技术在硅酸盐矿物加工中的应用.docx》', '《硅酸盐矿物浮选分离技术手册.pdf》']
  const d = ['《中国岩层构造分布图集及英文注释.pdf》', '《地质学专业术语汉英对照表.xlsx》', '《全球岩层数据库多语种接口数据接口说明.txt']
  const e = ['《半导体材料基础教程及英文版.pdf》', '《半导体材料特性与应用案例集（中英对照）.docx》', '《国际半导体技术路线图（ITRS）中英文版.pdf》']
  const f = ['《合成纤维生产工艺手册（中英对照）.pdf》', '《合成纤维产品规格与应用指南（双语版）.docx》', '《国际合成纤维标准词汇对照表.xlsx》']
  const g = ['《半结晶高分子加工成型技术手册（双语版）.pdf》', '《高分子结晶行为研究进展（双语文献综述）.docx》', '《高分子结晶过程模拟软件操作指南及英文说明（附案例）.pdf》']
  const h = ['《绝缘材料性能测试标准与方法手册》', '《高分子绝缘材料科学与技术》', '《陶瓷绝缘材料微观结构与性能优化研究》']
  if (row.row[2] === '<span class="success"></span>' && row.columnIndex === 3) {
    popupVisibility.value = !popupVisibility.value
    detailHeaderName.value = '任务详情'
    if (row.row[0] === '塑料材料组分数据知识提取') {
      pdfUrl.value = '/硅烷偶联剂改性对气相SiO...电缆绝缘复合材料性能的影响_王含.pdf'
      for (let i = 0; i <= 2; i++)
        tabConfig.data.push([row.row[0], dataArr[Math.floor(Math.random() * (3 + 1))], a[i], `172.16.0.25${Math.floor(Math.random() * (6 + 1))}`, '<span class="detail">查看详情</span>'])
    }
    if (row.row[0] === '铝合金材料性状说明数据知识提取') {
      pdfUrl.value = '/B-PDA-G_PDMS导热绝缘材料的制备及应用.pdf'
      for (let i = 0; i <= 2; i++)
        tabConfig.data.push([row.row[0], dataArr[Math.floor(Math.random() * (3 + 1))], b[i], `172.16.0.25${Math.floor(Math.random() * (6 + 1))}`, '<span class="detail">查看详情</span>'])
    }
    if (row.row[0] === '硅酸盐矿物开采工艺数据知识提取') {
      pdfUrl.value = '/改性硅溶胶封孔剂对多孔Al_(2)O_(3)陶瓷绝缘性能和微观结构的影响.pdf'
      for (let i = 0; i <= 2; i++)
        tabConfig.data.push([row.row[0], dataArr[Math.floor(Math.random() * (3 + 1))], c[i], `172.16.0.25${Math.floor(Math.random() * (6 + 1))}`, '<span class="detail">查看详情</span>'])
    }
    if (row.row[0] === '国家岩层构造分布数据平行语料制备') {
      pdfUrl.value = '/基于超疏水滤膜的绝缘油多级过滤除水新工艺.pdf'

      for (let i = 0; i <= 2; i++)
        tabConfig.data.push([row.row[0], dataArr[Math.floor(Math.random() * (3 + 1))], d[i], `172.16.0.25${Math.floor(Math.random() * (6 + 1))}`, '<span class="detail">查看详情</span>'])
    }
    if (row.row[0] === '半导体材料说明平行语料制备') {
      pdfUrl.value = '/超导电缆用低介损复合绝缘材料性能研究.pdf'
      for (let i = 0; i <= 2; i++)
        tabConfig.data.push([row.row[0], dataArr[Math.floor(Math.random() * (3 + 1))], e[i], `172.16.0.25${Math.floor(Math.random() * (6 + 1))}`, '<span class="detail">查看详情</span>'])
    }
    if (row.row[0] === '合成纤维及产业平行语料制备') {
      pdfUrl.value = '/硅烷偶联剂改性对气相SiO...电缆绝缘复合材料性能的影响_王含.pdf'
      for (let i = 0; i <= 2; i++)
        tabConfig.data.push([row.row[0], dataArr[Math.floor(Math.random() * (3 + 1))], f[i], `172.16.0.25${Math.floor(Math.random() * (6 + 1))}`, '<span class="detail">查看详情</span>'])
    }
    if (row.row[0] === '结晶高分子/半结晶高分子材料数据知识提取') {
      pdfUrl.value = '/绝缘二维纳米材料的制备及其...有机涂层防腐性能的研究进展_肖敏迪.pdf'
      for (let i = 0; i <= 2; i++)
        tabConfig.data.push([row.row[0], dataArr[Math.floor(Math.random() * (3 + 1))], g[i], `172.16.0.25${Math.floor(Math.random() * (6 + 1))}`, '<span class="detail">查看详情</span>'])
    }

    if (row.row[0] === '绝缘材料的理论知识提取') {
      pdfUrl.value = '/纳米改性植物绝缘油电气特性的研究进展_苏梓铭.pdf'
      for (let i = 0; i <= 2; i++)
        tabConfig.data.push([row.row[0], dataArr[Math.floor(Math.random() * (3 + 1))], h[i], `172.16.0.25${Math.floor(Math.random() * (6 + 1))}`, '<span class="detail">查看详情</span>'])
    }
  }
}
</script>

<template>
  <div class="app">
    <dv-scroll-board
      :config="config" style="width: 100%;height: 100%;" @click="detailDialog"
    />

    <el-dialog
      v-model="popupVisibility"
      :title="detailHeaderName"
      class="visibility"
      append-to-body
      :show-close="detailHeaderName === '任务详情' ? true : false"
    >
      <div v-if="detailHeaderName === '任务详情'" class="tableList">
        <dv-scroll-board
          :config="tabConfig" style="width: 100%;height: 100%;"
          @click="(row:any) => detailHeaderName = row.row[0] "
        />
      </div>
      <div v-else style="height: 100%;width: 100%;">
        <VueOfficePdf :src="pdfUrl" style="height: 90%;width: 100%;overflow: auto;" />
        <div class="back" @click="detailHeaderName = '任务详情'">
          返回
        </div>
      </div>
    </el-dialog>
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

<style lang="scss">
.visibility{
  width: 80vw;
  height: 60vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 !important;
  background: transparent url("@/assets/detailLeftDialogBg.png") no-repeat;
  background-size: 100% 100%;
  //&.generate {
  //  .el-dialog__body {
  //    padding-top: 30px;
  //    .footerBtn {
  //      padding-top: 0 !important;
  //    }
  //  }
  //}
  .el-dialog__header {
    padding: 0;
    .el-dialog__title{
      width: 100%;
      margin-left: 20px;
      display: flex;
      justify-content: center;
      color: #fff;
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 20px;
      transform: translateY(-8px);
    }
    .el-dialog__headerbtn {
      .el-icon {
        display: none;
      }
      &::before {
        content: '';
        width: 24px;
        height: 24px;
        background: url("@/assets/close.png") no-repeat;
        background-size: 100% 100%;
        display: block;
      }
    }
  }
  .el-dialog__body {
    padding: 20px 50px 70px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    .title {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, -50%);
      font-size: 32px;
      font-weight: 700;
      color: #fff;
    }
  }
  .tableList{
    width: 100%;
    height: 100%;
    .dv-scroll-board{
      .header{
        background: linear-gradient(to bottom, rgba(90, 211, 251, 0) 10%,  rgba(90, 211, 251, .4) 100%);

      }
      .detail{
        color: #00A3FF;
        cursor: pointer;
      }
    }
  }
  .back{
    position: absolute;
    margin: 0 auto;
    color: rgba(0, 240, 255, 1);
    font-weight: 600;
    font-size: 18px;
    background-image: url("@/assets/detailBack.png");
    background-repeat: no-repeat;
    background-size: 100%;
    width: 196px;
    height: 49px;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 50%;
    transform: translateX(-50%);
    bottom: 26px;
    cursor: pointer;
  }
}
</style>
