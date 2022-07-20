import { Module } from "vuex";
import { IRootState } from "@/store/types";
import { videoState } from "./types";

import {
  getVideoList,
  deleteVideo,
  editVideo
} from "@/service/main/videoCenter/videoCenter";

const videoCenterModule: Module<videoState, IRootState> = {
  namespaced: true,
  state() {
    return {
      videoList: [],
      videoCount: 0,
    };
  },
  mutations: {
    keepVideoCount(state, userCount: number) {
      state.videoCount = userCount;
    },
    keepVideoList(state, userList: any[]) {
      state.videoList = userList;
    },
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.对页面发送请求

      const pageResult = await getVideoList(payload.pageName, payload.queryInfo);

      const { total, videoList } = pageResult;
      
      commit("keepVideoList", videoList);
      commit("keepVideoCount", total);
    },
    async deletePageDataAction({ dispatch }, payload: any) {
      const { pageName, id } = payload;
      
      // 2.调用删除网络请求
      await deleteVideo(pageName, id);
        
      // 3.重新请求最新的数据
      dispatch("getPageListAction", {
        pageName:'/videoMessage',
        queryInfo: {
          limit:10,
          offset:0,
        },
      }); 
    },
    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData, id } = payload
     
      const pageUrl = `${pageName}/${id}`

      await editVideo(pageUrl, editData)
      // 2.请求最新的数据
      dispatch('getPageListAction', {
        pageName:'/videoMessage',
        queryInfo: {
          limit:10,
          offset:0,
        }
      })
    }
  },
};

export default videoCenterModule;
