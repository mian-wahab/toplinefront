import { post } from "../axiosWrapper";
import { routes } from "../routes";

export const uploadAndConvertFile = async (data: any) => {
    return await post(routes?.dashboard?.convert.uploadAndConvertFile, data);
}