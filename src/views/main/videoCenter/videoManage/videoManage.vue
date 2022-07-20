<template>
  <div id="videoMessage">
    <page-search
      :searchFormConfig="searchFormConfig"
      title="视频查询"
      @handleQueryClick="handleQueryClick"
      @handleResetClick="handleResetClick"
    />
  </div>
 
  <div class="content">
    <page_content
      ref="contentRef"
      :tableConfig="tableConfig"
      path="/videoMessage"
      @editBtnClick="handleEditData"
      @deleteBtnClick="handleDeleteData"
    ></page_content>
  </div>
 
  <page-modal
    ref="pageModalRef"
    :defaultInfo="defaultInfo"
    :modalConfig="modalConfig"
    pageName="/videoMessage"
  ></page-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";

import PageSearch from "@/components/page-search";
import page_content from "@/components/page-content/page-content.vue";

import { searchVideoMessage } from "@/service/main/videoCenter/videoCenter";

import { searchFormConfig } from "./config/search.config";
import { tableConfig } from "./config/table.config";
import { modalConfig } from "./config/modal.config";

import { usePageModal } from "@/hook/use-page-modal";
export default defineComponent({
  components: {
    PageSearch,
    page_content,
  },
  setup() {
    const contentRef = ref<InstanceType<typeof page_content>>();
    const store = useStore();
    const handleQueryClick = (value: object) => {
      searchVideoMessage("/searchVideoMessage", value).then((res) => {
        store.commit("videoCenter/keepVideoList", res.list);
        store.commit("videoCenter/keepVideoCount", res.total);
      });
    };
    const handleResetClick = () => {
      contentRef.value?.getPageListData();
    };
    
    const handleDeleteData = (value:any) => {
        store.dispatch('videoCenter/deletePageDataAction', {
        pageName:'/deleteVideo',
        id: value.id
      })
    } 
    
    const {pageModalRef, defaultInfo,handleEditData} = usePageModal();
    
    
    return {
      tableConfig,
      searchFormConfig,
      handleQueryClick,
      handleResetClick,
      contentRef,

      modalConfig,
      handleDeleteData,
      handleEditData,
      pageModalRef,
      defaultInfo,
    };
  },
});
</script>

<style scoped lang="scss">
.content {
  padding: 30px;
  border-top: 20px solid #f0f2f5;
}
</style>
