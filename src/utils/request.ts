import useSWR, { SWRHook } from 'swr';

type IRequest = {
  url: string,
  config: any,
}

// const request = (requestObj: IRequest):SWRHook => {
//   return useSWR(requestObj.url, requestObj.config);
// }

export {};
