import { tableType } from './type'
export const tableConfig:tableType = {
  propList: [
    { prop: "name", label: "剧名", minWidth: "100" },
    { prop: "imgUrl", label: "图片地址", minWidth: "200" },
    { prop: "state", label: "更新状态", minWidth: "80" },
    { prop: "createTime", label: "上架时间", minWidth: "80" },
    { prop: "tapNum", label: "点击量", minWidth: "50" },
    { prop: "searchNum", label: "搜索量", minWidth: "50" },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ]
}
