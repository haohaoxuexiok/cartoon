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
      label: '剧名',
      placeholder: '请输入剧名'
    },
    {
      field: 'imgUrl',
      type: 'input',
      label: '图片地址',
      placeholder: '请输入图片地址'
    },
    {
      field: 'state',
      type: 'input',
      label: '更新状态',
      placeholder: '请输入更新状态'
    },
  ]
}
