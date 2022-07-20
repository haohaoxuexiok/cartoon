<template>
  <div id="authorityList">
    <div class="content">
      <page_content
        ref="contentRef"
        :tableConfig="tableConfig"
        path="/getAuthorityList"
      >
      
      </page_content>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "@/store";

import page_content from "@/components/page-content/page-content.vue";
import { tableConfig } from "./config/table.config";
export default defineComponent({
  components: {
    page_content,
  },
  setup() {
    const store = useStore();

    return {
      tableConfig,
    };
  },
});
</script>

<style scoped lang="scss">
.content {
  padding: 30px;
  border-top: 20px solid #f0f2f5;
}
</style>
