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
      let colorArray = [
        {
          top: "#056CBB", //黄
          bottom: "rgba(11,42,84,.3)",
        },
        {
          top: "#1ace4a", //绿
          bottom: "rgba(11,42,84, 0.3)",
        },
        {
          top: "#4bf3ff", //蓝
          bottom: "rgba(11,42,84,.3)",
        },
        {
          top: "#4f9aff", //深蓝
          bottom: "rgba(11,42,84,.3)",
        },
        {
          top: "#9AFFF1", //粉
          bottom: "rgba(11,42,84,.3)",
        },
        {
          top: "#8AE1FF", //粉
          bottom: "rgba(11,42,84,.3)",
        },
        {
          top: "#F0E1C2", //粉
          bottom: "rgba(11,42,84,.3)",
        },
      ];
      let seriesData: any = [];
      let yAxisData: any = [];
      props.values.forEach((item: any) => {
        seriesData.push(item.searchNum);
        yAxisData.push(item.name);
      });

      options.value = {
        tooltip: {
          show: true,
          formatter: "{b}:{c}",
        },
        grid: {
          left: "0%",
          top: "2%",
          right: "1%",
          bottom: "2%",
          containLabel: true,
        },

        xAxis: {
          type: "value",
          show: false,
          position: "top",
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
         
        },
        yAxis: [
          {
            type: "category",
            axisTick: {
              show: false,
              alignWithLabel: false,
              length: 5,
            },
             axisLabel: {
              textStyle: {
                color: "#fff",
                fontSize: "12",
              },
            },
            splitLine: {
              //网格线
              show: false,
            },

            inverse: "true", //排序
            axisLine: {
              show: false,
            },
            data: yAxisData,
          },
        ],
        series: [
          {
            name: "能耗值",
            type: "bar",
            label: {
              normal: {
                show: true,
                color: "#fff",
                position: "right",
                formatter: "{c}",
              },
            },
            itemStyle: {
              normal: {
                show: true,
                color: function (params: any) {
                  let num = colorArray.length;
                  return {
                    type: "linear",
                    colorStops: [
                      {
                        offset: 0,
                        color: colorArray[params.dataIndex % num].bottom,
                      },
                      {
                        offset: 1,
                        color: colorArray[params.dataIndex % num].top,
                      },
                      {
                        offset: 0,
                        color: colorArray[params.dataIndex % num].bottom,
                      },
                      {
                        offset: 1,
                        color: colorArray[params.dataIndex % num].top,
                      },
                      {
                        offset: 0,
                        color: colorArray[params.dataIndex % num].bottom,
                      },
                      {
                        offset: 1,
                        color: colorArray[params.dataIndex % num].top,
                      },
                      {
                        offset: 0,
                        color: colorArray[params.dataIndex % num].bottom,
                      },
                      {
                        offset: 1,
                        color: colorArray[params.dataIndex % num].top,
                      },
                      {
                        offset: 0,
                        color: colorArray[params.dataIndex % num].bottom,
                      },
                      {
                        offset: 1,
                        color: colorArray[params.dataIndex % num].top,
                      },
                      {
                        offset: 0,
                        color: colorArray[params.dataIndex % num].bottom,
                      },
                      {
                        offset: 1,
                        color: colorArray[params.dataIndex % num].top,
                      },
                    ],
                    //globalCoord: false
                  };
                },
                barBorderRadius: 70,
                borderWidth: 0,
                borderColor: "#333",
              },
            },
            barGap: "0%",
            barCategoryGap: "40%",
            data: seriesData,
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
