export interface APIResponse<T = any> {
    status: number;
    data: T;
    message: string;
    statusText: string;
}
  interface OnlyData {
    data: {} | [] | null;
  }
  