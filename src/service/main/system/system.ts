import hyRequest from "../../index";

export function getUserList(url: string, queryInfo: any) {
  return hyRequest.get({
    url: url,
    params: queryInfo,
  });
}

export function changeState(url: string, name: string, state: string) {
  return hyRequest.post({
    url: url,
    data: {
      name,
      state,
    },
  });
}

export function searchUserMessage(url: string, message: object) {
  return hyRequest.get({
    url: url,
    params: {
      ...message,
    },
  });
}

export function editStaff(url: string,message:object) {
  
  return hyRequest.post({
    url: url,
    data: {
      ...message
    },
  });
}

export function deleteStaff(url: string) {
  return hyRequest.delete({
    url: url,
  });
}

export function addStaff(url: string,message:object) {
  return hyRequest.post({
    url: url,
    data:{
      ...message
    }
  });
}

export function searchStaff(url: string,message:object) {
  return hyRequest.get({
    url: url,
    params:{
      ...message
    }
  });
}