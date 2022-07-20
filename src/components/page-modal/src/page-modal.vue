<template>
  <div class="page-modal">
    <el-dialog
      title="编辑用户"
      v-model="dialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <hy-form v-bind="modalConfig" v-model="formData"></hy-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useStore } from "@/store";

import HyForm from "@/base-ui/form";

export default defineComponent({
  components: {
    HyForm,
  },
  props: {
    modalConfig: {
      type: Object,
      required: true,
    },
    defaultInfo: {
      type: Object,
      default: () => ({}),
    },
    otherInfo: {
      type: Object,
      default: () => ({}),
    },
    pageName: {
      type: String,
      require: true,
    },
  },
  setup(props) {
    const dialogVisible = ref(false);
    const formData = ref<any>({});

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`];
        }
      }
    );
    // 点击确定按钮的逻辑
    const store = useStore();

    const handleConfirmClick = () => {
    
      dialogVisible.value = false;
      if (Object.keys(props.defaultInfo).length !== 0) {
        console.log(formData.value);
        
        if (props.pageName === "/videoMessage") {
          store.dispatch("videoCenter/editPageDataAction", {
            pageName: "/editVideo",
            editData: { ...formData.value },
            id: props.defaultInfo.id,
          });
        } else if (props.pageName === "/getRoleList") {
          store.dispatch("editRole", {
            id: props.otherInfo.id,
            formValue: formData.value,
            authorityList: props.otherInfo.authorityList,
          });
        } else if (props.pageName === "/getStaffList") {
          store.dispatch("system/editStaff", {
            pageName: "/editStaff",
            id: props.defaultInfo.id,
            editData: { ...formData.value },
          });
        }else if(props.pageName === "/getAppSwiper"){
          store.dispatch("appManage/editAppSwiper", {
            pageName: "/editAppSwiper",
            id: props.defaultInfo.id,
            editData: { ...formData.value },
          });
        }
      } else {
        if (props.pageName === "/getStaffList") {
          store.dispatch("system/addStaff", {
            pageName: "/addStaff",
            newData: { ...formData.value },
          });
        } else if (props.pageName === "/getRoleList") {
          store.dispatch("addRole", {
            newData: {
              ...formData.value,
              authorityList: props.otherInfo.authorityList,
            },
          });
        }else if(props.pageName === "/getAppSwiper"){
          store.dispatch("appManage/addAppSwiper", {
            pageName: "/addAppSwiper",
            newData: { ...formData.value },
          });
        }
      }
    };

    return {
      dialogVisible,
      formData,
      handleConfirmClick,
    };
  },
});
</script>

<style scoped></style>
