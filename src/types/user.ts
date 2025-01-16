export interface User {
  firstName: string;
  avatar?: string;
  email: string;
  lastName: string;
  contactNumber: number;
  companyName: string;
  companyAddress: string;
  [key: string]: unknown;
  status:string;
}
