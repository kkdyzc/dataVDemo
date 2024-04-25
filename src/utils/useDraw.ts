import { ref } from 'vue'

export default function useDraw() {
  // * 指向最外层容器
  const appRef = ref()
  // * 定时函数
  const timer = ref(0)
  // * 默认缩放值
  const scale = {
    width: '1',
    height: '1',
  }
  // * 设计稿尺寸（px）
  let baseWidth = 1920
  let baseHeight = 1080
  if (window.innerWidth <= 1200) {
    baseWidth = 3072
    baseHeight = 1599
  }
  const baseProportion = Number.parseFloat((baseWidth / baseHeight).toFixed(5))
  // * 需保持的比例（默认1.77778）
  const calcRate = () => {
    // 当前宽高比
    const currentRate = Number.parseFloat((window.innerWidth / window.innerHeight).toFixed(5))
    if (appRef.value) {
      if (currentRate > baseProportion) {
        // 表示更宽
        scale.width = ((window.innerHeight * baseProportion) / baseWidth).toFixed(5)
        scale.height = (window.innerHeight / baseHeight).toFixed(5)
        appRef.value.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`
      }
      else {
        // 表示更高
        scale.height = ((window.innerWidth / baseProportion) / baseHeight).toFixed(5)
        scale.width = (window.innerWidth / baseWidth).toFixed(5)
        appRef.value.style.transform = `scale(${scale.width}, ${scale.height}) translate(-50%, -50%)`
      }
    }
  }

  const resize = () => {
    baseWidth = 1920
    baseHeight = 1080
    clearTimeout(timer.value)
    timer.value = setTimeout(() => {
      calcRate()
    }, 100)
  }

  // 改变窗口大小重新绘制
  const windowDraw = () => {
    window.addEventListener('resize', resize)
  }

  // 改变窗口大小重新绘制
  const unWindowDraw = () => {
    window.removeEventListener('resize', resize)
  }

  return {
    appRef,
    calcRate,
    windowDraw,
    unWindowDraw,
  }
}