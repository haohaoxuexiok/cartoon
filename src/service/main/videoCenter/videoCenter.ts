import hyRequest from "../../index";

export function getVideoList(url: string, queryInfo: any) {
  return hyRequest.get({
    url: url,
    params: queryInfo,
  });
}

export function searchVideoMessage(url: string, message: object) {
  return hyRequest.get({
    url: url,
    params: {
      ...message,
    },
  });
}

export function deleteVideo(url: string, message: string) {
  return hyRequest.delete({
    url: url,
    params: {
      id: message,
    },
  });
}

export function editVideo(url: string, message: object) {
  return hyRequest.post({
    url: url,
    data: {
      ...message,
    },
  });
}

export function uploadVideo(url: string, message: object) {
  return hyRequest.post({
    url: url,
    data: {
      ...message,
    },
  });
}

export function addCategoryVideoNum(url: string, message: any) {
  return hyRequest.post({
    url: url,
    data: {
      ...message,
    },
  });
}
export function getCategoryVideoNum(url: string) {
  return hyRequest.get({ url: url });
}
