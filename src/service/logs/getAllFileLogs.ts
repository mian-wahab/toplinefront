import { get } from "../axiosWrapper";
import { routes } from "../routes";

export const getAllFileLogs = async () => {
    console.log("getAllFileLogs F");
    const response = await get(routes?.dashboard?.logs?.getAllFileLogs);
    console.log("getAllFileLogs F R",response  );
    return response;
}