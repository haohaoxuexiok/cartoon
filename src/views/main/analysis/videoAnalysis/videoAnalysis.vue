<template>
  <div class="dashboard">
    <div class="header">
      <img src="~assets/image/head_bg.png" alt="" />
      <span>数据分析</span>
    </div> 
    <el-row class="top">
      <el-col :span="11" class="echarts">
        <tap-num-echart :values="tapNum"></tap-num-echart>
        <div class="space"></div>
      </el-col>
      <el-col :span="11" class="echarts">
        <category-rank-echarts :values="categoryRank"></category-rank-echarts>
        <div class="space"></div>
      </el-col>
    </el-row> 

    <el-row class="footer">
      <el-col :span="11" class="echarts">
        <hot-search-rank-vue :values="hotSearchRank"></hot-search-rank-vue>
        <div class="space"></div>
      </el-col>
      <el-col :span="11" class="echarts">
        <category-video-num-vue
          :values="categoryVideoNum"
        ></category-video-num-vue>
        <div class="space"></div>
      </el-col>
    </el-row>
  </div>
</template> 

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";

import hycard from "@/base-ui/card/index";
import tapNumEchart from "@/components/page-echarts/tapNumEchart.vue";
import categoryRankEcharts from "@/components/page-echarts/categoryRankEchart.vue";
import hotSearchRankVue from "@/components/page-echarts/hotSearchRank.vue";
import categoryVideoNumVue from "@/components/page-echarts/categoryVideoNum.vue";
export default defineComponent({
  name: "dashboard",
  components: {
    hycard,
    tapNumEchart,
    categoryRankEcharts,
    hotSearchRankVue,
    categoryVideoNumVue,
  },
  setup() {
    const store = useStore();

    store.dispatch("analysis/getEchartsAction", {
      pageName: "/order",
    });
    store.dispatch("analysis/getEchartsAction", {
      pageName: "/getCategoryRank",
    });
    store.dispatch("analysis/getEchartsAction", {
      pageName: "/getHotSearchRank",
    });
    store.dispatch("analysis/getEchartsAction", {
      pageName: "/getCategoryVideoNumList",
    });
    const tapNum = computed(() => {
      return store.state.analysis.tapNum;
    });
    const categoryRank = computed(() => {
      return store.state.analysis.categoryRank;
    });
    const hotSearchRank = computed(() => {
      return store.state.analysis.hotSearchRank;
    });
    const categoryVideoNum = computed(() => {
      return store.state.analysis.categoryVideoNumList;
    });
    return {
      tapNum,
      categoryRank,
      hotSearchRank,
      categoryVideoNum,
    };
  },
});
</script>

<style scoped lang="scss">
.dashboard {
  background: url("@/~assets/image/bg.jpg");
  color: #fff !important;
  .header {
    position: relative;
    img {
      height: 100%;
      width: 100%;
    }
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 30px;
      font-weight: bold;
    }
  }

  .top,
  .footer {
    display: flex;
    justify-content: space-evenly;
    .echarts {
      position: relative;
      padding: 10px;
      margin-bottom: 10px;
      background: url("@/~assets/image/line(1).png") rgba(255, 255, 255, 0.05);
      box-sizing: border-box;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 15px;
        height: 15px;
        border-left: 2px solid #02a6b5;
        border-top: 2px solid #02a6b5;
      }
      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 15px;
        height: 15px;
        border-right: 2px solid #02a6b5;
        border-top: 2px solid #02a6b5;
      }
      .space {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 15px;
          height: 15px;
          border-left: 2px solid #02a6b5;
          border-bottom: 2px solid #02a6b5;
        }
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          right: 0;
          width: 15px;
          height: 15px;
          border-right: 2px solid #02a6b5;
          border-bottom: 2px solid #02a6b5;
        }
      }
    }
  }
}
.el-card {
  background: rgba(0, 0, 0, 0);
}
</style>
