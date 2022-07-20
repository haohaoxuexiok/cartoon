import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  labelWidth: '120px',
  itemStyle: {
    padding: '10px 40px'
  },
 /* colLayout: {
    span: 8
  },*/
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'account',
      type: 'input',
      label: '账号',
      placeholder: '请输入账号'
    },
  
    {
      field: 'state',
      type: 'select',
      label: '用户状态',
      placeholder: '请选择用户状态',
      options: [
        { title: '启用', value:'启用' },
        { title: '禁用', value:'禁用'}
      ]
    },
    {
      field: 'role',
      type: 'input',
      label: '角色',
      placeholder: '请输入用户角色'
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
