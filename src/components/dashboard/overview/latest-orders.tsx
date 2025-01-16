// import React from 'react';
// import { Card, CardHeader, Divider, Box, Table, TableHead, TableRow, TableCell, TableBody, CardActions, Button } from '@mui/material';
// import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
// import { Vendor } from '../../../hooks/useVendor';
// import Chip from '@mui/material/Chip';
// import type { SxProps } from '@mui/material/styles';
// import dayjs from 'dayjs';

// interface LatestOrdersProps {
//   vendors: Vendor[];
// }

// export function LatestOrders: React.FC<LatestOrdersProps> = ({ vendors }) => (
//   <Card>
//     <CardHeader title="Latest Orders" />
//     <Divider />
//     <Box sx={{ overflowX: 'auto' }}>
//       <Table sx={{ minWidth: 800 }}>
//         <TableHead>
//           <TableRow>
//             <TableCell>Full Name</TableCell>
//             <TableCell>Company Name</TableCell>
//             <TableCell>Date</TableCell>
//             <TableCell>Job Status</TableCell>
//             <TableCell>Logs</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {vendors.map((vendor) => (
//             <TableRow key={vendor.email}>
//               <TableCell>{vendor.firstName} {vendor.lastName}</TableCell>
//               <TableCell>{vendor.companyName}</TableCell>
//               <TableCell>{vendor.createdAt}</TableCell>
//               <TableCell>{vendor.jobStatus}</TableCell>
//               <TableCell>{vendor.logs}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Box>
//     <Divider />
//     <CardActions sx={{ justifyContent: 'flex-end' }}>
//       <Button
//         color="inherit"
//         endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
//         size="small"
//         variant="text"
//       >
//         View all
//       </Button>
//     </CardActions>
//   </Card>
// );
import React from 'react';
import { Card, CardHeader, Divider, Box, Table, TableHead, TableRow, TableCell, TableBody, CardActions, Button } from '@mui/material';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { Vendor } from '../../../hooks/usevendor';
import Chip from '@mui/material/Chip';
import type { SxProps } from '@mui/material/styles';
import dayjs from 'dayjs';


interface LatestOrdersProps {
  vendors: Vendor[];
}

const LatestOrders: React.FC<LatestOrdersProps> = ({ vendors }) => (
  <Card>
    <CardHeader title="Latest Orders" />
    <Divider />
    <Box sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Job Status</TableCell>
            <TableCell>Logs</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.email}>
              <TableCell>{vendor.firstName} {vendor.lastName}</TableCell>
              <TableCell>{vendor.companyName}</TableCell>
              <TableCell>{vendor.createdAt}</TableCell>
              <TableCell>{vendor.jobStatus}</TableCell>
              <TableCell>{vendor.logs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
    <Divider />
    <CardActions sx={{ justifyContent: 'flex-end' }}>
      <Button
        color="inherit"
        endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </CardActions>
  </Card>
);

export default LatestOrders;



// const statusMap = {
//   pending: { label: 'Pending', color: 'warning' },
//   delivered: { label: 'Delivered', color: 'success' },
//   refunded: { label: 'Refunded', color: 'error' },
// } as const;

// export interface Order {
//   id: string;
//   customer: { name: string };
//   customercompany: { companyname: string };
//   amount: number;
//   status: 'pending' | 'delivered' | 'refunded';
//   logs: string;
//   createdAt: Date;
//   action: string;
// }

// export interface LatestOrdersProps {
//   orders?: Order[];
//   sx?: SxProps;
// }

// export function LatestOrders({ orders = [], sx }: LatestOrdersProps): React.JSX.Element {
//   return (
//     <Card sx={sx}>
//       <CardHeader title="Latest orders" />
//       <Divider />
//       <Box sx={{ overflowX: 'auto' }}>
//         <Table sx={{ minWidth: 800 }}>
//           <TableHead>
//             <TableRow>
//               <TableCell>Full Name</TableCell>
//               <TableCell>Company Name</TableCell>
//               <TableCell sortDirection="desc">Date</TableCell>
//               <TableCell>Job Status</TableCell>
//               <TableCell>Logs</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//                           {vendors.map((vendor) => (
//                         <TableRow key={vendor.email}>
//                             <TableCell>{vendor.firstName}{vendor.lastName}</TableCell>
//                             <TableCell>{vendor.companyName}</TableCell>
//                             <TableCell>{vendor.createdAt}</TableCell>
//                             <TableCell>{vendor.jobStatus}</TableCell>
//                             <TableCell>{vendor.logs}</TableCell>
//                             {/* <TableCell>{vendor.role}</TableCell> */}
//                         </TableRow>
//                     ))}
             
//           </TableBody>
//         </Table>
//       </Box>
//       <Divider />
//       <CardActions sx={{ justifyContent: 'flex-end' }}>
//         <Button
//           color="inherit"
//           endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
//           size="small"
//           variant="text"
//         >
//           View all
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }
// "use client";
// import React, { useEffect, useState } from 'react';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     CircularProgress,
// } from '@mui/material';
// import {VendorTable} from '../vendor/vendor-table'
// import { getAllVendor } from '@/service/vendor/getAllVendor';

// interface Vendor {
//     id:string;
//     firstName: string;
//     lastName:string;
//     contactNumber:boolean;
//     email: string;
//     createdAt:string;
//     companyName: string;
//     companyAddress: string;
//     jobStatus:string;
//     logs:string;
//     role: string;
// }

// interface VendorTableProps {
//     trigger: boolean;
// }

// const VendorTable: React.FC<VendorTableProps> = ({ trigger }) => {
//     const [vendors, setVendors] = useState<Vendor[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);

//     useEffect(() => {
//         const fetchVendors = async () => {
//             try {
//                 const response = await getAllVendor() as any;
//                 setVendors(response?.data?.data);
//             } catch (error) {
//                 console.error('Error fetching vendors:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchVendors();
//     }, [trigger]); 

//     if (loading) {
//         return <CircularProgress />;
//     }

//     return (
//         <TableContainer component={Paper}>
//             <Table>
//                 <TableHead>
//                     <TableRow>
//                     <TableCell>Full Name</TableCell>
//               <TableCell>Company Name</TableCell>
//               <TableCell sortDirection="desc">Date</TableCell>
//               <TableCell>Job Status</TableCell>
//               <TableCell>Logs</TableCell>
//               {/* <TableCell>Action</TableCell> */}
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {vendors.map((vendor) => (
//                         <TableRow key={vendor.email}>
//                             <TableCell>{vendor.firstName}{vendor.lastName}</TableCell>
//                             <TableCell>{vendor.companyName}</TableCell>
//                             <TableCell>{vendor.createdAt}</TableCell>
//                             <TableCell>{vendor.jobStatus}</TableCell>
//                             <TableCell>{vendor.logs}</TableCell>
//                             {/* <TableCell>{vendor.role}</TableCell> */}
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// };

// export default VendorTable;
