import { Module } from "vuex";
import { IRootState } from "@/store/types";
import { IAnalysisState } from "./types";

import { getEchartsData } from "@/service/main/analysis/analysis";

import useWebSocket from "@/hook/websocket";
const analysisModule: Module<IAnalysisState, IRootState> = {
  namespaced: true,
  state() {
    return {
      tapNum: [],
      categoryRank: [],
      hotSearchRank:[],
      categoryVideoNumList:[],
      userVisitRecord:[],
      userVisitRecordMonth:[],
      userVisitRecordWeek:[],
      userTotal:0
    };
  },
  mutations: {
    keepTapNum(state, tapNum) {
      state.tapNum = tapNum.splice(0,10)
    },
    keepCategoryRank(state, categoryRank) {
      state.categoryRank = categoryRank;
    },
    keepHotSearchRank(state, hotSearchRank) {
      state.hotSearchRank = hotSearchRank;
    },
    keepCategoryVideoNumList(state, categoryVideoNumList) {
      state.categoryVideoNumList = categoryVideoNumList
    },
    keepUserVisitRecord(state, userVisitRecord) {
      state.userVisitRecord = userVisitRecord
    },
    keepUserVisitRecordMonth(state, userVisitRecordMonth) {
      state.userVisitRecordMonth = userVisitRecordMonth
    },
    keepUserVisitRecordWeek(state, userVisitRecordWeek) {
      state.userVisitRecordWeek = userVisitRecordWeek
    },
    keepUserTotal(state, userTotal) {
      state.userTotal = userTotal
    }
  },
  actions: {
    async getEchartsAction({ commit }, payload: any) {
     // console.log(payload);
      
      switch (payload.pageName) {
        case "/order":
          const tapNumData = await getEchartsData(payload.pageName);
          const tap = tapNumData.map((item: any) => {
            return {
              name: item.name,
              tapNum: item.tapNum,
            };
          });
          commit("keepTapNum", tap);
          break;
        case "/getCategoryRank":
          const categoryRankData = await getEchartsData(payload.pageName);
          commit("keepCategoryRank", categoryRankData);
          break;
        case "/getHotSearchRank":
          const hotSearchRankData = await getEchartsData(payload.pageName);
          commit("keepHotSearchRank", hotSearchRankData);
          break;
        case '/getCategoryVideoNumList':
          const categoryVideoNumList= await getEchartsData(payload.pageName);
          commit("keepCategoryVideoNumList", categoryVideoNumList);
          break;
        case '/getUserVisitRecord':
          const userVisitRecord= await getEchartsData(payload.pageName,payload.time);
          commit("keepUserVisitRecord", userVisitRecord);    
          break;
        case '/getUserVisitRecordMonth':
          const userVisitRecordMonth= await getEchartsData(payload.pageName,payload.time);
          commit("keepUserVisitRecordMonth", userVisitRecordMonth);
          break;
        case '/getUserVisitRecordWeek':
          const userVisitRecordWeek= await getEchartsData(payload.pageName,payload.time);
          commit("keepUserVisitRecordWeek", userVisitRecordWeek);
          break;
        case '/getUserTotal':
          const userTotal= await getEchartsData(payload.pageName);
          commit("keepUserTotal", userTotal);
        }

      const handleMessage = (e: any) => {
        if (JSON.parse(e.data).order&&JSON.parse(e.data).categoryRank) {
          const tapNum = JSON.parse(e.data).order;
          const categoryRank = JSON.parse(e.data).categoryRank;
          commit("keepTapNum", tapNum);
          commit("keepCategoryRank", categoryRank);
        }else if(JSON.parse(e.data).hotSearchRank){
          const hotSearchRank = JSON.parse(e.data).hotSearchRank;
          commit("keepHotSearchRank", hotSearchRank);
        }else if(JSON.parse(e.data).categoryVideoNumList){
          const categoryVideoNumList = JSON.parse(e.data).categoryVideoNumList;
          commit("keepCategoryVideoNumList", categoryVideoNumList);
        }else if(JSON.parse(e.data).userVisitRecord){
          const userVisitRecord = JSON.parse(e.data).userVisitRecord;
          commit("keepUserVisitRecord", userVisitRecord);
        }else if(JSON.parse(e.data).total){
          const userTotal = JSON.parse(e.data).total;
          commit("keepUserTotal", userTotal);
        }
      };
      useWebSocket(handleMessage);
    },
  },
};

export default analysisModule;
