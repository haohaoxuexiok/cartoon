import hyRequest from "../../index";



export function getEchartsData(url: string,time?:any) {
    return hyRequest.get({
     url:url,
     params:{
         time:time
     }
    });
}
   