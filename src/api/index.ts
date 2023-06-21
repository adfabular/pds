import Cookies from "js-cookie";
import { create } from "apisauce";

const isDev = import.meta.env.DEV;
const prodApi = import.meta.env.VITE_PROD_API;
const devApi = import.meta.env.VITE_DEV_API;

let api = create({
  baseURL: isDev ? devApi : prodApi,
  headers: { Accept: "application/json" },
});

export const PostData = async (endPoint: string, parameters: any) => {
  const TokenId: string = Cookies.get("TokenId") as string;
  api.setHeader("Authorization", "Bearer " + TokenId);
  const res: any = await api.post(endPoint, parameters);
  if (res.ok) {
    return res.data;
  } else {
    return {
      status: 0,
      message: res.problem,
    };
  }
};

export const GetListOfRecords = async (parameters: any) => {
  const TokenId: string = Cookies.get("TokenId") as string;
  api.setHeader("Authorization", "Bearer " + TokenId);
  const res: any = await api.post("GetListOfRecords", parameters);
  if (res.ok) {
    return res.data;
  } else {
    return {
      status: 0,
      message: res.problem,
    };
  }
};
// export const GetListOfRecords = async (sp: string, parameters: any) => {
//   api.setHeader("Authorization", "Bearer " + Cookies.get("TokenId"));
//   const res: any = await api.get("GetListOfRecords", {
//     sp: sp,
//     parameters: parameters,
//   });
//   if (res.ok) {
//     return {
//       status: 1,
//       data: res.data,
//     };
//   } else {
//     return {
//       status: 0,
//       message: res.problem,
//     };
//   }
// };

export const GetData = async (endPoint: string, parameters: any) => {
  const TokenId: string = Cookies.get("TokenId") as string;
  api.setHeader("Authorization", "Bearer " + TokenId);
  const res: any = await api.get(endPoint, parameters);
  if (res.ok) {
    return {
      status: 1,
      data: res.data,
    };
  } else {
    return {
      status: 0,
      message: res.problem,
    };
  }
};

export const CheckWithAccess = async (parameters: any) => {
  const TokenId: string = Cookies.get("TokenId") as string;
  api.setHeader("Authorization", "Bearer " + TokenId);
  const res: any = await api.get("GetListOfRecords", {
    sp: "udp_WithAccess",
    parameters,
  });
  if (res.ok) {
    if (res.data.length > 0) {
      return true;
    } else {
      return false;
    }
  } else {
    console.log(res.problem);
    return false;
  }
};
