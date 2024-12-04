import { post } from "../axiosWrapper";
import { routes } from "../routes";

export const createVendor = async (data: any) => {
    console.log("createVendor F",data);
    return await post(routes?.dashboard?.vendor?.createVendor, data);
}