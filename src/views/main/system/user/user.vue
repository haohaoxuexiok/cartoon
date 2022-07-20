<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      title="用户查询"
      @handleQueryClick="handleQueryClick"
      @handleResetClick="handleResetClick"
    /> 
    <div class="content">
      <page_content
        ref="contentRef"
        :tableConfig="tableConfig" 
        path="/userMessage"
      
      ></page_content>
    </div>
   
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "@/store";

import PageSearch from "@/components/page-search";
import page_content from "@/components/page-content/page-content.vue";

import { searchUserMessage } from "@/service/main/system/system";

import { searchFormConfig } from "./config/search.config";
import { tableConfig } from "./config/table.config";

export default defineComponent({
  name: "users",
  components: {
    PageSearch,
    page_content,
  },
  setup() {
    const contentRef = ref<InstanceType<typeof page_content>>();
    const store = useStore();
    const handleQueryClick = (value: object) => {
      searchUserMessage("/searchUserMessage", value).then((res) => {
        store.commit("system/keepUserList", res.list);
        store.commit("system/keepUserCount", res.total);
      });
    };
    const handleResetClick = () => {
      contentRef.value?.getPageListData();
    };

 
    return {
      tableConfig,
      searchFormConfig,
      handleQueryClick,
      handleResetClick,
      contentRef,
    };
  },
});
</script>

<style scoped>
.content {
  padding: 30px;
  border-top: 20px solid #f0f2f5;
}
</style>
