// export interface APIResponse {
//     status:boolean;
//     data: {} | [] | null | OnlyData;
//     message: string;
//     statusText: {};
// }

// interface OnlyData {
//     data: {} | [] | null;
// }
export interface APIResponse<T = any> {
    status: number;
    data: T;
    message: string;
    statusText: string;
}
  
  // Define OnlyData if necessary for specific cases
  interface OnlyData {
    data: {} | [] | null;
  }
  