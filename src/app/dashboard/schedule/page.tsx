"use client"
import { Paper } from '@mui/material';
import * as React from 'react';
import { Button, Stack, Typography, Modal, TextField, Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { formatISO } from 'date-fns'; // To help format date and time in ISO
import { Ftp } from '@/components/dashboard/ftp/ftps-table';
import { createCron } from '@/service/schedule/createCron';
import { GetFtps } from '@/service';
import { useUser } from '@/hooks/use-user';
import { FtpTables } from '@/components/dashboard/ftp/ftps-table';
import { FtpsFilters } from '@/components/dashboard/ftp/ftps-filters';
import { DeleteFtp, GetVendors } from '@/service';
import { VendorManagement } from '@/components/vendors/Vendor';
// import { Vendor } from '@/components/dashboard/customer/vendors-table';


interface Vendor {
  id:string;
  firstName: string;
  lastName:string;
  contactNumber:boolean;
  email: string;
  companyName: string;
  companyAddress: string;
  createdAt:string;
  role: string;
  logs:string;
  jobStatus:string;
}



export default function Page(): React.JSX.Element {
  const [ftps, setFtps] = React.useState<Ftp[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedFtp, setSelectedFtp] = React.useState<Ftp | null>(null);
  const [operations, setOperations] = React.useState('download');
  const [schedule, setSchedule] = React.useState(''); 

  const [selectedDate, setSelectedDate] = React.useState(''); 
  const [selectedTime, setSelectedTime] = React.useState(''); 

  const page = 0;
  const rowsPerPage = 10;
  const paginatedFtps = applyPagination(ftps, page, rowsPerPage);

  const getFtps = async () => {
    const ftps = await GetFtps();
    if (ftps?.error) {
      return setFtps([]);
    }
    setFtps(ftps?.ftps?.data as Ftp[]);
  };

  React.useEffect(() => {
    GetVendors();
    getFtps();
  }, []);

  const handleCreateCron = (ftp: Ftp) => {
    setSelectedFtp(ftp);
    setOpen(true);
  };

  // const handleSubmitCronJob = async () => {
  //   if (!selectedFtp || !operations || !selectedDate || !selectedTime) {
  //     console.log('selectedFtp', selectedFtp);
  //     console.log('operations', operations);
  //     console.log('selectedDate', selectedDate);
  //     console.log('selectedTime', selectedTime);
  //     alert('Please fill in all fields');
  //     return;
  //   } 

  //   // Combine date and time to create a full schedule in ISO format
  //   const combinedDateTime = new Date(`${selectedDate}T${selectedTime}`);
  //   const isoSchedule = formatISO(combinedDateTime);

  //   setSchedule(isoSchedule);

  //   // Call backend API to create the cron job
  //   const response = await createCron({ ftpId: selectedFtp._id, operations, schedule: isoSchedule });
  //   console.log('response', response);

  //   if (response?.statusText !== 'Created') {
  //     alert('Error creating cron job');
  //   } else {
  //     setOpen(false); 
  //     setSelectedDate('');
  //     setSelectedTime('');
  //   }
  // };
  // const handleSubmitCronJob = async () => {
  //   if (!selectedFtp || !operations || !selectedDate || !selectedTime) {
  //     alert("Please fill in all fields");
  //     return;
  //   }
  
  //   const combinedDateTime = new Date(`${selectedDate}T${selectedTime}`);
  //   const isoSchedule = combinedDateTime.toISOString();
  
  //   setSchedule(isoSchedule);
  
  //   try {
  //     const response = await createCron({
  //       ftpId: selectedFtp._id,
  //       operations,
  //       schedule: isoSchedule,
  //     });
  
  //     if (response?.statusText && response.statusText !== 'Created') {
  //       setOpen(false); // Close the modal
  //       setSelectedDate(""); // Reset the date
  //       setSelectedTime(""); // Reset the time
  //     } else {
  //       alert(`Error creating cron job: ${response.statusText || response.message}`);
  //     }
  //   } catch (error) {
  //     console.error("Error creating cron job:", error);
  //     alert("An unexpected error occurred");
  //   }
  // };
  const handleSubmitCronJob = async () => {
    if (!selectedFtp || !operations || !selectedDate || !selectedTime) {
      alert("Please fill in all fields");
      return;
    }
  
    const combinedDateTime = new Date(`${selectedDate}T${selectedTime}`);
    const isoSchedule = combinedDateTime.toISOString();
  
    setSchedule(isoSchedule);
  
    try {
      const response = await createCron({
        ftpId: selectedFtp._id,
        operations,
        schedule: isoSchedule,
      });
  
      if (response?.statusText === 'Created') {
        setOpen(false); // Close the modal
        setSelectedDate(""); // Reset the date
        setSelectedTime(""); // Reset the time
      } else {
        alert(`Error creating cron job: ${response.statusText || response.message}`);
      }
    } catch (error) {
      console.error("Error creating cron job:", error);
      alert("An unexpected error occurred");
    }
  };
  
  
  

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Matrix</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> User Name</TableCell>
              <TableCell>  Company name</TableCell>
              <TableCell>Host</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>Logs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedFtps.map((ftp) => (
              <TableRow key={ftp._id}>
                <TableCell>{ftp.ftpUser}</TableCell>
                <TableCell>{ftp?.user?.companyName}</TableCell>
                <TableCell>{ftp.host}</TableCell>
                <TableCell></TableCell>    
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleCreateCron(ftp)}>
                    Create Cron Job
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Cron Job Creation */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6">Create Cron Job for {selectedFtp?.host}</Typography>

          <TextField
            fullWidth
            label="Operations"
            placeholder="Enter operations"
            value={operations}
            onChange={(e) => setOperations(e.target.value)}
            margin="normal"
            disabled
          />

          {/* Date selection */}
          <TextField
            fullWidth
            label=""
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            margin="normal"
          />

          {/* Time selection */}
          <TextField
            fullWidth
            label="Select Time"
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            margin="normal"
          />

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSubmitCronJob}>
              Submit
            </Button>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
}

// Pagination function
function applyPagination(rows: Ftp[], page: number, rowsPerPage: number): Ftp[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}

// Modal style
const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
