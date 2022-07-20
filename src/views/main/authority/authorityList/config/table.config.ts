export const tableConfig = {
  propList: [
    { prop: "name", label: "权限名称", minWidth: "80" },
    { prop: "type", label: "权限级别", minWidth: "80" },
    { prop: "menuUrl", label: "菜单URL", minWidth: "250" },
  ],
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  showFooter: false,
}
