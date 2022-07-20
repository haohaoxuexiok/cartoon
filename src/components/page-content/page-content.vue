<template>
  <div id="page-content">
    <div class="content">
      <hy-table
        :listData="list"
        :propList="tableConfig!.propList"
        :userCount="total"
        v-bind="tableConfig"
        v-model:page="pageInfo"
      >
        <template #headerHandler>
          <el-button
            class="btn"
            type="primary"
            @click="handleNewClick"
            v-if="
              detailAuthority.includes('增加人员') ||
              detailAuthority.includes('增加角色') ||
              detailAuthority.includes('添加轮播图')
            "
          >
            {{ tableConfig?.rightTitle }}
          </el-button>
        </template>
        <template #createAt="scope">
          <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
        </template>
        <template #updateAt="scope">
          <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
        </template>
        <template #state="scope">
          <el-button
            :type="scope.row.state == '启用' ? 'success' : 'danger'"
            @click="changeStates(scope.row)"
            v-if="
              detailAuthority.includes('用户状态修改') ||
              detailAuthority.includes('修改人员状态')
            "
          >
            {{ scope.row.state }}
          </el-button>
        </template>
        <template #handler="scope">
          <div class="handle-btns">
            <el-button
              type="primary"
              @click="handleEditClick(scope.row)"
              v-if="
                detailAuthority.includes('修改人员') ||
                detailAuthority.includes('修改角色') ||
                detailAuthority.includes('修改视频') ||
                detailAuthority.includes('修改轮播图')
              "
            >
              编辑
            </el-button>
            <el-popconfirm
              v-if="
                detailAuthority.includes('删除人员') ||
                detailAuthority.includes('删除角色') ||
                detailAuthority.includes('删除视频') ||
                detailAuthority.includes('删除轮播图')
              "
              confirm-button-text="Yes"
              cancel-button-text="No"
              icon="InfoFilled"
              icon-color="#626AEF"
              title="确认删除?"
              @confirm="confirmEvent(scope.row)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  @click="handleDeleteClick"
                  v-if="
                    detailAuthority.includes('删除人员') ||
                    detailAuthority.includes('删除角色') ||
                    detailAuthority.includes('删除视频') ||
                    detailAuthority.includes('删除轮播图')
                  "
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>

        <template #expand="scope" key="expand">
          <slot name="expandMessage" :row="scope.row"></slot>
        </template>

        <template
          v-for="item in otherPropSlots"
          :key="item.prop"
          #[item.slotName!]="scope"
        >
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </hy-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref, watch } from "vue";
import { useStore } from "@/store";

import HyTable from "@/base-ui/table";
import { changeState } from "@/service/main/system/system";

import localCache from "@/utils/cache";
import { authorityMapLeafKeys, result } from "@/utils/authorityList";

import { tableType } from "@/views/main/system/user/config/type";

export default defineComponent({
  name: "users",
  props: {
    tableConfig: {
      type: Object as unknown as PropType<tableType>,
      require: true,
    },
    path: {
      type: String,
      require: true,
    },
  },
  components: {
    HyTable,
  },
  emits: ["deleteBtnClick", "editBtnClick", "newBtnClick"],
  setup(props, { emit }) {
    const store = useStore();
    const pageInfo = ref({ currentPage: 1, pageSize: 10 });

    const results = computed(() => {
      return result(store.state.login.staffAuthority.authorityList);
    });

    const detailAuthority: any = computed(() => {
      return store.state.detailAuthority;
    });

    watch(pageInfo, (newValue, oldValue) => {
      const { currentPage, pageSize } = newValue;
      //储存当前的页脚的状态
      const queryInfo = {
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
      };
      getPageListData(queryInfo);
    });
    const queryInfo = {
      limit: 10,
      //offsetParent：获取带有定位的最近父元素
      offset: 0,
    };

    let storePath = ref();
    if (props.path == "/userMessage" || props.path == "/getStaffList") {
      storePath.value = "system";
    } else if (props.path == "/videoMessage") {
      storePath.value = "videoCenter";
    } else if (props.path == "/getAppSwiper") {
      storePath.value = "appManage";
    }
    const getPageListData = (queryInfo?: object) => {
      if (storePath.value) {
        store.dispatch(`${storePath.value}/getPageListAction`, {
          pageName: props.path,
          queryInfo: {
            ...queryInfo,
          },
        });
      }
    };
    getPageListData(queryInfo);

    const userInfo = computed(() => {
      const list = ref();
      const total = ref();

      if (props.path == "/userMessage") {
        list.value = store.state.system.userList;
        total.value = store.state.system.userCount;
      } else if (props.path == "/videoMessage") {
        list.value = store.state.videoCenter.videoList;
        total.value = store.state.videoCenter.videoCount;
      } else if (props.path == "/getAuthorityList") {
        list.value = store.state.authorityList;
        total.value = 0;
      } else if (props.path == "/getRoleList") {
        list.value = store.state.roleList;
        total.value = 0;
      } else if (props.path == "/getStaffList") {
        list.value = store.state.system.staffList;
        total.value = store.state.system.staffCount;
      } else if (props.path == "/getAppSwiper") {
        list.value = store.state.appManage.appSwiper;
        total.value = 0;
      }

      return {
        list: list.value,
        total: total.value,
      };
    });
    const list = computed(() => userInfo.value.list);
    const total = computed(() => userInfo.value.total);

    //改变用户的状态
    const changeStates = (message: any) => {
      if (message.state == "启用") {
        localCache.setCache("state", "禁用");
        message.state = "禁用";
      } else {
        message.state = "启用";
        localCache.setCache("state", "启用");
      }
      if (props.path == "/userMessage") {
        changeState("/changeUserState", message.name, message.state);
      } else if (props.path == "/getStaffList") {
        changeState("/changeStaffState", message.name, message.state);
      }
    };

    const handleDeleteClick = (value: any) => {
      // emit("deleteBtnClick", value);
    };

    const handleEditClick = (value: any) => {
      console.log(value);

      emit("editBtnClick", value);
    };

    const handleNewClick = () => {
      emit("newBtnClick");
    };

    const confirmEvent = (value: any) => {
      emit("deleteBtnClick", value);
    };
    const otherPropSlots = props.tableConfig?.propList.filter((item: any) => {
      if (item.slotName === "state") return false;
      if (item.slotName === "createAt") return false;
      if (item.slotName === "updateAt") return false;
      if (item.slotName === "handler") return false;
      return true;
    });
    return {
      //userList,
      list,
      changeStates,
      total,
      pageInfo,
      getPageListData,
      userInfo,
      handleDeleteClick,
      handleEditClick,
      handleNewClick,
      otherPropSlots,
      confirmEvent,
      results,
      detailAuthority,
    };
  },
});
</script>

<style scoped lang="scss">
.content {
  position: relative;
}
.btn {
  float: right;
  margin-bottom: 20px;
}
</style>
