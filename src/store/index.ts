import { createStore, Store, useStore as useVuexStore } from "vuex";

import login from "./login/login";
import system from "./main/system/system";
import analysis from "./main/analysis/analysis";
import videoCenter from "./main/videoCenter/videoCenter";
import appManage from "./main/appManage/appManage"
import localCache from "@/utils/cache";

import {
  getAuthorityList,
  getRoleList,
  deleteRole,
  editRole,
  addRole,
} from "@/service/main/authority/authority";

import { IRootState, IStoreType } from "./types";

const store = createStore<IRootState>({
  state() {
    return {
      authorityList: [],
      roleList: [],
      userMenu:[],
      detailAuthority:[]
    };
  },
  mutations: {
    keepAuthorityList(state: IRootState, authorityList: any) {
      state.authorityList = authorityList;
    },
    keepRoleList(state: IRootState, roleList: any) {
      state.roleList = roleList;
    },
    keepDetailAuthority(state: IRootState, detailAuthority: any) {
      //console.log(detailAuthority);
      state.detailAuthority = detailAuthority;
    }
  },
  getters: {},
  actions: {
    async getAuthorityList({ commit }, payload) {
      const authorityList = await getAuthorityList("/getAuthorityList");
      commit("keepAuthorityList", authorityList);

      const roleList = await getRoleList("/getRoleList");
      commit("keepRoleList", roleList);
    },
    async deleteRole({ commit, dispatch }, payload) {
      const result = await deleteRole("/deleteRole", payload);
      dispatch("getAuthorityList");
    },
    async editRole({ commit, dispatch }, payload) {
      // console.log(payload);

      const { id, formValue, authorityList } = payload;
      editRole("/editRole", { id, formValue, authorityList });

      dispatch("getAuthorityList");
    },
    async addRole({ commit, dispatch }, payload) {
      const { newData } = payload;
      addRole("/addRole", newData);
      dispatch("getAuthorityList");
    },
    async detailAuthority({ commit }, payload) {
       commit("keepDetailAuthority", payload);
       localCache.setCache("detailAuthority",payload);
    },
    async localStorageDetailAuthority({ commit },payload) {
       const detailAuthority = localCache.getCache("detailAuthority");
       commit("keepDetailAuthority", detailAuthority);
    }
  },
  modules: {
    login,
    system,
    videoCenter,
    analysis,
    appManage
  },
});

export function setupStore() {
  store.dispatch("login/loadLocalLogin");
  store.dispatch("getAuthorityList")
  store.dispatch("localStorageDetailAuthority")
}

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
