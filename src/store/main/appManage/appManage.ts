import { Module } from "vuex";
import { IRootState } from "@/store/types";
import { appManage } from "./types";

import {
  getAppSwiper,
  editAppSwiper,
  deleteAppSwiper,
  addAppSwiper
} from "@/service/main/appManage/appManage";

const appManageModule: Module<appManage, IRootState> = {
  namespaced: true,
  state() {
    return {
      appSwiper: [],
    };
  },
  mutations: {
    keepAppSwiper(state, swiperList) {
      state.appSwiper = swiperList;
    },
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const swiperList = await getAppSwiper(payload.pageName);

      commit("keepAppSwiper", swiperList);
    },
    async editAppSwiper({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload;

      const pageUrl = `${pageName}/${id}`;

      await editAppSwiper(pageUrl, editData);

      await dispatch("getPageListAction", {
        pageName: "/getAppSwiper",
      });
      // 2.请求最新的数据
    },
    async deleteAppSwiper({ dispatch }, payload: any) {
      const { pageName, id } = payload;

      // 2.调用删除网络请求
      const pageUrl = `${pageName}/${id}`;

      await deleteAppSwiper(pageUrl);
      // 3.重新请求最新的数据
      dispatch("getPageListAction", {
        pageName: "/getAppSwiper",
      });
    },
    async addAppSwiper({ dispatch }, payload: any) {
      const { pageName, newData } = payload;

      await addAppSwiper(pageName, newData);
      // 3.重新请求最新的数据
      dispatch("getPageListAction", {
        pageName: "/getAppSwiper",
      });
    },
  },
};

export default appManageModule;
