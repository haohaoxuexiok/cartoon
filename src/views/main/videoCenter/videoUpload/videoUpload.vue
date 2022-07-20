<template>
  <div id="videoUpload">
    <div class="header">视频爬取</div>
    <div class="content">
      <el-form>
        <el-form-item
          label="视频详细介绍页面URL"
          labelWidth="200px"
          prop="address"
        >
          <el-input
            v-model="formData.address"
            type="text"
            placeholder="请输入视频详细介绍页面URL"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="视频URL" labelWidth="200px" prop="videoUrl">
          <el-input
            v-model="formData.videoUrl"
            type="text"
            placeholder="请输入视频URL,多个视频链接用','分割"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>

      <el-button type="primary" size="large" @click="getting"
        >进行爬取</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Form from "@/base-ui/form/src/form.vue";

import {
  uploadVideo,
  addCategoryVideoNum,
  getCategoryVideoNum,
} from "@/service/main/videoCenter/videoCenter";

import { getCurrentDetailTime } from "@/utils/time";
import useWebSocket from "@/hook/websocket";

import { useStore } from "vuex";
export default defineComponent({
  components: { Form },
  setup() {
    const formData = ref({
      address: "https://www.mandao.tv/man/913490.html",
      videoUrl: "",
    });

    const store = useStore();
    const handleMessage = () => {};
    const ws = useWebSocket(handleMessage);

    const getting = async () => {
      const { address, videoUrl } = formData.value;
      const url = videoUrl.split(",");
      let date = new Date();
      let dateDay = date.getDay();
      const week = ["周一", "周二", "周三", "周四", "周五", "周六", "周天"];
      const currentData = getCurrentDetailTime();
      const time = currentData + "\xa0" + week[dateDay - 1];
      const uploadResult = await uploadVideo("uploadVideo", {
        address: address,
        videoUrl: url,
        time: time,
      });

      await addCategoryVideoNum("/addCategoryVideoNum", {
        name: uploadResult[0].name,
        type: uploadResult[0].type,
      });

      const result = await getCategoryVideoNum("/getCategoryVideoNumList");
      ws.send(JSON.stringify({categoryVideoNumList:result}));
    };
    return {
      formData,
      getting,
    };
  },
});
</script>

<style scoped lang="scss">
#videoUpload {
  padding: 50px 0;
  text-align: center;
  .header {
    margin-bottom: 50px;
    color: #6495ed;
    font-size: 20px;
    font-weight: bold;
  }
  .content {
    padding: 0 50px;

    .el-form-item {
      margin-bottom: 40px;
    }
  }
}
</style>
