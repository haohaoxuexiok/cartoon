import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
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
    {
      field: 'createTime',
      type: 'input',
      label: '创建时间',
      placeholder: '请输入创建时间(例:2022-5-16周一)'
    },
    {
      field: 'tapNum',
      type: 'input',
      label: '点击量',
      placeholder: '请输入点击量'
    },
    {
      field: 'searchNum',
      type: 'input',
      label: '搜索量',
      placeholder: '请输入搜索量'
    },
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
