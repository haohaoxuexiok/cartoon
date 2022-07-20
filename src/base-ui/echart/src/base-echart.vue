<template>
  <div class="base-echart">
    <div ref="echartsRef" :style="style"></div>
  </div>
</template>

<script lang="ts">
import * as echarts from "echarts";
import { defineComponent, ref, onMounted, watchEffect } from "vue";
export default defineComponent({
  props: {
    options: {
      type: Object,
      require: true,
    },
    style: {
      type: Object,
      default: () => ({
        width: "100%",
        height: "340px",
      }),
    },
  },
  setup(props, {}) {
  //  console.log(props.style);
    
    const echartsRef = ref();
    onMounted(() => {
      const echartInstance: any = echarts.init(echartsRef.value);
      echartInstance.setOption(props.options);
      
      
      watchEffect(() => {
        echartInstance.setOption(props.options);
      });
      window.addEventListener("resize", () => {
        echartInstance.resize();
      });
    });
    return {
      echartsRef,
      onMounted,
    };
  },
});
</script>
<style lang="scss"></style>
