<template>
  <div id="appSwiper">
    <div class="content">
      <page_content
        ref="contentRef"
        :tableConfig="tableConfig"
        @editBtnClick="handleEditData"
        @deleteBtnClick="handleDeleteData"
        @newBtnClick="handleNewData"
        path="/getAppSwiper"
      >
          <template #imgShow="scope">
          <img :src="scope.row.swiperImg" alt="" />
        </template>

      </page_content>
    </div>
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      pageName="/getAppSwiper"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "@/store";

import page_content from "@/components/page-content/page-content.vue";

import { tableConfig } from "./config/table.config";
import { modalConfig } from "./config/modal.config";

import { usePageModal } from "@/hook/use-page-modal";
export default defineComponent({
  components: {
    page_content,
  },
  setup() {
    const store = useStore();
    const handleDeleteData = (value: any) => {
      store.dispatch("appManage/deleteAppSwiper", {
        pageName: "/deleteAppSwiper",
        id: value.id,
      });
    };
    const { pageModalRef, defaultInfo, handleEditData,handleNewData } = usePageModal();

    return {
      tableConfig,
      handleEditData,
      handleDeleteData,
      pageModalRef,
      defaultInfo,
      modalConfig,
      handleNewData
    };
  },
});
</script>

<style scoped lang="scss">
.content {
  padding: 30px;
  border-top: 20px solid #f0f2f5;
}
#appSwiper img {
  height: 80px;
  width: 100px;
}
</style>
