import hyRequest from '../index'

import { IAccount, ILoginResult,IDataType } from './type'

export function getUserInfo(message: IAccount) {
    return hyRequest.post<ILoginResult>({
      url: '/login_backStage',
      data: message
    })
}

export function getStaffAuthority(message:string) {
  
  return hyRequest.get<ILoginResult>({
    url: '/getStaffAuthority',
    params:{
      role:message
    }
  })
}