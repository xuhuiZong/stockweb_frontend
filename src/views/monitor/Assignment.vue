<template>
  <div class="monitor-assignment">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane v-for="item in tabList" :key="item.id" :label="(item.type==='product' ? '产品任务' : '车间任务') + item.id" :name="item.id">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ (item.type==='product' ? '产品任务' : '车间任务') + item.id + '分配状态' }}</span>
            </div>
          </template>
          <el-row :gutter="20" style="margin-top: 10px">
            <el-col :span="4" style="text-align: right;">
              任务分配状态：
            </el-col>
            <el-col :span="20">
              <el-tag v-if="item.rate<1" class="ml-2" type="warning">分配中</el-tag>
              <el-tag v-else class="ml-2" type="success">分配完成</el-tag>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 10px">
            <el-col :span="4" style="text-align: right;">
              任务分配进度：
            </el-col>
            <el-col :span="20">
              <el-progress
                :text-inside="true"
                :stroke-width="24"
                :percentage="item.rate*100"
                :status=" item.rate<1 ? 'warning' : 'success'"
              />
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
    rate: 0.95
  }, {
    id: 'WOS002',
    type: 'product',
    rate: 1
  }, {
    id: 'JOBS001',
    type: 'workshop',
    rate: 0.3
  }
])
const activeName = ref(tabList.value[0].id)
</script>

<style lang="scss" scoped></style>
