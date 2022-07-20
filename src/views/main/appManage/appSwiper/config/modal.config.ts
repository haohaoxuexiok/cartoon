import { IForm } from '@/base-ui/form'

export const modalConfig: IForm = {
  formItems: [
    {
      field: 'swiperImg',
      type: 'input',
      label: '轮播图',
      placeholder: '请输入轮播图地址'
    },
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
