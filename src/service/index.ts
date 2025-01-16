import { User } from "@/types/user";
import { del, get, post, put } from "./axiosWrapper";
import { routes } from "./routes";
import { SignInWithPasswordParams } from "@/lib/auth/client"; 

export const Login = async (data: SignInWithPasswordParams) => {
    const user = await post(routes.auth.signIn, data);
    if (user.status) {
        const userData = user.data as any;
        localStorage.setItem('custom-auth-token', userData?.data?.token as string);
        return { user: userData, error: null };
    }
    return { user: null, error: user.message as string };
}

//  Manage vendors
export const AddVendor = async (data: any) => {
    const vendor = await post(routes.dashboard.vendor.createVendor, data);
    if (vendor.status) {
        return { vendor: vendor.data, error: null };
    }
    return { vendor: null, error: vendor.message as string };
}
export const ActivateVendor = async (email: string) => {
    const response = await put(`${routes.dashboard.vendor.activateVendor}/${email}`, {});
    if (response.status) {
        return { vendor: response.data, error: null };
    }
    return { vendor: null, error: response.message as string };
};

export const DisableVendor = async (email: string) => {
    const response = await put(`${routes.dashboard.vendor.disableVendor}/${email}`, {});
    if (response.status) {
        return { vendor: response.data, error: null };
    }
    return { vendor: null, error: response.message as string };
};
export const EditVendor = async (data: any) => {
    const vendor = await post(routes.dashboard.vendor.createVendor, data);
    if (vendor.status) {
        return { vendor: vendor.data, error: null };
    }
    return { vendor: null, error: vendor.message as string };
}
export const UpdateVendor = async (email: string, data: any) => {
    const vendor = await put(`${routes.dashboard.vendor.updateVendor}/${email}`, data);
    if (vendor.status) {
        return { vendor: vendor.data, message: vendor?.message, error: null };
    }
    return { vendor: null, error: vendor.message as string };
}
export const GetVendors = async () => {
    const vendors = await get(routes.dashboard.vendor.getAllVendor);
    if (vendors.status) {
        return { vendors: vendors.data as any, error: null };
    }
    return { vendors: null, error: vendors.message as string };
}
export const  DeleteVendor = async (email: string) => {   
    const vendor = await del(`${routes.dashboard.vendor.deleteVendor}/${email}`);
    if (vendor.status) {
        return { vendor: vendor.data, error: null };
    }
    return { vendor: null, error: vendor.message as string };
}



// Manage Ftps
export const GetFtps = async () => {
    const ftps = await get(routes.dashboard.ftp.getAllFtp);
    if (ftps.status) {
        return { ftps: ftps.data as any, error: null };
    }
    return { ftps: null, error: ftps.message as string };
}
export const AddNewFtp = async (data: any) => {
    const ftp = await post(routes.dashboard.ftp.createFtp, data);
    if (ftp.status) {
        return { vendor: ftp.data, error: null };
    }
    return { ftp: null, error: ftp.message as string };
}
export const UpdateFtp = async (email: string, data: any) => {
    const ftp = await put(`${routes.dashboard.ftp.updateFtp}/${email}`, data);
    if (ftp.status) {
        return { vendor: ftp.data, message: ftp?.message, error: null };
    }
    return { ftp: null, error: ftp.message as string };
}
export const DeleteFtp = async (email: string) => {
    const ftp = await del(`${routes.dashboard.ftp.deleteFtp}/${email}`);
    if (ftp.status) {
        return { vendor: ftp.data, error: null };
    }
    return { ftp: null, error: ftp.message as string };
}


// File Conversion
export const GetAllConvertedFiles = async () => {
    const files = await get(routes.dashboard.convert.getAllConvertedFiles);
    if (files.status) {
        return { files: files.data as any, error: null };
    }
    return { files: null, error: files.message as string };
}
export const getAllConvertedFilesLogs = async () => {
    const files = await get(routes.dashboard.convert.getAllConvertedFilesLogs);
    if (files.status) {
        return { files: files.data as any, error: null };
    }
    return { files: null, error: files.message as string };
}
export const getAllFileLogs = async () => {
    const logs = await get(routes.dashboard.logs.getAllFileLogs);
    if (logs.status) {
        return { files: logs.data as any, error: null };
    }
    return { files: null, error: logs.message as string };
}