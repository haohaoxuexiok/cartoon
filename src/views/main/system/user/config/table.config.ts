import { tableType } from './type'
export const tableConfig:tableType = {
  propList: [
    { prop: "name", label: "用户名", minWidth: "80" },
    { prop: "account", label: "账号", minWidth: "80" },
    { prop: "password", label: "密码", minWidth: "150" },
    {
      prop: "state",
      label: "用户状态",
      minWidth: "120",
      slotName: "state",
    }, 
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
  ]
}
