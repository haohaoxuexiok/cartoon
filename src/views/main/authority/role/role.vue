<template>
  <div id="role">
    <div class="content">
      <page_content
        ref="contentRef"
        :tableConfig="tableConfig"
        path="/getRoleList"
        @deleteBtnClick="deleteBtnClick"
        @editBtnClick="handleEditData"
        @newBtnClick="handleNewData"
      >
        <template #expandMessage="scope">
          <el-row
            v-for="(item, index) in scope.row.authorityList"
            class="el-row1"
            :key="index"
          >
            <el-col :span="5">
              <el-tag size="large">{{ item.name }}</el-tag>
              <el-icon><CaretRight /></el-icon>
            </el-col>
            <el-col :span="19">
              <el-row
                v-for="(item2, index2) in item.children"
                :key="index2"
                class="el-row2"
              >
                <el-col :span="5">
                  <el-tag type="success" size="large">{{ item2.name }}</el-tag>
                  <el-icon v-if="item2.children.length > 0"
                    ><CaretRight
                  /></el-icon>
                </el-col>
                <el-col :span="19" class="el-row3">
                  <el-tag
                    v-for="(item3, index) in item2.children"
                    :key="index"
                    type="warning"
                    size="large"
                  >
                    {{ item3.name }}</el-tag
                  >
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </page_content> 
    </div>
    <page-modal
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      pageName="/getRoleList"
      :otherInfo="otherInfo"
    >
      <el-tree
        :data="authorityList"
        show-checkbox
        node-key="id"
        :default-checked-keys="userAuthority"
        :props="{
          children: 'children',
          label: 'name',
        }"
        @check="handleCheckChange"
        ref="treeRef"
      />
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, nextTick } from "vue";
import { useStore } from "@/store";

import page_content from "@/components/page-content/page-content.vue";
import page_modal from "@/components/page-modal";

import { tableConfig } from "./config/table.config";
import { modalConfig } from "./config/modal.config";

import { usePageModal } from "@/hook/use-page-modal";
import { authorityMapLeafKeys } from "@/utils/authorityList";
export default defineComponent({
  components: {
    page_content,
    page_modal,
  },
  setup() {
    const store = useStore();
    const deleteBtnClick = (value: any) => {
      store.dispatch("deleteRole", value.id);
    };

    const otherInfo = {
      id: "",
      authorityList:[''],
    };

    const treeRef = ref();

    const userAuthority = ref();

    const edit = (value: any) => {
      nextTick(() => {
        otherInfo.authorityList = treeRef.value.getCheckedKeys();
      });

      otherInfo.id = value.id;
      userAuthority.value = authorityMapLeafKeys(value.authorityList);
    };
   

    const authorityList = computed(() => {
      return store.state.authorityList;
    });
    const { pageModalRef, defaultInfo, handleEditData,handleNewData} = usePageModal(edit);

    const handleCheckChange = (data1: any, data2: any) => {
      otherInfo.authorityList = [...data2.checkedKeys,...data2.halfCheckedKeys]
      
    }; 
    return {
      tableConfig,
      modalConfig,
      deleteBtnClick,
      defaultInfo,
      pageModalRef,
      handleEditData,
      handleNewData,
      authorityList,
      userAuthority,
      handleCheckChange,
      otherInfo,
      treeRef,
    };
  },
});
</script>

<style scoped lang="scss">
.content {
  padding: 30px;
  border-top: 20px solid #f0f2f5;
}
.el-tag--large {
  margin: 15px;
}

.el-row1 {
  margin: 0 50px;
  border-top: 1px solid #ebeef5;
}
.el-row1:last-child {
  border-bottom: 1px solid #ebeef5;
}
.el-row2 {
  border-bottom: 1px solid #ebeef5;
}
.el-row2:last-child {
  border-bottom: 0;
}
.el-col-5 {
  display: flex;

  align-items: center;
}
</style>
