export interface APIResponse<T = any> {
    status: number;
    data: [];
    message: string;
    statusText: string;
}
  interface OnlyData {
    data: {} | [] | null;
  }
  