'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import DrawIcon from '@mui/icons-material/Draw';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSelection } from '@/hooks/use-selection';

function noop(): void {
  // do nothing
}
interface Vendor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  companyAddress: string;
  contactNumber: string;
  createdAt: string;

}
export interface Ftp {
  _id: string;
  host: string;
  ftpUser: string;
  password: string;
  path: string;
  user: Vendor;
  companyname: Vendor;
  createdAt: string;
}

interface VendorsTableProps {
  count?: number;
  page?: number;
  rows?: Ftp[];
  rowsPerPage?: number;
  setSelectedRow: (row: any) => void;
  setIsOpen: (open: boolean) => void;
  setEditFtpData: (data: any) => void;
  setVendorsToShow: (data: any) => void;
  handleDelete: (id: string) => Promise<void>;
}

export function FtpTables({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
  setSelectedRow,
  setIsOpen,
  setEditFtpData,
  setVendorsToShow,
  handleDelete
}: VendorsTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((Ftp) => Ftp._id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  const setRowForEditFtp = () => {

  }

  const handleEditFtp = (data: any) => {
    setIsOpen(true);
    const dataToSend = {
      fullName: data?.user?.fullName,
      userId: data?.user?._id,
      ftp: {
        _id:data?._id,
        host: data?._id,
        password: data?.host,
        ftpUser: data?.ftpUser,
        path: data?.path,
      }
    }
    setVendorsToShow([]);
    setEditFtpData(dataToSend)
  }

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>Host</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Members</TableCell>
              <TableCell>Join Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              console.log(row)
              const isSelected = selected?.has(row._id);

              return (
                <TableRow hover key={row?._id} selected={isSelected}>

                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{row.host}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row?.ftpUser}</TableCell>
                  <TableCell>
                    {row.password}
                  </TableCell>
                  <TableCell>{row.user?.firstName}</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Avatar onClick={() => { handleEditFtp(row) }} sx={{ cursor: 'pointer', background: '#4E36F5' }}><DrawIcon /></Avatar>
                      <Avatar onClick={() => { handleDelete(row?._id as string) }} sx={{ cursor: 'pointer', background: '#ff0e0e' }}><DeleteForeverIcon /></Avatar>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
