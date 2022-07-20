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
      let dataX: any = []; //名称
      let dataY: any = []; //数据

      props.values.forEach((item: any) => {
        dataX.push(item.type);
        dataY.push(item.videoNum);
      });
      let zoomShow = false;
      if (dataY.length > 14) {
        zoomShow = true;
      } else {
        zoomShow = false;
      }
      options.value = {
       

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: "4%",
          right: "2%",
          left: "5%",
          bottom: "10%",
        },
        xAxis: [
          {
            type: "category",
            data: dataX,
            axisLine: {
              lineStyle: {
                color: "rgba(66, 192, 255, .3)",
              },
            },
            axisLabel: {
              interval: 0,
              margin: 10,
              color: "#05D5FF",
              textStyle: {
                fontSize: 11,
                color: "#fff",
              },
              rotate: "45",
            },
            axisTick: {
              //刻度
              show: false,
            },
          },
        ],
        yAxis: [
          {
            axisLabel: {
              padding: [3, 0, 0, 0],
              formatter: "{value}",
              color: "rgba(95, 187, 235, 1)",
              textStyle: {
                fontSize: 11,
              },
            },
            axisTick: {
              show: true,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(66, 192, 255, .3)",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,0)",
              },
            },
          },
        ],
        dataZoom: [
          //滚动条
          {
            show: zoomShow,
            type: "slider",
            realtime: true,
            startValue: 0,
            endValue: 10,
            xAxisIndex: [0],
            bottom: "10",
            left: "30",
            height: 10,
            borderColor: "rgba(0,0,0,0)",
          },
        ],
        series: [
          {
            type: "bar",
            data: dataY,
            barWidth: "15",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(5, 213, 255, 1)", // 0% 处的颜色
                    },
                    {
                      offset: 0.98,
                      color: "rgba(5, 213, 255, 0)", // 100% 处的颜色
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(5, 213, 255, 1)",
                shadowBlur: 4,
              },
            },
            label: {
              normal: {
                show: true,
                lineHeight: 1,
                formatter: "{c}",
                position: "top",
                textStyle: {
                  color: "#fff",
                  fontSize: 10,
                },
              },
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
