<template>
  <div class="">
    <div class="logo-container">
      <el-avatar
        size="44"
        shape="square"
        :src="avatarpng"
      />
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">
        管理员
      </h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from './SidebarMenu'
import {} from 'vue'
import avatarpng from '@/assets/avatar.png'
</script>

<style lang="scss" scoped>
.logo-container {
  height: 44px;
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
