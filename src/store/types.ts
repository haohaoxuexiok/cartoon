import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
import { videoState } from './main/videoCenter/types'
import { appManage } from './main/appManage/types'

export interface IRootState {
  authorityList:any[],
  roleList:any[],
  detailAuthority:[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  videoCenter:videoState
  appManage:appManage
}

export type IStoreType = IRootState & IRootWithModule
