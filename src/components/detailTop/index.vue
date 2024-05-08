<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useuserStore } from '@/stores/user'

interface RuleForm {
  name: string
  type: []
  url: string
  ip: string
  num: string
  routeName: string
  inputName: string
  sjType: []
}

const userStore = useuserStore()

const popupVisibility = ref(false)
const popup2Visibility = ref(false)
const createType = ref('')
const ruleFormRef = ref<FormInstance>()
const ruleForm = ref<RuleForm>({
  name: '',
  type: [],
  url: '',
  ip: '',
  num: '',
  routeName: '',
  inputName: '',
  sjType: [],
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入任务名称', trigger: 'blur' },
  ],
  type: [
    {
      required: true,
      message: '请选择语料文件夹类型',
      trigger: 'change',
    },
  ],
  url: [
    {
      required: true,
      message: '请输入URL',
      trigger: 'change',
    },
  ],
  ip: [
    {
      required: true,
      message: '请选择服务器',
      trigger: 'change',
    },
  ],
  num: [
    {
      type: 'date',
      required: true,
      message: '请输入可重试次数',
      trigger: 'change',
    },
  ],
  routeName: [
    {
      required: true,
      message: '请选择文件夹输出路径',
      trigger: 'change',
    },
  ],
  inputName: [
    {
      required: true,
      message: '请选择文件夹输入路径',
      trigger: 'change',
    },
  ],
})

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  await formEl.validate((valid) => {
    if (valid) {
      userStore.content2List[0].unshift({
        '任务名称': ruleForm.value.name,
        '处理状态': '处理中',
        '执行时长（小时）': Math.floor(Math.random() * (128 - 24 + 1)) + 24,
      })
      if (createType.value === 'collect') {
        userStore.content2List[2].unshift({
          '任务名称': ruleForm.value.name,
          '处理状态': '处理中',
          '执行时长（小时）': Math.floor(Math.random() * (128 - 24 + 1)) + 24,
          'url': ruleForm.value.url,
          'ip': ruleForm.value.ip,
          'type': ruleForm.value.routeName,
        })
      }
      else {
        userStore.content2List[2].unshift({
          '任务名称': ruleForm.value.name,
          '处理状态': '处理中',
          '执行时长（小时）': Math.floor(Math.random() * (128 - 24 + 1)) + 24,
          'url': ruleForm.value.inputName,
          'ip': ruleForm.value.ip,
          'type': ruleForm.value.routeName,
        })
      }
      popupVisibility.value = false
      popup2Visibility.value = true
    }
  })
}

function closeForm(formEl: FormInstance | undefined) {
  if (!formEl)
    return
  ruleForm.value = {
    name: '',
    type: [],
    url: '',
    ip: '',
    num: '',
    routeName: '',
    inputName: '',
    sjType: [],
  }
  createType.value = ''
  formEl.resetFields()
}

function showPopup(str: string) {
  popupVisibility.value = true
  createType.value = str
}
</script>

<template>
  <div class="detailContent">
    <div class="topBox">
      <img src="@/assets/collect.png" class="collect" alt="" @click="showPopup('collect')">
      <div class="centerBox">
        <img src="@/assets/cirBg.png" class="cirBg" alt="">
        <img src="@/assets/imgCenter.png" class="imgCenter" alt="">
        <img src="@/assets/cirTop.png" class="cirTop" alt="">
      </div>
      <img src="@/assets/generate.png" class="generate" alt="" @click="showPopup('generate')">
    </div>
    <img src="@/assets/contentBottom.png" class="imgBottom" alt="">
  </div>
  <el-dialog
    v-model="popupVisibility"
    title=""
    class="popup2Visibility"
    :class="createType === 'generate' ? 'generate' : ''"
    append-to-body
    @close="closeForm(ruleFormRef)"
  >
    <div class="tableCont">
      <div class="title">
        {{ createType === 'collect' ? '原料收集任务' : '' }}
        {{ createType === 'generate' ? '语料生成任务' : '' }}
      </div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="generateRuleForm"
        status-icon
      >
        <el-form-item label="任务名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item v-if="createType === 'collect'" label="URL" prop="url">
          <el-input v-model="ruleForm.url" />
        </el-form-item>
        <el-form-item v-if="createType === 'collect'" prop="type" style="flex-direction:unset;">
          <el-checkbox-group v-model="ruleForm.sjType">
            <el-checkbox label="子级内容迭代收集">
              子级内容迭代收集
            </el-checkbox>
          </el-checkbox-group>
          <!--          <el-checkbox-group v-model="ruleForm.type"> -->
          <!--            <el-checkbox value="平行语料生成任务" name="type"> -->
          <!--              平行语料生成任务 -->
          <!--            </el-checkbox> -->
          <!--            <el-checkbox value="指令对齐语料生成任务" name="type"> -->
          <!--              指令对齐语料生成任务 -->
          <!--            </el-checkbox> -->
          <!--            <el-checkbox value="知识内容生成任务" name="type"> -->
          <!--              知识内容生成任务 -->
          <!--            </el-checkbox> -->
          <!--          </el-checkbox-group> -->
        </el-form-item>
        <el-form-item v-if="createType === 'generate'" label="语料生成任务" prop="type">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="平行语料生成任务">
              平行语料生成任务
            </el-checkbox>
            <el-checkbox label="指令对齐语料生成任务">
              指令对齐语料生成任务
            </el-checkbox>
            <el-checkbox label="知识内容生成任务">
              知识内容生成任务
            </el-checkbox>
          </el-checkbox-group>
          <!--          <el-checkbox-group v-model="ruleForm.type"> -->
          <!--            <el-checkbox value="平行语料生成任务" name="type"> -->
          <!--              平行语料生成任务 -->
          <!--            </el-checkbox> -->
          <!--            <el-checkbox value="指令对齐语料生成任务" name="type"> -->
          <!--              指令对齐语料生成任务 -->
          <!--            </el-checkbox> -->
          <!--            <el-checkbox value="知识内容生成任务" name="type"> -->
          <!--              知识内容生成任务 -->
          <!--            </el-checkbox> -->
          <!--          </el-checkbox-group> -->
        </el-form-item>
        <el-form-item v-if="createType === 'generate'" label="输入文件夹路径" prop="inputName">
          <el-input v-model="ruleForm.inputName" />
        </el-form-item>
        <el-form-item label="服务器" prop="ip">
          <el-select v-model="ruleForm.ip" placeholder=" ">
            <el-option v-for="(item, index) of 7" :key="item" :label="`172.16.0.25${index}`" :value="`172.16.0.25${index}`" />
          </el-select>
        </el-form-item>
        <el-form-item label="访问失败重试" prop="num">
          <el-input v-model="ruleForm.num" min="0" type="number" />
        </el-form-item>
        <el-form-item label="输出文件夹路径" prop="routeName">
          <el-input v-model="ruleForm.routeName" />
        </el-form-item>
        <el-form-item class="footerBtn">
          <el-button @click="submitForm(ruleFormRef)">
            生成任务
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
  <el-dialog
    v-model="popup2Visibility"
    title=""
    class="popup3Visibility"
    append-to-body
  >
    <div class="tableCont">
      <div class="title">
        生成任务成功！
      </div>
      <el-button @click="popup2Visibility = false">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss">
