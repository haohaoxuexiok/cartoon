<template>
  <div class="page-search" v-if="detailAuthority.includes('查询用户')
    ||detailAuthority.includes('查询人员')
    ||detailAuthority.includes('查询角色')
    ||detailAuthority.includes('查询视频')">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1 class="header">{{ title }}</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick">
            <el-icon><Refresh /></el-icon>
            <span>重置</span>
          </el-button>
          <el-button type="primary" @click="handleQueryClick">
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref,computed } from "vue";
import { useStore } from "@/store";

import HyForm from "@/base-ui/form";
export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    HyForm,
  },
  emits: ["handleResetClick", "handleQueryClick"],
  setup(props, { emit }) {
   const store = useStore();
   const detailAuthority: any = computed(() => {
      return store.state.detailAuthority;
    });
    const formItems = props.searchFormConfig?.formItems ?? [];
    const formOriginData: any = {};
    for (const item of formItems) {
      formOriginData[item.field] = "";
    }
    const formData = ref(formOriginData);

    const handleResetClick = () => {
      for (const key in formOriginData) {
        formData.value[`${key}`] = formOriginData[key];
      }

      emit("handleResetClick");
    };
    const handleQueryClick = () => {
      //console.log(formData.value);
      emit("handleQueryClick", formData.value);
    };


    
    return {
      formData,
      handleResetClick,
      handleQueryClick,
      detailAuthority
    };
  },
});
</script>

<style scoped>
.header {
  color: #6495ed;
  text-align: center;
}
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
