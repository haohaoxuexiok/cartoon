import { Module } from "vuex";
import { IRootState } from "@/store/types";
import { ISystemState } from "./types";

import {
  getUserList,
  editStaff,
  deleteStaff,
  addStaff,
} from "@/service/main/system/system";

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      staffList: [],
      staffCount: 0,
    };
  },
  mutations: {
    keepUserCount(state, userCount: number) {
      state.userCount = userCount;
    },
    keepUserList(state, userList: any[]) {
      state.userList = userList;
    },
    keepStaffCount(state, staffCount: number) {
      state.staffCount = staffCount;
    },
    keepStaffList(state, staffList: any[]) {
      state.staffList = staffList;
    },
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.对页面发送请求

      const pageResult = await getUserList(payload.pageName, payload.queryInfo);
      switch (payload.pageName) {
        case "/userMessage":
          const { total: userCount, userList } = pageResult;
          commit("keepUserList", userList);
          commit("keepUserCount", userCount);
          break;
        case "/getStaffList":
          const { total: staffCount, staffList } = pageResult;
          commit("keepStaffList", staffList);
          commit("keepStaffCount", staffCount);
          break;
      }
    },
    async editStaff({ commit, dispatch }, payload) {
      const { pageName, editData, id } = payload;

      const pageUrl = `${pageName}/${id}`;

      await editStaff(pageUrl, editData);
      // 2.请求最新的数据
      dispatch("getPageListAction", {
        pageName: "/getStaffList",
      });
    },
    async deleteStaff({ dispatch }, payload: any) {
      const { pageName, id } = payload;

      // 2.调用删除网络请求
      const pageUrl = `${pageName}/${id}`;

      await deleteStaff(pageUrl);
      // 3.重新请求最新的数据
      dispatch("getPageListAction", {
        pageName: "/getStaffList",
      });
    },
    async addStaff({ dispatch }, payload: any) {
      const { pageName, newData } = payload;
      
      await addStaff(pageName,newData);
      // 3.重新请求最新的数据
      dispatch("getPageListAction", {
        pageName: "/getStaffList",
      });
    },
  },
};

export default systemModule;
