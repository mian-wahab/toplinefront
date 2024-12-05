export interface APIResponse {
    status:boolean;
    data: {} | [] | null | OnlyData;
    message: string;
    statusText: {};
}

interface OnlyData {
    data: {} | [] | null;
}
