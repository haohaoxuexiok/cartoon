import hyRequest from "../../index";

export function getAuthorityList(url: string) {
  return hyRequest.get({
    url: url,
  });
}

export function getRoleList(url: string) {
  return hyRequest.get({
    url: url,
  });
}

export function deleteRole(url: string, id: number) {
  return hyRequest.delete({
    url: url,
    params: {
      id: id,
    },
  });
}
export function editRole(url: string,message:object) {
    return hyRequest.post({
     url:url,
     data:{
        ...message
     }
    });
}

export function addRole(url: string,message:object) {
  return hyRequest.post({
   url:url,
   data:{
      ...message
   }
  });
}