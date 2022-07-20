import hyRequest from "../../index";

export function getAppSwiper(url: string) {
  return hyRequest.get({
    url: url,
  });
}

export function editAppSwiper(url: string, message: object) {
  return hyRequest.post({
    url: url,
    data:message
  });
}

export function deleteAppSwiper(url: string) {
  return hyRequest.delete({
    url: url,
  });
}

export function addAppSwiper(url: string,message:string) {
  return hyRequest.post({
    url: url,
    data:message
  });
}