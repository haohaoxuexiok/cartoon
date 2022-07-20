export const tableConfig = {
  propList: [
    { prop: "swiperImg", label: "轮播图展示", minWidth: "140",slotName: "imgShow" },
    { prop: "swiperImg", label: "轮播图", minWidth: "200" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "120",
      slotName: "createAt",
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "120",
      slotName: "updateAt",
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  isShowHeader:true,
  showFooter: false,
  rightTitle:"添加轮播图"
}
