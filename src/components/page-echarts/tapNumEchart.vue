<template>
  <div class="tapNumEcharts">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watchEffect } from "vue";
import baseEchart from "@/base-ui/echart/src/base-echart.vue";
import * as echarts from "echarts";
//import useWebSocket from "@/hook/websocket";
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
      let attackSourcesColor = [
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: "#EB3B5A" },
          { offset: 1, color: "#FE9C5A" },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: "#FA8231" },
          { offset: 1, color: "#FFD14C" },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: "#F7B731" },
          { offset: 1, color: "#FFEE96" },
        ]),
        new echarts.graphic.LinearGradient(0, 1, 1, 1, [
          { offset: 0, color: "#395CFE" },
          { offset: 1, color: "#2EC7CF" },
        ]),
      ];
      let attackSourcesColor1 = [
        "#EB3B5A",
        "#FA8231",
        "#F7B731",
        "#3860FC",
        "#1089E7",
        "#F57474",
        "#56D0E3",
        "#1089E7",
        "#F57474",
        "#1089E7",
        "#F57474",
        "#F57474",
      ];
      let attaData: any = [];
      let attaName: any = [];
      e.forEach((it: any, index: any) => {
        attaData[index] = it.tapNum;
        attaName[index] = it.name;
      });

      function attackSourcesDataFmt(sData: any) {
        let sss: any = [];
        sData.forEach(function (item: any, i: any) {
          //   console.log(i);

          let itemStyle = {
            color: i > 3 ? attackSourcesColor[3] : attackSourcesColor[i],
          };
          sss.push({
            value: item,
            itemStyle: itemStyle,
          });
          // console.log(sss);
        });
        return sss;
      }
      options.value = {
        color: ["#F7B731"],
        grid: {
          left: "2%",
          right: "2%",
          width: "90%",
          bottom: "2%",
          top: "2%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
         
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisPointer: {
              label: {
                show: true,
                //margin: 30
              },
            },
            postion: "right",
            axisLabel: {
              rich: {
                nt1: {
                  color: "#fff",
                  backgroundColor: attackSourcesColor1[0],
                  width: 13,
                  height: 13,
                  fontSize: 10,
                  align: "center",
                  borderRadius: 100,
                  lineHeight: "5",
                  padding: [4, 4, 4, 4],
                },
                nt2: {
                  color: "#fff",
                  backgroundColor: attackSourcesColor1[1],
                  width: 13,
                  height: 13,
                  fontSize: 10,
                  align: "center",
                  borderRadius: 100,
                  padding: [4, 4, 4, 4],
                },
                nt3: {
                  color: "#fff",
                  backgroundColor: attackSourcesColor1[2],
                  width: 13,
                  height: 13,
                  fontSize: 10,
                  align: "center",
                  borderRadius: 100,
                  padding: [4, 4, 4, 4],
                },
                nt: {
                  color: "#fff",
                  backgroundColor: attackSourcesColor1[3],
                  width: 13,
                  height: 13,
                  fontSize: 10,
                  align: "center",
                  lineHeight: 13,
                  borderRadius: 100,
                  padding: [4, 4, 4, 4],
                  //lineHeight: 5,
                },
              },
              formatter: function (value: any, index: any) {
                const indexDeal = index + 1;
                if (index < 3) {
                  return ["{nt" + indexDeal + "|" + indexDeal + "}"];
                } else {
                  return ["{nt|" + indexDeal + "}"];
                }
              },
            },
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: "#fff",
                fontSize: "14",
              },
            },
            data: attaName,
          },
        ],
        series: [
          {
            name: "视频点击量",
            type: "bar",
            barWidth: "20px",
            animationDuration: 1500,
            data: attackSourcesDataFmt(attaData),
            label: {
              show: true, // 是否可见
              color: "#fff",
              fontSize: 12,
            },
            itemStyle: {
              barBorderRadius: 20,
            },
          },
        ],
      };
    };

    watchEffect(() => {
      handleMessage(props.values);
      //  console.log(options);
    });
    // useWebSocket(handleMessage);
    return {
      options,

      handleMessage,
    };
  },
});
</script>
<style lang="scss"></style>
