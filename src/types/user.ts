export interface User {
  id: string;
  firstName?: string;
  avatar?: string;
  email?: string;
  lastName?: string;
  contactNumber?: boolean;
  companyName?: string;
  companyAddress?: string;
  [key: string]: unknown;
}
