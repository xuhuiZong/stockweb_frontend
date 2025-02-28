<template>
  <div class="">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>车间级任务信息</span>
        </div>
      </template>
      <el-upload
        class="upload-demo"
        drag
        :action="uploadUrl"
        multiple
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          拖拽文件到此处或者 <em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            仅支持csv格式的数据文件
          </div>
        </template>
      </el-upload>
      <el-form :model="form" label-width="135px" style="margin-top: 30px">
        <el-form-item label="自定义车间名称:">
          <el-input v-model="form.name" />
        </el-form-item>
        <span class="el-form-item__label">详细信息编制/修改：<el-button type="primary" round @click="showJobList">编辑</el-button></span>
      </el-form>
      <div style="text-align: center; margin-top: 20px">
        <el-button type="primary" round @click="submit">提交任务</el-button>
      </div>
    </el-card>
    <el-card class="box-card"  style="margin-top: 10px" v-show="jobListShow">
      <template #header>
        <div class="card-header">
          <span>车间作业调度设置</span>
        </div>
      </template>
      <el-table :data="form.jobList" height="300" border style="width: 100%">
        <el-table-column width="180" >
          <!-- 自定义表头 -->
          <template #header>
            <p>
              任务编号
            </p>
          </template>
          <!-- 自定义表项/单元格内容 -->
          <template #default="scope">
            <p>{{ scope.row.id }}
              <svg-icon icon="delete"
                        style="margin-left: 10px"
                        @click="deleteRow1(scope.row.id)" />
            </p>
          </template>
        </el-table-column>
        <el-table-column v-for="column in columnList1" :key="column.prop">
          <!-- 自定义表头 -->
          <template #header>
            <!-- 段落：show为true -->
            <p>
              {{column.label}}
            </p>
          </template>
          <!-- 自定义表项/单元格内容 -->
          <template #default="scope">
            <!-- 双击文字或点击修改图标以更改"show"属性 -->
            <!-- scope.row为元数据，column.col为该列的'键' -->
            <p v-show="scope.row[column.prop].show" @dblclick="scope.row[column.prop].show = false">
              {{scope.row[column.prop].content}}
              <svg-icon icon="editable"  @click="scope.row[column.prop].show = false"></svg-icon>
            </p>
            <!-- 失去焦点时更改"show"属性，显示文本 -->
            <el-input
              type="textarea"
              :autosize="{minRows:2,maxRows:4}"
              v-show="!scope.row[column.prop].show"
              v-model="scope.row[column.prop].content"
              @blur="scope.row[column.prop].show=true"
            />
          </template>
        </el-table-column>
        <el-table-column>
          <!-- 自定义表头 -->
          <template #header>
            <p>
              加工工艺路线
            </p>
          </template>
          <!-- 自定义表项/单元格内容 -->
          <template #default="scope">
            <el-button round @click="editTech(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="mt-4" style="width: 100%" @click="onAddItem1">增加车间作业</el-button>
    </el-card>
    <!-- 工序设置模态框 -->
    <el-dialog v-model="dialogTableVisible" title="工序设置">
      <el-table :data="form.jobList[currentIndex].technic" height="300" border style="width: 100%">
        <el-table-column width="180" >
          <!-- 自定义表头 -->
          <template #header>
            <p>
              工序编号
            </p>
          </template>
          <!-- 自定义表项/单元格内容 -->
          <template #default="scope">
            <p>{{ scope.row.id }}
              <svg-icon icon="delete"
                        style="margin-left: 10px"
                        @click="deleteRow2(scope.row.id)" />
            </p>
          </template>
        </el-table-column>
        <el-table-column v-for="column in columnList2" :key="column.prop">
          <!-- 自定义表头 -->
          <template #header>
            <!-- 段落：show为true -->
            <p>
              {{column.label}}
            </p>
          </template>
          <!-- 自定义表项/单元格内容 -->
          <template #default="scope">
            <!-- 双击文字或点击修改图标以更改"show"属性 -->
            <!-- scope.row为元数据，column.col为该列的'键' -->
            <p v-show="scope.row[column.prop].show" @dblclick="scope.row[column.prop].show = false">
              {{scope.row[column.prop].content}}
              <svg-icon icon="editable"  @click="scope.row[column.prop].show = false"></svg-icon>
            </p>
            <!-- 失去焦点时更改"show"属性，显示文本 -->
            <el-input
              type="textarea"
              :autosize="{minRows:2,maxRows:4}"
              v-show="!scope.row[column.prop].show"
              v-model="scope.row[column.prop].content"
              @blur="scope.row[column.prop].show=true"
            />
          </template>
        </el-table-column>
      </el-table>
      <el-button class="mt-4" style="width: 100%" @click="onAddItem2">增加工序</el-button>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
const form = ref({
  name: '',
  jobList: []
})
const jobs = ref(0)
const columnList1 = ref([
  { prop: 'name', label: '作业名称', show: true },
  { prop: 'time', label: '交付时限', show: true }
])
const columnList2 = ref([
  { prop: 'equipmentid', label: '设备编号', show: true },
  { prop: 'name', label: '设备名称', show: true },
  { prop: 'time', label: '交付时限', show: true }
])
const jobListShow = ref(false)
// 更换此处的上传接口
const uploadUrl = ref('https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15')
const showJobList = () => {
  jobListShow.value = true
}
const onAddItem1 = () => {
  jobs.value += 1
  let newid = ''
  if (jobs.value < 10) {
    newid = 'JOBS00' + jobs.value
  } else if (jobs.value < 100) {
    newid = 'JOBS0' + jobs.value
  } else {
    newid = 'JOB' + jobs.value
  }
  form.value.jobList.push({
    id: newid,
    name: { content: 'null', show: true },
    time: { content: 'null', show: true },
    technic: [],
    technics: 0
  })
}
const submit = async () => {
  console.log(form.value)
}
const deleteRow1 = (rowid) => {
  for (let i = 0; i < form.value.jobList.length; i++) {
    if (form.value.jobList[i].id === rowid) {
      form.value.jobList.splice(i, 1)
    }
  }
}
const dialogTableVisible = ref(false)
const currentIndex = ref(0)
const editTech = (rowid) => {
  for (let i = 0; i < form.value.jobList.length; i++) {
    if (form.value.jobList[i].id === rowid) {
      currentIndex.value = i
    }
  }
  dialogTableVisible.value = true
}
const onAddItem2 = () => {
  form.value.jobList[currentIndex.value].technics += 1
  let newid = ''
  if (form.value.jobList[currentIndex.value].technics < 10) {
    newid = form.value.jobList[currentIndex.value].id + '00' + form.value.jobList[currentIndex.value].technics
  } else if (form.value.jobList[currentIndex.value].technics < 100) {
    newid = form.value.jobList[currentIndex.value].id + '0' + form.value.jobList[currentIndex.value].technics
  } else {
    newid = form.value.jobList[currentIndex.value].id + '' + form.value.jobList[currentIndex.value].technics
  }
  form.value.jobList[currentIndex.value].technic.push({
    id: newid,
    equipmentid: { content: 'RS', show: true },
    name: { content: 'null', show: true },
    time: { content: 'null', show: true }
  })
}
const deleteRow2 = (rowid) => {
  for (let i = 0; i < form.value.jobList[currentIndex.value].technic.length; i++) {
    if (form.value.jobList[currentIndex.value].technic[i].id === rowid) {
      form.value.jobList[currentIndex.value].technic.splice(i, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
