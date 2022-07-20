<template>
  <div id="staff">
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
        path="/getStaffList"
        @editBtnClick="handleEditData"
        @deleteBtnClick="handleDeleteData"
        @newBtnClick="handleNewData"
      ></page_content>
    </div>
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfigRef"
      pageName="/getStaffList"
    >
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "@/store";

import { modalConfig } from "./config/modal.config";
import { tableConfig } from "./config/table.config";
import { searchFormConfig } from "./config/search.config";

import {searchStaff} from "@/service/main/system/system";

import page_content from "@/components/page-content/page-content.vue";

import { usePageModal } from "@/hook/use-page-modal";
export default defineComponent({
  components: {
    page_content,
  }, 
  setup() { 
    const store = useStore();
    const { pageModalRef, defaultInfo, handleEditData, handleNewData } =
      usePageModal();
    const roleList = computed(() => {
      const roleList: any = [];
      store.state.roleList.forEach((item: any) => {
        roleList.push(item.roleName);
      });
      return roleList;
    });
    const modalConfigRef = computed(() => {
      const departmentItem: any = modalConfig.formItems?.find(
        (item: any) => item.field === "role"
      );
      departmentItem!.options = store.state.roleList.map((item: any) => {
        return { title: item.roleName, value: item.id };
      });
      return modalConfig;
    });

    const handleDeleteData = (value: any) => {
      store.dispatch("system/deleteStaff", {
        pageName: "/deleteStaff",
        id: value.id,
      });
    };
    
    
    const handleQueryClick = (value: object) => {
       searchStaff('/searchStaff',value).then((res) => {
        store.commit("system/keepStaffList", res.list);
        store.commit("system/keepStaffCount", res.total);
      });
    };
    const contentRef = ref<InstanceType<typeof page_content>>();
    const handleResetClick = () => {
      contentRef.value?.getPageListData();
    };
    return {
      tableConfig,
      modalConfigRef,
      defaultInfo,
      pageModalRef,
      handleEditData,
      roleList,
      handleDeleteData,
      handleNewData,
      handleQueryClick,
      handleResetClick,
      searchFormConfig,
      contentRef
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
