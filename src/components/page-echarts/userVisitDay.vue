<template>
  <div class="tapNumEcharts">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watchEffect } from "vue";
import baseEchart from "@/base-ui/echart/src/base-echart.vue";
import * as echarts from "echarts";

import { getCurrentDetailTime } from "@/utils/time";
export default defineComponent({
  props: {
    values: {
      type: Array,
      default: () => [],
    },
    xLabels: {
      type: Array,
      default: () => [],
    },
  },
  components: { baseEchart },
  setup(props) {
    let options = ref({});
    const handleMessage = (e: any) => {
      let xData: any = [];
      let yData: any = [];
      let startValue: any = "00:00";
      let endValue: any = "06:00";
      let hh = new Date().getHours();
      const week = ["周一", "周二", "周三", "周四", "周五", "周六", "周天"];
      let date = new Date();
      let dateDay = date.getDay();
      if (dateDay == 0) {
        dateDay = 7;
      }
      const currentData = getCurrentDetailTime();
      const time = currentData + "\xa0" + week[dateDay - 1];
      e.forEach((item: any) => {
        xData.push(Object.keys(item)[0]);
        let key = "";
        if (Object.keys(item)[0].slice(-5, 2)[0] == "0") {
          key = Object.keys(item)[0].slice(-5, 2).replace("0", "");
        } else {
          key = Object.keys(item)[0].slice(-5, 2);
        }

        if (Object.values(item)[0] == 0 && parseInt(key) > hh) {
          yData.push(null);
        } else {
          yData.push(Object.values(item)[0]);
        }
      });

      if (hh < 6) {
        startValue = "00:00";
        endValue = "06:00";
      } else if (hh < 9) {
        startValue = "06:00";
        endValue = "12:00";
      } else if (hh < 12) {
        startValue = "09:00";
        endValue = "15:00";
      } else if (hh < 15) {
        startValue = "12:00";
        endValue = "18:00";
      } else if (hh < 18) {
        startValue = "15:00";
        endValue = "21:00";
      } else if (hh <= 23.59) {
        startValue = "18:00";
        endValue = "23:00";
      }
      options.value = {
        title: {
          text: time,
          textStyle: {
            color: "#fff", // 文字颜色
          },
          left:20,
          top:20
        },
       
        grid: {
          left: "5%",
          right: "10%",
          top: "20%",
          bottom: "15%",
          containLabel: true,
        },
        tooltip: {
          show: true,
          trigger: "axis",
        },
        dataZoom: [
          //滚动条
          {
            show: true,
            startValue: startValue,
            endValue: endValue,
          },
        ],
        xAxis: [
          {
            type: "category",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#85C1D9",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "#8BC4F2",
              margin: 6,
            },
            splitLine: {
              show: false,
            },
            boundaryGap: ["5%", "5%"],
            data: xData,
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "#8BC4F2",
              margin: 6,
            },
            splitLine: {
              lineStyle: {
                color: "#355C84",
                type: "dashed",
              },
            },
          },
        ],
        series: [
          {
            name: "访问量",
            type: "line",
            stack: "总量",
            symbolSize: 6,
            itemStyle: {
              color: "#55EFF1",
              borderColor: "#55EFF1",
              borderWidth: 2,
            },
            data: yData,
          },
        ],
      };
    };

    watchEffect(() => {
      handleMessage(props.values);
    });

    return {
      options,
      handleMessage,
    };
  },
});
</script>
<style lang="scss"></style>
