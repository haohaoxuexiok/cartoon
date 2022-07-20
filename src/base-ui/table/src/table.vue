<template>
  <div class="hy-table">
    <div class="header" v-show="isShowHeader">
      <slot name="header">
        <div class="title">{{ leftTitle }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>

    <el-table 
      :data="listData"
      border
      style="width: 100%"
      v-bind="childrenProps"
    >
      <el-table-column type="expand" v-if="showExpand">
        <template #default="scope">
          <slot name="expand" :row="scope.row">
          </slot>
        </template>
      </el-table-column>

      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      >
      </el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              <template v-if="propItem.prop">
                {{ scope.row[propItem.prop] }}
              </template>
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { propListType } from "@/views/main/system/user/config/type";
export default defineComponent({
  props: {
    listData: {
      type: Array as PropType<any[]>,
      required: true,
    },
    propList: {
      //type: Array,
      type: Array as unknown as PropType<propListType[]>,
      required: true,
    },
    leftTitle: {
      type: String,
      default: "",
    },
    showFooter: {
      type: Boolean,
      default: true,
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 }),
    },
    userCount: {
      type: Number,
      default: "",
    },
    childrenProps: {
      type: Object,
      default: () => {}
    },
    showIndexColumn: {
      type: Boolean,
      default: true,
    },
    showExpand: {
      type: Boolean,
      default: false,
    },
    isShowHeader: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:page"],
  setup(props, { emit }) {
    const handleSizeChange = (pageSize: string) => {
      emit("update:page", { ...props.page, pageSize });
    };
    const handleCurrentChange = (currentPage: string) => {
      emit("update:page", { ...props.page, currentPage });
    };
    return {
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style scoped lang="scss">
.footer {
  position: relative;
  margin-top: 40px;
  .el-pagination {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}


</style>
