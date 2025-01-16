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
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useSelection } from '@/hooks/use-selection';

function noop(): void {
  // do nothing
}
interface Vendor {
  firstName: string;
  lastName: string;
  companyName:string;
  contactNumber:number;
  companyAddress:string;
  email: string;
  createdAt: string;
  status: string;
  logs: string;
}
interface Admin {
  firstName: string;
  companyName:string;
  contactNumber:number;
  companyAddress:string;
  lastName: string;
  email: string;
  createdAt: string;
  logs: string;
}
export interface ConvertedFile {
  _id: string;
  filePath: string;
  conversionType: string;
  vendor: Vendor;
  convertedBy: Admin;
  status: Vendor;
  logs: Vendor;
  createdBy: Vendor;
  createdAt: string;
}

interface VendorsTableProps {
  count?: number;
  page?: number;
  rows?: ConvertedFile[];
  vendor?: Vendor[];
  rowsPerPage?: number;
}

export function FileConversionTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: VendorsTableProps): React.JSX.Element {
  const rowIds = React.useMemo(() => {
    return rows.map((Ftp) => Ftp._id);
  }, [rows]);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < rows.length;
  const selectedAll = rows.length > 0 && selected?.size === rows.length;

  const downloadFileFromBuffer = (url: string) => {
    console.log('url', url);
    const link = document.createElement('a');
    link.href = url;
  }

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Converted By</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Logs</TableCell>
              {/* <TableCell>Action</TableCell> */}
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => {
              const isSelected = selected?.has(row._id);
              return (
                <TableRow hover key={row?.filePath} selected={isSelected}>
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      <Typography variant="subtitle2">{row?.createdBy?.firstName} {row?.createdBy?.lastName}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row?.createdBy?.companyName}</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>{row.createdAt}</TableCell>
                  {/* <TableCell>Active</TableCell> */}
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Avatar sx={{ cursor: 'pointer', background: '#4E36F5' }}> <a style= {{
                        // make default stle none
                        textDecoration: 'none',
                        color: 'white',
                        
                      }} href={process?.env?.NEXT_PUBLIC_DOWNLOAD_CONVERTED_URL_LOCAL + "/" + row?.filePath} target='_blank'><CloudDownloadIcon /></a> </Avatar>
                    </Stack>
                  </TableCell>
                  <TableCell>Successful</TableCell>
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
