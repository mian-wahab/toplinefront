"use client";
import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import SpringModal from '@/components/modal';
import { VendorManagement } from '@/components/vendors/Vendor';
import { Vendor, VendorsTable } from '@/components/dashboard/customer/vendors-table';
import { VendorsFilters } from '@/components/dashboard/customer/vendors-filters';
import { DeleteVendor, GetVendors, ActivateVendor, DisableVendor } from '@/service';
import { ToastType } from '@/contexts/enums';
import { useUser } from '@/hooks/use-user';
import CircularIndeterminate from '@/components/spinner/MuiSpinner';

// export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

const customers = [

] satisfies Vendor[];

 

export default function Page(): React.JSX.Element {
  const { toast } = useUser();
  const [inprogress, setInprogress] = React.useState<boolean>(false);
  const [vendors, setVendors] = React.useState<Vendor[]>([]);
  const [keyword, setKeyword] = React.useState<string>('');
  const [open, setIsOpen] = React.useState<boolean>(false);
  const [selectedRow, setSelectedRow] = React.useState(null)
  const page = 0;
  const rowsPerPage = 10;

  const paginatedCustomers = applyPagination(vendors, page, rowsPerPage);
  const handleOpenCreateVendor = () => {
    setSelectedRow(null)
    setIsOpen(!open);
  }
  const handleAction = () => {
    getVendors();
  }

  const getVendors = async () => {
    setInprogress(true);
    const vendors = await GetVendors();
    if (vendors?.error) {
      toast.setToast({ isOpen: true, message: vendors.error, type: ToastType.ERROR });
      setInprogress(false);
      return setVendors([]);
    }
    setVendors(vendors?.vendors?.data as Vendor[]);
    setInprogress(false);
  }

  React.useEffect(() => {
    getVendors();
  }, []);


  const handleActivate = async (id: string) => {
    setInprogress(true);
    try {
      // Example API call to activate vendor
      const response = await ActivateVendor(id);
      if (response?.error) {
        toast.setToast({ isOpen: true, message: response.error, type: ToastType.ERROR });
      } else {
        toast.setToast({ isOpen: true, message: 'Vendor activated successfully.', type: ToastType.SUCCESS });
        getVendors();
      }
    } catch (error) {
      toast.setToast({ isOpen: true, message: 'Failed to activate vendor.', type: ToastType.ERROR });
    } finally {
      setInprogress(false);
    }
  };
  
  const handleDisable = async (id: string) => {
    setInprogress(true);
    try {
      // Example API call to disable vendor
      const response = await DisableVendor(id); // Replace with your actual API call
      if (response?.error) {
        toast.setToast({ isOpen: true, message: response.error, type: ToastType.ERROR });
      } else {
        toast.setToast({ isOpen: true, message: 'Vendor disabled successfully.', type: ToastType.SUCCESS });
        getVendors();
      }
    } catch (error) {
      toast.setToast({ isOpen: true, message: 'Failed to disable vendor.', type: ToastType.ERROR });
    } finally {
      setInprogress(false);
    }
  };


  const handleDelete = async (id: string) => {
    setInprogress(true);
    const vendor = await DeleteVendor(id);
    if (vendor?.error) {
      setInprogress(false);
      return toast.setToast({ isOpen: true, message: vendor.error, type: ToastType.ERROR });
    }
    getVendors();
    setInprogress(false);
  }
  const filteredVendors = vendors?.filter((vendor) => {
    return vendor?.fullName?.toLowerCase()?.includes(keyword) || vendor?.email?.toLowerCase()?.includes(keyword) || vendor?.userName?.toLowerCase()?.includes(keyword);
  });
  return (
    <Stack spacing={3}>
     {inprogress && <CircularIndeterminate />}
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Members</Typography>
        </Stack>
        <div>
          <Button onClick={handleOpenCreateVendor} startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add Member
          </Button>
        </div>
      </Stack>
      <SpringModal open={open} setOpen={setIsOpen} content={<VendorManagement editVendor={selectedRow} action={handleAction} vendors={[]} editFtpData={null} />} />
      <VendorsFilters setKeyword={setKeyword} />
      <VendorsTable
        count={paginatedCustomers.length}
        page={page}
        rows={filteredVendors}
        rowsPerPage={rowsPerPage}
        setSelectedRow={setSelectedRow}
        setIsOpen={setIsOpen}
        handleDelete={handleDelete}
        handleDisable={handleDisable}
        handleActivate={handleActivate}
      />
    </Stack>
  );
}

function applyPagination(rows: Vendor[], page: number, rowsPerPage: number): Vendor[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
