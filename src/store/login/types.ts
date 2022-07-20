export interface authorityMessage {
  id: number;
  roleDesc: string;
  roleName: string;
  authorityList: any;
}

export interface ILoginState {
  token: string;
  userInfo: any;
  userState: string;
  staffAuthority: any;
}
