<template>
  <div class="tapNumEcharts">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watchEffect } from "vue";
import baseEchart from "@/base-ui/echart/src/base-echart.vue";
import * as echarts from "echarts";
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
      const xData: any = [];
      const yData: any = [];
      let year = new Date().getFullYear();
      const title = `${year}各月用户活跃度`;

      let month = new Date().getMonth();
      const x: any = [];
      for (let i = 0; i < month; i++) {
        x.push(1);
      }
      props.values.forEach((item: any) => {
        xData.push(`${Object.keys(item)[0]}月`);
        if (parseInt(Object.keys(item)[0]) > month) {
          yData.push("null");
        } else {
          yData.push(Object.values(item)[0]);
        }
      });
      options.value = {
        title: {
          text: title,
          textStyle: {
            color: "#fff", // 文字颜色
          },
          left: 20,
          top: 10,
        },
        
        textStyle: {
          color: "#c0c3cd",
          fontSize: 14,
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {
              backgroundColor: "#031245",
            },
            restore: {},
          },
          iconStyle: {
            borderColor: "#c0c3cd",
          },
        },
        legend: {
          top: 10,
          itemWidth: 8,
          itemHeight: 8,
          icon: "circle",
          left: "center",
          padding: 0,
          textStyle: {
            color: "#c0c3cd",
            fontSize: 14,
            padding: [2, 0, 0, 0],
          },
        },
        color: ["#00D7E9", "rgba(0, 215, 233, 0.9)"],
        grid: {
          containLabel: true,
          left: 20,
          right: 20,
          bottom: 10,
          top: 60,
        },
        xAxis: {
          nameTextStyle: {
            color: "#c0c3cd",
            padding: [0, 0, -10, 0],
            fontSize: 14,
          },
          axisLabel: {
            color: "#c0c3cd",
            fontSize: 12,
            interval: 0,
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: "#384267",
              width: 1,
            },
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#335971",
            },
            show: true,
          },
          data: xData,
          type: "category",
        },
        yAxis: {
          nameTextStyle: {
            color: "#c0c3cd",
            padding: [0, 0, -10, 0],
            fontSize: 14,
          },
          axisLabel: {
            color: "#c0c3cd",
            fontSize: 10,
          },
          axisTick: {
            lineStyle: {
              color: "#668092",
              width: 1,
            },
            show: true,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#335971",
              // "type": "dashed"
            },
          },
          axisLine: {
            lineStyle: {
              color: "#668092",
              width: 1,
              // "type": "dashed"
            },
            show: true,
          },
          name: "",
        },
        series: [
          {
            data: yData,
            type: "bar",
            barMaxWidth: "auto",
            barWidth: 30,
            itemStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: "linear",
                colorStops: [
                  {
                    offset: 0,
                    color: "#0D5EB1",
                  },
                  {
                    offset: 1,
                    color: "#00D7E9",
                  },
                ],
              },
            },
            label: {
              show: true,
              position: "top",
              distance: 10,
              color: "#fff",
            },
          },
          {
            data: x,
            type: "pictorialBar",
            barMaxWidth: "20",
            symbol: "diamond",
            symbolOffset: [0, "50%"],
            symbolSize: [30, 15],
          },
          {
            data: yData,
            type: "pictorialBar",
            barMaxWidth: "20",

            symbolPosition: "end",
            symbol: "diamond",
            symbolOffset: [0, "-50%"],
            symbolSize: [30, 12],
            zlevel: 2,
          },
        ],
        tooltip: {
          show: true,
          formatter: "数据:{c0}",
        },
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
