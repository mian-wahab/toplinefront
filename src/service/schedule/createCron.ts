// import { post } from "../axiosWrapper";
// import { routes } from "../routes";

// export const createCron = async (data: any) => {
//     console.log("createCron F",data);
//     return await post(routes?.dashboard?.schedule?.createCronJob, data);
// }
import { post } from "../axiosWrapper";
import { routes } from "../routes";
import { APIResponse } from "../types";

export const createCron = async (data: any): Promise<APIResponse> => {
  return await post(routes.dashboard.schedule.createCronJob, data);
};
