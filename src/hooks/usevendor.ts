import { useEffect, useState } from 'react';
import { getAllVendor } from '@/service/vendor/getAllVendor';

export interface Vendor {
  id: string;
  firstName: string;
  lastName: string;
  contactNumber: boolean;
  email: string;
  createdAt: string;
  companyName: string;
  companyAddress: string;
  jobStatus: string;
  logs: string;
  role: string;
}

export const useVendors = () => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = (await getAllVendor()) as any;
        setVendors(response?.data?.data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  return { vendors, loading };
};
