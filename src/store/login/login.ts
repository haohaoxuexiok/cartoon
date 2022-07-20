import { Module } from "vuex";

import { getUserInfo,getStaffAuthority } from "@/service/login/login";
import localCache from "@/utils/cache";
import router from "@/router";
import { IAccount } from "@/service/login/type";
import { ILoginState,authorityMessage } from "./types";
import { IRootState } from "../types";
import { ElMessage } from "element-plus";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userState: "",
      staffAuthority: [],
    };
  },
  getters: {},
  mutations: {
    keepToken(state, token: string) {
      state.token = token;
    },
    keepUserInfo(state, userInfo: string) {
      state.userInfo = userInfo;
    },
    keepStaffAuthority(state, staffAuthority:any) {
      state.staffAuthority = staffAuthority;
    },
    keepUserState(state, userState: any) {
      state.userState = userState;
    }
  },
  actions: {
    async loginAction({ commit }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await getUserInfo(payload);
      if (loginResult.token != undefined) {
        if (loginResult.state == "启用") {
        const { token } = loginResult;
        commit("keepToken", token);
        localCache.setCache("token", token);

        const {id,name,account,password,role} = loginResult;
        const userInfo = {id,name,account,password,role};
        commit("keepUserInfo", userInfo);
        localCache.setCache("userInfo", userInfo);
        
        const {state} = loginResult;
        commit("keepUserState", state);
        localCache.setCache("state", state);
        
        const staffAuthority = await getStaffAuthority(loginResult.role);
        commit("keepStaffAuthority", staffAuthority);
        localCache.setCache("staffAuthority", staffAuthority);
        
        router.push("/main/analysis/videoAnalysis");
        }else{
          ElMessage({
            showClose: true,
            message: '没有登录权限',
            type: 'warning',
          })
        }
      }
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache("token");
      if (token) {
        commit("keepToken", token);
      }
      const userInfo = localCache.getCache("userInfo");
      if (userInfo) {
        commit("keepUserInfo", userInfo);
      }
      const state = localCache.getCache("state");
      if (state) {
        commit("keepUserState", state);
      }
      const staffAuthority = localCache.getCache("staffAuthority");
      if (staffAuthority) {
        commit("keepStaffAuthority", staffAuthority);
      }
    },
  },
};

export default loginModule;
