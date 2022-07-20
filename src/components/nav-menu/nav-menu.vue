<template>
  <div id="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/image/logo.png" alt="logo" />
      <span class="title">爱动漫管理系统</span>
    </div>
    <el-menu
      :default-active="$route.path"
      router
      background-color="#001529"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      class="el-menu-vertical"
     
    >
      <template v-for="(item, index) in menuLists" :key="index">
        <el-sub-menu :index="item.name">
          <template #title>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="(child, index) in item.children" :key="index">
            <el-menu-item :index="child.menuUrl"  @click="handleClick(child.menuUrl)">
              <span>{{ child.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "@/store";
import router from "@/router";
import {useRoute} from 'vue-router'
import localCache from "@/utils/cache";
export default defineComponent({
  components: {},
  setup() {
    const store = useStore();

    const menuLists = computed(() => {
      return store.state.login.staffAuthority.authorityList;
    });
    const route=useRoute();

  
   
   
    const detailAuthority = ref([""]);
    const handleClick = (path: any) => {
      const toPath = router.currentRoute.value.path;
      detailAuthority.value = []
      store.state.login.staffAuthority.authorityList.forEach((item: any) => {
        item.children.forEach((child: any) => {
          if (child.menuUrl === path) {
            child.children.forEach((detail:any) => {
               detailAuthority.value.push(detail.name);
            });
          }
        });
      store.dispatch("detailAuthority", detailAuthority.value);  
      });

      if (
        localCache.getCache("token") &&
        localCache.getCache("state") == "启用"
      ) {
        return;
      } else {
        router.push("/login");
      }
    };
    return {
      handleClick,
      menuLists,
    };
  },
});
</script>

<style scoped lang="scss">
#nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 50px;
    padding: 10px 5px 8px 5px;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // hover 高亮

  :deep().el-menu-item {
    background-color: #0c2135 !important;
  }
  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
