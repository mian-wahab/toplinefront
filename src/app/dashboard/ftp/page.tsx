"use client";
import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import SpringModal from '@/components/modal';
import { ToastType } from '@/contexts/enums';
import { useUser } from '@/hooks/use-user';
import { Ftp, FtpTables } from '@/components/dashboard/ftp/ftps-table';
import { FtpsFilters } from '@/components/dashboard/ftp/ftps-filters';
import { DeleteFtp, GetFtps, GetVendors } from '@/service';
import { VendorManagement } from '@/components/vendors/Vendor';
import { Vendor } from '@/components/dashboard/customer/vendors-table';
import CircularIndeterminate from '@/components/spinner/MuiSpinner';

// export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;





export default function Page(): React.JSX.Element {
  const { toast } = useUser();
  const [ftps, setFtps] = React.useState<Ftp[]>([]);
  const [editFtpData, setEditFtpData] = React.useState(null);
  const [vendors, setVendors] = React.useState<Vendor[]>([]);
  const [vendorsToShow, setVendorsToShow] = React.useState<Vendor[]>([])
  const [keyword, setKeyword] = React.useState<string>('');
  const [open, setIsOpen] = React.useState<boolean>(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [inprogress, setInprogress] = React.useState<boolean>(false);
  const page = 0;
  const rowsPerPage = 10;

  const paginatedCustomers = applyPagination(ftps, page, rowsPerPage);
  const handleOpenCreateVendor = () => {
    setSelectedRow(null);
    setIsOpen(!open);
    setVendorsToShow(vendors)
  }
  const handleAction = () => {
    getFtps();
  }

  const getFtps = async () => {
    setInprogress(true);
    const ftps = await GetFtps();
    if (ftps?.error) {
      toast.setToast({ isOpen: true, message: ftps.error, type: ToastType.ERROR });
      setInprogress(false);
      return setFtps([]);
    }
    setFtps(ftps?.ftps?.data as Ftp[]);
    setInprogress(false);
  }

  React.useEffect(() => {
    getFtps();
  }, []);
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

  const filteredFtps = ftps?.filter((ftp) => {
    return ftp?.host?.toLowerCase()?.includes(keyword) || ftp?.user?.fullName?.toLowerCase()?.includes(keyword) || ftp?.ftpUser?.toLowerCase()?.includes(keyword);
  });
  const handleDelete = async (id: string) => {
    setInprogress(true);
    const ftp = await DeleteFtp(id);
    if (ftp?.error) {
      setInprogress(false);
      return toast.setToast({ isOpen: true, message: ftp.error, type: ToastType.ERROR });
    }
    getFtps();
    setInprogress(false);
  }
  return (
    <Stack spacing={3}>
      {inprogress && <CircularIndeterminate />}
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Ftps</Typography>
        </Stack>
        <div>
          <Button onClick={handleOpenCreateVendor} startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add Ftp's
          </Button>
        </div>
      </Stack>
      <SpringModal open={open} setOpen={setIsOpen} content={<VendorManagement editVendor={selectedRow}  action={handleAction} vendors={vendorsToShow} editFtpData={editFtpData} />} />
      <FtpsFilters setKeyword={setKeyword} />
      <FtpTables
        count={paginatedCustomers.length}
        page={page}
        rows={filteredFtps}
        rowsPerPage={rowsPerPage}
        setSelectedRow={setSelectedRow}
        setIsOpen = {setIsOpen}
        setEditFtpData = {setEditFtpData}
        setVendorsToShow={setVendorsToShow}
        handleDelete={handleDelete}
      />
    </Stack>
  );
}

function applyPagination(rows: Ftp[], page: number, rowsPerPage: number): Ftp[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
