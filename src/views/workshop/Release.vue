<template>
  <div class="">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>作业加工路线查询</span>
        </div>
      </template>
      <el-row :gutter="20">
        <el-col :span="4" style="text-align: right;">
          车间
        </el-col>
        <el-col :span="8">
          <el-select v-model="mainTask" class="m-2" placeholder="Select" size="small">
            <el-option
              v-for="item in mainTaskOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="4" style="text-align: right;">
          作业
        </el-col>
        <el-col :span="8">
          <el-select v-model="subTask" class="m-2" placeholder="Select" size="small">
            <el-option
              v-for="item in subTaskOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>
      <div style="text-align: center; margin-top: 20px">
        <el-button type="primary" round @click="query">查询</el-button>
      </div>
      <div v-if="url !== ''">
        <div style="text-align: center; margin-top: 20px">
          <el-image :src="url" fit="contain" />
        </div>
        <div style="text-align: right; margin-top: 20px">
          <el-button type="primary" round @click="submit">提交</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const mainTask = ref('')
const mainTaskOptions = ref([
  {
    value: '发动机',
    label: '发动机'
  }, {
    value: '转向架',
    label: '转向架'
  }
])
const subTask = ref('')
const subTaskOptions = ref([
  {
    value: 'WOS001',
    label: 'WOS001'
  }, {
    value: 'WOS002',
    label: 'WOS002'
  }
])
const url = ref('')
const query = async () => {
  console.log(mainTask.value)
  console.log(subTask.value)
  url.value = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
}
const submit = async () => {
  console.log(mainTask.value)
  console.log(subTask.value)
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
