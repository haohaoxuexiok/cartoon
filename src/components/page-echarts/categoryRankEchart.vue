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
      options.value = {
        series: [
          
          {
            name: "用户喜爱视频类别",
            type: "pie",
            radius: [30, 120],
            center: ["50%", "50%"],
            roseType: "area",
            data: e,
            label: {
              fontSize:14,
              show: true,
              color:'#fff',
              formatter: function (arg:any) {
                  return arg.data.name+'\n'+'点击量'+arg.data.value
              },
            },
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
