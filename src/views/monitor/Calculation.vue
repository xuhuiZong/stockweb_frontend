<template>
  <div class="monitor-calculation">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane v-for="item in tabList" :key="item.id" :label="(item.type==='product' ? '产品任务' : '车间任务') + item.id" :name="item.id">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ (item.type==='product' ? '产品任务' : '车间任务') + item.id + '计算状态' }}</span>
            </div>
          </template>
          <el-row :gutter="20" style="margin-top: 10px">
            <el-col :span="4" style="text-align: right;">
              调度服务状态：
            </el-col>
            <el-col :span="20">
              <el-tag v-if="item.rate<1" class="ml-2" type="warning">进行中</el-tag>
              <el-tag v-else class="ml-2" type="success">已完成</el-tag>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 10px; display:flex">
            <el-col :span="4" style="text-align: right; align-self:center;">
              调度服务进度：
            </el-col>
            <el-col :span="20">
              <el-progress type="dashboard" :percentage="item.rate*100" :color="colors" />
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const tabList = ref([
  {
    id: 'WOS001',
    type: 'product',
    rate: 0.3
  }, {
    id: 'WOS002',
    type: 'product',
    rate: 0.6
  }, {
    id: 'JOBS001',
    type: 'workshop',
    rate: 0.9
  }, {
    id: 'JOBS002',
    type: 'workshop',
    rate: 1
  }
])
const activeName = ref(tabList.value[0].id)
const colors = [
  { color: '#f56c6c', percentage: 40 },
  { color: '#e6a23c', percentage: 70 },
  { color: '#5cb87a', percentage: 100 }
]
</script>

<style lang="scss" scoped></style>
