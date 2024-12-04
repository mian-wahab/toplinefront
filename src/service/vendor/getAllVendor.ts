import { get } from "../axiosWrapper";
import { routes } from "../routes";

export const getAllVendor = async () => {
    console.log("getAllVendor F");
    const response = await get(routes?.dashboard?.vendor?.getAllVendor);
    console.log("getAllVendor F R",response  );
    return response;
}