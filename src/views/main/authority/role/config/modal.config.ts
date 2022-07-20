
export const modalConfig = {
  formItems: [
    {
      field: 'roleName',
      type: 'input',
      label: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      field: 'roleDesc',
      type: 'input',
      label: '角色描述',
      placeholder: '请输入角色描述'
    },
  ],
  colLayout: { span: 24 },
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  itemStyle: {}
}