.popup2Visibility {
  width: 680px;
  height: 650px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 !important;
  background: transparent url("@/assets/popup2Bg.png") no-repeat;
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
    padding: 30px 50px 20px;
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

    .generateRuleForm {
      padding: 10px 10px 0;
      width: 480px;
      max-width: 480px;
      .el-form-item {
        flex-direction: column;
        .el-form-item__label-wrap {
          margin: 0 !important;
        }
        .el-form-item__label {
          font-weight: 700;
          color: #FFFFFFD9;
          font-size: 14px;
          &::before {
            display: none;
          }
        }

        .el-radio-group {
          gap: 12px;
          .el-radio {
            margin: 0;
            .el-radio__label {
              font-size: 14px;
              font-weight: 400;
              color: #FFFFFFD9;
            }
            .el-radio__input {
              width: 16px;
              height: 16px;
              background: url("@/assets/check.png") no-repeat;
              background-size: 100% 100%;
              &.is-checked {
                background: url("@/assets/checked.png") no-repeat;
                background-size: 100% 100%;
              }
              .el-radio__inner {
                display: none;
              }
            }
          }
        }

        .el-checkbox-group {
          gap: 12px;
          .el-checkbox {
            margin: 0;
            .el-checkbox__label {
              font-size: 14px;
              font-weight: 400;
              color: #FFFFFFD9;
            }
            .el-checkbox__input {
              width: 16px;
              height: 16px;
              background: url("@/assets/check.png") no-repeat;
              background-size: 100% 100%;
              &.is-checked {
                background: url("@/assets/checked.png") no-repeat;
                background-size: 100% 100%;
              }
              .el-checkbox__inner {
                display: none;
              }
            }
          }
        }

        .el-select {
          width: 100%;
        }

        .el-input {
          width: 100%;
          height: 40px;
          .el-input__wrapper {
            box-shadow: none;
            background: #00F0FF1F;
            border: 1px solid #00F0FF;
            .el-input__inner {
              color: #fff;
            }
          }
        }
      }

      .footerBtn {
        //padding-top: 30px;
        .el-form-item__content {
          margin: 0 !important;
          display: flex;
          align-items: center;
          justify-content: center;
          .el-button {
            width: 196px;
            height: 49px;
            background: transparent url("@/assets/btnBg.png") no-repeat;
            background-size: 100% 100%;
            border: none;
            span {
              color: #00F0FF;
              font-size: 18px;
              font-weight: 600;
            }
          }
        }
      }
    }
  }
}

.popup3Visibility {
  width: 560px;
  height: 250px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 !important;
  background: transparent url("@/assets/popup3Bg.png") no-repeat;
  background-size: 100% 100%;
  .el-dialog__header {
    padding: 0;
    .el-dialog__headerbtn {
      .el-icon {
        display: none;
      }
    }
  }
  .el-dialog__body {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      font-size: 32px;
      font-weight: 700;
      color: #fff;
      height: 43px;
    }

    .el-button {
      margin-top: 50px;
      width: 196px;
      height: 49px;
      background: transparent url("@/assets/btnBg.png") no-repeat;
      background-size: 100% 100%;
      border: none;
      span {
        color: #00F0FF;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
}

.el-select-dropdown {
  max-width: 480px;
}
</style>

<style scoped lang="scss">
.detailContent {
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
