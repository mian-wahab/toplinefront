export interface APIResponse {
    status:string;
    data: {} | [] | null | OnlyData;
    message: string;
    statusText: {};
}

interface OnlyData {
    data: {} | [] | null;
}
