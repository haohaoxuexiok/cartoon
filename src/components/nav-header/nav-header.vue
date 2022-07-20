<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <span>{{ name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="leave">退出登录</el-dropdown-item>
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import router from "@/router";

import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)
   // console.log(store.state.login.userInfo.name);
    const leave = () => {
          router.push("/login");
          localCache.clearCache()
    }
    return {
      name,
      leave
    }
  }
})
</script>

<style scoped lang="scss">
.user-info{
  text-align: right !important;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  line-height: 60px;
  cursor: pointer;
  span{
    margin-left: 5px;
  }
}
</style>
