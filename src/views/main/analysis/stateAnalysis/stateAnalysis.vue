<template>
  <div id="stateAnalysis">
    <div class="content">
      <div class="top">
        <div class="left">
          <user-visit-month :values="userVisitRecordMonth"></user-visit-month>
        </div>
        <div class="center">
          <div class="title">当前用户总数：</div>
          <div class="total">{{ userTotal }}</div>
        </div>
        <div class="right">
          <user-visit-week :values="userVisitRecordWeek"></user-visit-week>
        </div>
      </div>
      <div class="footer">
        <user-visit-day :values="userVisitRecordData"></user-visit-day>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";

import userVisitDay from "@/components/page-echarts/userVisitDay.vue";
import userVisitMonth from "@/components/page-echarts/userVisitMonth.vue";
import userVisitWeek from "@/components/page-echarts/userVisitWeek.vue";

import { getCurrentTime } from "../../../../utils/time";
export default defineComponent({
  components: {
    userVisitDay,
    userVisitMonth,
    userVisitWeek,
  },
  setup() {
    const store = useStore();
    store.dispatch("analysis/getEchartsAction", {
      pageName: "/getUserVisitRecord",
      time: getCurrentTime(),
    });
    store.dispatch("analysis/getEchartsAction", {
      pageName: "/getUserVisitRecordMonth",
      time: getCurrentTime().slice(0, 4),
    });
    store.dispatch("analysis/getEchartsAction", {
      pageName: "/getUserVisitRecordWeek",
      time: getCurrentTime(),
    });
    store.dispatch("analysis/getEchartsAction", {
      pageName: "/getUserTotal",
    });

    const userVisitRecordData = computed(() => {
      return store.state.analysis.userVisitRecord;
    });
    const userVisitRecordMonth = computed(() => {
      return store.state.analysis.userVisitRecordMonth;
    });
    const userVisitRecordWeek = computed(() => {
      return store.state.analysis.userVisitRecordWeek;
    });
    const userTotal = computed(() => {
      return store.state.analysis.userTotal;
    });
    return {
      userVisitRecordData,
      userVisitRecordMonth,
      userVisitRecordWeek,
      userTotal,
    };
  },
});
</script>

<style scoped lang="scss">
@font-face {
  font-family: electronicFont;
  src: url(./DS-DIGIT.TTF);
}
#stateAnalysis {
  padding: 20px;
  background: url("@/~assets/image/bg.jpg");
  .content {
    display: flex;
    flex-direction: column;

    .top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .left {
        width: 38%;
        background: url("@/~assets/image/line(1).png") rgba(255, 255, 255, 0.05);
      }
      .center {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 20%;
        font-family: 'electronicFont';
        background: url("@/~assets/image/line(1).png") rgba(255, 255, 255, 0.05);
        .title{
          font-size: 20px;
          color: #fff;
          font-weight: bold;
          margin-top: 20px;
        }
        .total {
          color: #ffeb7b;
          font-size: 80px;
          font-weight: bold;
          font-family: "electronicFont";
        }
      } 
      .right {
        width: 38%;
        background: url("@/~assets/image/line(1).png") rgba(255, 255, 255, 0.05);
      }
    }
    .footer {
      margin-top: 20px;
      background: url("@/~assets/image/line(1).png") rgba(255, 255, 255, 0.05);
    }
  }
}
</style>
