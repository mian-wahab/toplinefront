// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Box, Button, Card, Stack, Typography } from '@mui/material';
// import CircularIndeterminate from '@/components/spinner/MuiSpinner';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import styled from '@emotion/styled';
// import SendIcon from '@mui/icons-material/Send';
// import { ConvertedFile, FileConversionTable } from '../conversion/file-conversion-table';
// import { FileConversionFilter } from '../conversion/file-conversion-filters';
// import { useUser } from '@/hooks/use-user';
// import { ToastType } from '@/contexts/enums';
// import { GetAllConvertedFiles } from '@/service';

// const UploadAndConvertFile = () => {
//     const { toast } = useUser();
//     const [file, setFile] = useState<File | null>(null);
//     const [inprogress, setInprogress] = useState(false);
//     const [downloadLink, setDownloadLink] = useState('');
//     const [keyword, setKeyword] = useState<string>('');
//     const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         // max limit of file is 200mb
//         if (e?.target?.files && e.target.files[0]?.size > 200000000) {
//             return toast.setToast({ isOpen: true, message: 'File size should be less than 200mb', type: ToastType.ERROR });
//         }
//         // it must be a csv, xlsx or xls file
//         const allowedExtensions = /(\.xlsx|\.xls|\.csv)$/i; 
//         if (!allowedExtensions.exec(e.target.value)) {
//             return toast.setToast({ isOpen: true, message: 'Invalid file type. Only xlsx, xls and csv files are allowed', type: ToastType.ERROR });
//         }
//         const selectedFile = e.target.files?.[0] as File;
//         setFile(selectedFile);
//     };
//     const page = 0;
//     const rowsPerPage = 10;

//     const paginatedCustomers = applyPagination(convertedFiles || [], page, rowsPerPage);
//     const handleUpload = async (e: { preventDefault: () => void; }) => {
//         e.preventDefault();
//         if (!file) {
//             return toast.setToast({ isOpen: true, message: 'Please select a file to upload', type: ToastType.ERROR });
//         }
//         setInprogress(true);
//         const formData = new FormData();
//         formData.append('file', file);
//         try {
//             const token = localStorage.getItem('custom-auth-token');
//             const response = await axios.post('http://localhost:4040/api/v1/convert/uploadAndConvertFile', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': token,
//                 },
//                 responseType: 'blob',
//             });

//             if (response?.data) {
//                 const url = window.URL.createObjectURL(new Blob([response.data]));
//                 setDownloadLink(url);
//                 await GetAllFiles();
//             }
//             await GetAllFiles();
//             setInprogress(false);
//         } catch (error) {
//             setInprogress(false);
//             console.error('Error uploading file:', error);
//         }
//     };
//     const VisuallyHiddenInput = styled('input')({
//         clip: 'rect(0 0 0 0)',
//         clipPath: 'inset(50%)',
//         height: 1,
//         overflow: 'hidden',
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         whiteSpace: 'nowrap',
//         width: 1,
//     });
//     const filteredConvertedFileData = convertedFiles?.filter((convertedFile) => {
//         return convertedFile?.createdBy?.fullName?.toLowerCase()?.includes(keyword)
//             || convertedFile?.conversionType?.toLowerCase()?.includes(keyword)
//             || convertedFile.vendor?.fullName?.toLowerCase()?.includes(keyword)
//             || convertedFile?.createdAt?.toLowerCase()?.includes(keyword);
//     });

//     const GetAllFiles = async () => {
//         setInprogress(true);
//         const files = await GetAllConvertedFiles();
//         if (files?.error) {
//             toast.setToast({ isOpen: true, message: files.error, type: ToastType.ERROR });
//             setInprogress(false);
//             return setConvertedFiles([]);
//         }
//         setConvertedFiles(files?.files?.data as ConvertedFile[]);
//         setInprogress(false);
//     }

//     useEffect(() => {
//         GetAllFiles();
//     }, []);
//     console.log('convertedFiles', convertedFiles);
//     return (
//         <div>
//             <Stack spacing={3}>
//                 {inprogress && <CircularIndeterminate />}
//                 <Stack direction="row" spacing={3}>
//                     <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
//                         <Typography variant="h4">Manual Import</Typography>
//                     </Stack>
//                 </Stack>
//                 <Card>
//                     <Box sx={{ padding: '22px' }}>
//                         {/* choose member required */}
//                         <h3>Upload and Convert File</h3>
//                         <form onSubmit={handleUpload}>
//                             <Button
//                                 component="label"
//                                 role={undefined}
//                                 variant="contained"
//                                 tabIndex={-1}
//                                 startIcon={<CloudUploadIcon />}
//                             >
//                                 Upload files
//                                 <VisuallyHiddenInput
//                                     type="file"
//                                     onChange={handleFileChange}
//                                     multiple
//                                 />
//                             </Button>
//                             <Button sx={{ mx: 2 }} type='submit' variant="contained" endIcon={<SendIcon />}>
//                                 Send
//                             </Button>
//                         </form>
//                         {downloadLink && (
//                             <div>
//                                 <a href={downloadLink} download="converted_file.xlsx">Download Converted File</a>
//                             </div>
//                         )}
//                     </Box>
//                 </Card>
//                 {inprogress && <CircularIndeterminate />}
//                 <FileConversionFilter setKeyword={setKeyword} />
//                 <FileConversionTable
//                     count={paginatedCustomers.length}
//                     page={page}
//                     rows={filteredConvertedFileData}
//                     rowsPerPage={rowsPerPage}
//                 />
//             </Stack>

//         </div>
//     );
// };
// function applyPagination(rows: ConvertedFile[], page: number, rowsPerPage: number): ConvertedFile[] {
//     return rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }
// export default UploadAndConvertFile;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Box, Button, Card, Stack, Typography, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
// import CircularIndeterminate from '@/components/spinner/MuiSpinner';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import styled from '@emotion/styled';
// import SendIcon from '@mui/icons-material/Send';
// import { ConvertedFile, FileConversionTable } from '../conversion/file-conversion-table';
// import { FileConversionFilter } from '../conversion/file-conversion-filters';
// import { useUser } from '@/hooks/use-user';
// import { ToastType } from '@/contexts/enums';
// import { GetAllConvertedFiles } from '@/service';
// import { getAllVendor } from '@/service/vendor/getAllVendor';  // Import your vendor service

// const UploadAndConvertFile = () => {
//     const { toast } = useUser();
//     const [file, setFile] = useState<File | null>(null);
//     const [inprogress, setInprogress] = useState(false);
//     const [downloadLink, setDownloadLink] = useState('');
//     const [keyword, setKeyword] = useState<string>('');
//     const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
//     const [vendors, setVendors] = useState<any[]>([]);  // State to store vendors
//     const [selectedVendor, setSelectedVendor] = useState<string>('');  // State to store selected vendor

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e?.target?.files && e.target.files[0]?.size > 200000000) {
//             return toast.setToast({ isOpen: true, message: 'File size should be less than 200mb', type: ToastType.ERROR });
//         }
//         const allowedExtensions = /(\.xlsx|\.xls|\.csv)$/i; 
//         if (!allowedExtensions.exec(e.target.value)) {
//             return toast.setToast({ isOpen: true, message: 'Invalid file type. Only xlsx, xls and csv files are allowed', type: ToastType.ERROR });
//         }
//         const selectedFile = e.target.files?.[0] as File;
//         setFile(selectedFile);
//     };

//     const page = 0;
//     const rowsPerPage = 10;

//     const paginatedCustomers = applyPagination(convertedFiles || [], page, rowsPerPage);

//     // Fetch vendors when the component mounts
//     useEffect(() => {
//         const fetchVendors = async () => {
//             const vendorsData = await getAllVendor();
//             setVendors(vendorsData);  // Set vendors in state
//         };
//         fetchVendors();
//         GetAllFiles();
//     }, []);

//     const handleVendorChange = (event: SelectChangeEvent<string>) => {
//                 setSelectedVendor(event.target.value);
//             };

//     const handleUpload = async (e: { preventDefault: () => void; }) => {
//         e.preventDefault();
//         if (!file) {
//             return toast.setToast({ isOpen: true, message: 'Please select a file to upload', type: ToastType.ERROR });
//         }
//         if (!selectedVendor) {
//             return toast.setToast({ isOpen: true, message: 'Please select a vendor', type: ToastType.ERROR });
//         }

//         setInprogress(true);
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('vendor', selectedVendor);  // Append the selected vendor

//         try {
//             const token = localStorage.getItem('custom-auth-token');
//             const response = await axios.post('http://localhost:4040/api/v1/convert/uploadAndConvertFile', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': token,
//                 },
//                 responseType: 'blob',
//             });

//             if (response?.data) {
//                 const url = window.URL.createObjectURL(new Blob([response.data]));
//                 setDownloadLink(url);
//                 await GetAllFiles();
//             }
//             setInprogress(false);
//         } catch (error) {
//             setInprogress(false);
//             console.error('Error uploading file:', error);
//         }
//     };

//     const VisuallyHiddenInput = styled('input')({
//         clip: 'rect(0 0 0 0)',
//         clipPath: 'inset(50%)',
//         height: 1,
//         overflow: 'hidden',
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         whiteSpace: 'nowrap',
//         width: 1,
//     });

//     const filteredConvertedFileData = convertedFiles?.filter((convertedFile) => {
//         return convertedFile?.createdBy?.fullName?.toLowerCase()?.includes(keyword)
//             || convertedFile?.conversionType?.toLowerCase()?.includes(keyword)
//             || convertedFile.vendor?.fullName?.toLowerCase()?.includes(keyword)
//             || convertedFile?.createdAt?.toLowerCase()?.includes(keyword);
//     });

//     const GetAllFiles = async () => {
//         setInprogress(true);
//         const files = await GetAllConvertedFiles();
//         if (files?.error) {
//             toast.setToast({ isOpen: true, message: files.error, type: ToastType.ERROR });
//             setInprogress(false);
//             return setConvertedFiles([]);
//         }
//         setConvertedFiles(files?.files?.data as ConvertedFile[]);
//         setInprogress(false);
//     };

//     return (
//         <div>
//             <Stack spacing={3}>
//                 {inprogress && <CircularIndeterminate />}
//                 <Stack direction="row" spacing={3}>
//                     <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
//                         <Typography variant="h4">Manual Import</Typography>
//                     </Stack>
//                 </Stack>
//                 <Card>
//                     <Box sx={{ padding: '22px' }}>
//                         <h3>Upload and Convert File</h3>
                        
//                         {/* Vendor Selection */}
//                         <FormControl fullWidth sx={{ marginBottom: 2 }}>
//                             <InputLabel id="vendor-select-label">Select Vendor</InputLabel>
//                             <Select
//                                 labelId="vendor-select-label"
//                                 id="vendor-select"
//                                 value={selectedVendor}
//                                 onChange={handleVendorChange}
//                                 label="Select Vendor"
//                             >
//                                 {vendors?.map((vendor: any) => (
//                                     <MenuItem key={vendor.email} value={vendor.email}>
//                                         {vendor.firstName}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>

//                         <form onSubmit={handleUpload}>
//                             <Button
//                                 component="label"
//                                 role={undefined}
//                                 variant="contained"
//                                 tabIndex={-1}
//                                 startIcon={<CloudUploadIcon />}
//                             >
//                                 Upload files
//                                 <VisuallyHiddenInput
//                                     type="file"
//                                     onChange={handleFileChange}
//                                     multiple
//                                 />
//                             </Button>
//                             <Button sx={{ mx: 2 }} type='submit' variant="contained" endIcon={<SendIcon />}>
//                                 Send
//                             </Button>
//                         </form>

//                         {downloadLink && (
//                             <div>
//                                 <a href={downloadLink} download="converted_file.xlsx">Download Converted File</a>
//                             </div>
//                         )}
//                     </Box>
//                 </Card>
//                 {inprogress && <CircularIndeterminate />}
//                 <FileConversionFilter setKeyword={setKeyword} />
//                 <FileConversionTable
//                     count={paginatedCustomers.length}
//                     page={page}
//                     rows={filteredConvertedFileData}
//                     rowsPerPage={rowsPerPage}
//                 />
//             </Stack>
//         </div>
//     );
// };

// function applyPagination(rows: ConvertedFile[], page: number, rowsPerPage: number): ConvertedFile[] {
//     return rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }

// export default UploadAndConvertFile;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Card, Stack, Typography, MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import CircularIndeterminate from '@/components/spinner/MuiSpinner';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from '@emotion/styled';
import SendIcon from '@mui/icons-material/Send';
import { ConvertedFile, FileConversionTable } from '../conversion/file-conversion-table';
import { FileConversionFilter } from '../conversion/file-conversion-filters';
import { useUser } from '@/hooks/use-user';
import { ToastType } from '@/contexts/enums';
import { GetAllConvertedFiles } from '@/service';
import { getAllVendor } from '@/service/vendor/getAllVendor';



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
    // logs:string;
    jobStatus:string;
  }
  
  interface VendorTableProps {
    vendors: Vendor[];
    trigger: boolean;
  }




const UploadAndConvertFile = () => {
    const { toast } = useUser();
    const [file, setFile] = useState<File | null>(null);
    const [inprogress, setInprogress] = useState(false);
    const [downloadLink, setDownloadLink] = useState('');
    const [keyword, setKeyword] = useState<string>('');
    const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
     const [vendors, setVendors] = useState<Vendor[]>([]);
      const [loading, setLoading] = useState<boolean>(true);
    const [selectedVendor, setSelectedVendor] = useState(''); 

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files && e.target.files[0]?.size > 200000000) {
            return toast.setToast({ isOpen: true, message: 'File size should be less than 200mb', type: ToastType.ERROR });
        }
        const allowedExtensions = /(\.xlsx|\.xls|\.csv)$/i; 
        if (!allowedExtensions.exec(e.target.value)) {
            return toast.setToast({ isOpen: true, message: 'Invalid file type. Only xlsx, xls and csv files are allowed', type: ToastType.ERROR });
        }
        const selectedFile = e.target.files?.[0] as File;
        setFile(selectedFile);
    };

    const page = 0;
    const rowsPerPage = 10;

    const paginatedCustomers = applyPagination(convertedFiles || [], page, rowsPerPage);
   

// // Handle vendor selection
// const handleVendorChange = (event) => {
//   setSelectedVendor(event.target.value);
// };


    // Fetch vendors when the component mounts
    // useEffect(() => {
    //     const fetchVendors = async () => {
    //         try {
    //             const vendorsData = await getAllVendor();
    //             if (vendorsData?.data && Array.isArray(vendorsData?.data)) {
    //                 setVendors(vendorsData.data);  // Ensure you're setting an array of vendors
    //             } else {
    //                 toast.setToast({ isOpen: true, message: 'Failed to fetch vendors', type: ToastType.ERROR });
    //             }
    //         } catch (error) {
    //             console.error('Error fetching vendors:', error);
    //             toast.setToast({ isOpen: true, message: 'Error fetching vendors', type: ToastType.ERROR });
    //         }
    //     };
    //     fetchVendors();
    //     GetAllFiles();
    // }, []);
    

    const handleVendorChange = (event: SelectChangeEvent<string>) => {
        setSelectedVendor(event.target.value);  // This should be vendor._id or another unique identifier
    };    

    const handleUpload = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!file) {
            return toast.setToast({ isOpen: true, message: 'Please select a file to upload', type: ToastType.ERROR });
        }
        if (!selectedVendor) {
            return toast.setToast({ isOpen: true, message: 'Please select a vendor', type: ToastType.ERROR });
        }

        setInprogress(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('vendor', selectedVendor);

        try {
            const token = localStorage.getItem('custom-auth-token');
            const response = await axios.post('http://localhost:4040/api/v1/convert/uploadAndConvertFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': token,
                },
                responseType: 'blob',
            });

            if (response?.data) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                setDownloadLink(url);
                await GetAllFiles();
                
            }
            await GetAllFiles();
            setInprogress(false);
        } catch (error) {
            setInprogress(false);
            console.error('Error uploading file:', error);
        }
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const filteredConvertedFileData = convertedFiles?.filter((convertedFile) => {
        return convertedFile?.createdBy?.email.toLowerCase()?.includes(keyword)
            || convertedFile?.conversionType?.toLowerCase()?.includes(keyword)
            || convertedFile?.createdBy?.firstName.toLowerCase()?.includes(keyword)
            || convertedFile?.createdBy?.companyName.toLowerCase()?.includes(keyword)
            || convertedFile?.convertedBy?.firstName.toLowerCase()?.includes(keyword)
            || convertedFile?.convertedBy?.lastName.toLowerCase()?.includes(keyword)
            || convertedFile.vendor?.companyName?.toLowerCase()?.includes(keyword)
            || convertedFile?.createdBy?.lastName.toLowerCase()?.includes(keyword)
            || convertedFile?.createdAt?.toLowerCase()?.includes(keyword);
    });

    const GetAllFiles = async () => {
        setInprogress(true);
        const files = await GetAllConvertedFiles();
        if (files?.error) {
            toast.setToast({ isOpen: true, message: files.error, type: ToastType.ERROR });
            setInprogress(false);
            return setConvertedFiles([]);
        }
        setConvertedFiles(files?.files?.data as ConvertedFile[]);
        setInprogress(false);
    };
    useEffect(() => {
        const fetchVendors = async () => {
                            try {
                                const response = await getAllVendor() as any;
                                setVendors(response?.data?.data);
                            } catch (error) {
                                console.error('Error fetching vendors:', error);
                            } finally {
                                setLoading(false);
                            }
                        };
                
                        fetchVendors();
                        GetAllFiles();
                    }, []);
                    console.log('convertedFiles', convertedFiles);
    

    return (
        <div>
            <Stack spacing={3}>
                {inprogress && <CircularIndeterminate />}
                <Stack direction="row" spacing={3}>
                    <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                        <Typography variant="h4">Manual Import</Typography>
                    </Stack>
                </Stack>
                <Card>
                    <Box sx={{ padding: '22px' }}>
                        <h3>Upload and Convert File</h3>
                        
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                                <InputLabel id="vendor-select-label">Select Vendor</InputLabel>
                                <Select
                                    labelId="vendor-select-label"
                                    id="vendor-select"
                                    value={selectedVendor}
                                    onChange={handleVendorChange}
                                    label="Select Vendor"
                                >
                                    {vendors.map((vendor) => (
                                    <MenuItem key={vendor.email} value={vendor.email}> {/* Ensure unique key is provided */}
                                        {vendor.firstName}{vendor.lastName}
                                    </MenuItem>
                                    ))}
                                </Select>
                                </FormControl>


                        <form onSubmit={handleUpload}>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload files
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={handleFileChange}
                                    multiple
                                />
                            </Button>
                            <Button 
                                sx={{ mx: 2 }} 
                                type="submit" 
                                variant="contained" 
                                endIcon={<SendIcon />} 
                                disabled={!selectedVendor} // Disable if no vendor is selected
                                >
                                Send
                             </Button>

                        </form>

                        {downloadLink && (
                            <div>
                                <a href={downloadLink} download="converted_file.xlsx">Download Converted File</a>
                            </div>
                        )}
                    </Box>
                </Card>
                {inprogress && <CircularIndeterminate />}
                <FileConversionFilter setKeyword={setKeyword} />
                <FileConversionTable
                    count={paginatedCustomers.length}
                    page={page}
                    rows={filteredConvertedFileData}
                    rowsPerPage={rowsPerPage}
                />
            </Stack>
        </div>
    );
};

function applyPagination(rows: ConvertedFile[], page: number, rowsPerPage: number): ConvertedFile[] {
    return rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}

export default UploadAndConvertFile;


// 'use client'
// import axios from 'axios';
// import React, { useState } from 'react';
// import { Box, Button, Card, Stack, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
// import CircularIndeterminate from '@/components/spinner/MuiSpinner';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import styled from '@emotion/styled';
// import SendIcon from '@mui/icons-material/Send';
// import { ConvertedFile, FileConversionTable } from '../conversion/file-conversion-table';
// import { FileConversionFilter } from '../conversion/file-conversion-filters';
// import { useUser } from '@/hooks/use-user';
// import { ToastType } from '@/contexts/enums';
// import { GetAllConvertedFiles } from '@/service';
// // import { VendorsTable, Vendor } from '../vendor/vendor-table' ;

// interface Vendor {
//     firstName: string;
//     lastName: string;
//     email: string;
//     companyName: string;
//     companyAddress: string;
//     contactNumber: string;
//     createdAt: string;
//   }


// const UploadAndConvertFile = ({ vendors }: { vendors: Vendor[] }) => {
//     const { toast } = useUser();
//     const [file, setFile] = useState<File | null>(null);
//     const [inprogress, setInprogress] = useState(false);
//     const [downloadLink, setDownloadLink] = useState('');
//     const [keyword, setKeyword] = useState<string>('');
//     const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
//     const [selectedVendor, setSelectedVendor] = useState<string>('');

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e?.target?.files && e.target.files[0]?.size > 200000000) {
//             return toast.setToast({ isOpen: true, message: 'File size should be less than 200mb', type: ToastType.ERROR });
//         }
//         const allowedExtensions = /(\.xlsx|\.xls|\.csv)$/i;
//         if (!allowedExtensions.exec(e.target.value)) {
//             return toast.setToast({ isOpen: true, message: 'Invalid file type. Only xlsx, xls and csv files are allowed', type: ToastType.ERROR });
//         }
//         setFile(e.target.files?.[0] as File);
//     };

//     const handleVendorChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//         setSelectedVendor(event.target.value as string);
//     };

//     const handleUpload = async (e: { preventDefault: () => void; }) => {
//         e.preventDefault();
//         if (!file) {
//             return toast.setToast({ isOpen: true, message: 'Please select a file to upload', type: ToastType.ERROR });
//         }
//         if (!selectedVendor) {
//             return toast.setToast({ isOpen: true, message: 'Please select a vendor', type: ToastType.ERROR });
//         }
//         setInprogress(true);
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('vendorId', selectedVendor);
//         try {
//             const token = localStorage.getItem('custom-auth-token');
//             const response = await axios.post('http://localhost:4040/api/v1/convert/uploadAndConvertFile', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': token,
//                 },
//                 responseType: 'blob',
//             });

//             if (response?.data) {
//                 const url = window.URL.createObjectURL(new Blob([response.data]));
//                 setDownloadLink(url);
//                 await GetAllFiles();
//             }
//             setInprogress(false);
//         } catch (error) {
//             setInprogress(false);
//             console.error('Error uploading file:', error);
//         }
//     };

//     const VisuallyHiddenInput = styled('input')({
//         clip: 'rect(0 0 0 0)',
//         clipPath: 'inset(50%)',
//         height: 1,
//         overflow: 'hidden',
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         whiteSpace: 'nowrap',
//         width: 1,
//     });   

//     const filteredConvertedFileData = convertedFiles?.filter((convertedFile) => {
//         return convertedFile?.createdBy?.fullName?.toLowerCase()?.includes(keyword)
//             || convertedFile?.conversionType?.toLowerCase()?.includes(keyword)
//             || convertedFile.vendor?.fullName?.toLowerCase()?.includes(keyword)
//             || convertedFile?.createdAt?.toLowerCase()?.includes(keyword);
//     });

//     const GetAllFiles = async () => {
//         setInprogress(true);
//         const files = await GetAllConvertedFiles();
//         if (files?.error) {
//             toast.setToast({ isOpen: true, message: files.error, type: ToastType.ERROR });
//             setInprogress(false);
//             return setConvertedFiles([]);
//         }
//         setConvertedFiles(files?.files?.data as ConvertedFile[]);
//         setInprogress(false);
//     };

//     return (
//         <div>
//             <Stack spacing={3}>
//                 {inprogress && <CircularIndeterminate />}
//                 <Stack direction="row" spacing={3}>
//                     <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
//                         <Typography variant="h4">Manual Import</Typography>
//                     </Stack>
//                 </Stack>
//                 <Card>
//                     <Box sx={{ padding: '22px' }}>
//                         <h3>Upload and Convert File</h3>
//                         <form onSubmit={handleUpload}>
//                         <FormControl fullWidth sx={{ mb: 2 }}>
//                                 <InputLabel id="vendor-select-label">Select Vendor</InputLabel>
//                                 <Select
//                                 labelId="vendor-select-label"
//                                 value={selectedVendor}
//                                 onChange={handleVendorChange}
//                                 displayEmpty
//                                 required
//                                 >
//                                 <MenuItem value="" disabled>Select a vendor</MenuItem>
//                                 {vendors.map((vendor, index) => (
//                                                                 <MenuItem key={index} value={vendor.email}>
//                                                                     {`${vendor.firstName} ${vendor.lastName}`}
//                                                                 </MenuItem>
//                                                             ))}
//                                 </Select>
//                             </FormControl>
                                
//                             <Button
//                                 component="label"
//                                 role={undefined}
//                                 variant="contained"
//                                 tabIndex={-1}
//                                 startIcon={<CloudUploadIcon />}
//                             >
//                                 Upload files
//                                 <VisuallyHiddenInput
//                                     type="file"
//                                     onChange={handleFileChange}
//                                     multiple
//                                 />
//                             </Button>
//                             <Button sx={{ mx: 2 }} type='submit' variant="contained" endIcon={<SendIcon />}>
//                                 Send
//                             </Button>
//                         </form>
//                         {downloadLink && (
//                             <div>
//                                 <a href={downloadLink} download="converted_file.xlsx">Download Converted File</a>
//                             </div>
//                         )}
//                     </Box>
//                 </Card>
//                 {inprogress && <CircularIndeterminate />}
//                 <FileConversionFilter setKeyword={setKeyword} />
//                 <FileConversionTable
//                     count={filteredConvertedFileData.length}
//                     page={0}
//                     rows={filteredConvertedFileData}
//                     rowsPerPage={10}
//                 />
//             </Stack>
//         </div>
//     );
// };

// export default UploadAndConvertFile;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Box, Button, Card, Stack, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
// import CircularIndeterminate from '@/components/spinner/MuiSpinner';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import styled from '@emotion/styled';
// import SendIcon from '@mui/icons-material/Send';
// import { ConvertedFile, FileConversionTable } from '../conversion/file-conversion-table';
// import { FileConversionFilter } from '../conversion/file-conversion-filters';
// import { useUser } from '@/hooks/use-user';
// import { SelectChangeEvent } from '@mui/material';
// import { ToastType } from '@/contexts/enums';
// import { GetAllConvertedFiles } from '@/service';

// interface Vendor {
//     firstName: string;
//     lastName: string;
//     email: string;
//     companyName: string;
//     companyAddress: string;
//     contactNumber: string;
//     createdAt: string;
// }

// const UploadAndConvertFile = ({ vendors }: { vendors: Vendor[] }) => {
//     const { toast } = useUser();
//     const [file, setFile] = useState<File | null>(null);
//     const [inprogress, setInprogress] = useState(false);
//     const [downloadLink, setDownloadLink] = useState('');
//     const [keyword, setKeyword] = useState<string>('');
//     const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
//     const [selectedVendor, setSelectedVendor] = useState<string>('');

//     useEffect(() => {
//         console.log('Vendors:', vendors); // Log vendors to verify the data
//     }, [vendors]);

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e?.target?.files && e.target.files[0]?.size > 200000000) {
//             return toast.setToast({ isOpen: true, message: 'File size should be less than 200mb', type: ToastType.ERROR });
//         }
//         const allowedExtensions = /(\.xlsx|\.xls|\.csv)$/i;
//         if (!allowedExtensions.exec(e.target.value)) {
//             return toast.setToast({ isOpen: true, message: 'Invalid file type. Only xlsx, xls and csv files are allowed', type: ToastType.ERROR });
//         }
//         setFile(e.target.files?.[0] as File);
//     };

//     const handleVendorChange = (event: SelectChangeEvent<string>) => {
//         setSelectedVendor(event.target.value);
//     };

//     const handleUpload = async (e: { preventDefault: () => void; }) => {
//         e.preventDefault();
//         if (!file) {
//             return toast.setToast({ isOpen: true, message: 'Please select a file to upload', type: ToastType.ERROR });
//         }
//         if (!selectedVendor) {
//             return toast.setToast({ isOpen: true, message: 'Please select a vendor', type: ToastType.ERROR });
//         }
//         setInprogress(true);
//         const formData = new FormData();
//         formData.append('file', file);
//         formData.append('vendorId', selectedVendor);
//         try {
//             const token = localStorage.getItem('custom-auth-token');
//             const response = await axios.post('http://localhost:4040/api/v1/convert/uploadAndConvertFile', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': token,
//                 },
//                 responseType: 'blob',
//             });

//             if (response?.data) {
//                 const url = window.URL.createObjectURL(new Blob([response.data]));
//                 setDownloadLink(url);
//                 await GetAllFiles();
//             }
//             setInprogress(false);
//         } catch (error) {
//             setInprogress(false);
//             console.error('Error uploading file:', error);
//         }
//     };

//     const VisuallyHiddenInput = styled('input')({
//         clip: 'rect(0 0 0 0)',
//         clipPath: 'inset(50%)',
//         height: 1,
//         overflow: 'hidden',
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         whiteSpace: 'nowrap',
//         width: 1,
//     });

//     const filteredConvertedFileData = convertedFiles?.filter((convertedFile) => {
//         return convertedFile?.createdBy?.fullName?.toLowerCase()?.includes(keyword)
//             || convertedFile?.conversionType?.toLowerCase()?.includes(keyword)
//             || convertedFile.vendor?.fullName?.toLowerCase()?.includes(keyword)
//             || convertedFile?.createdAt?.toLowerCase()?.includes(keyword);
//     });

//     const GetAllFiles = async () => {
//         setInprogress(true);
//         const files = await GetAllConvertedFiles();
//         if (files?.error) {
//             toast.setToast({ isOpen: true, message: files.error, type: ToastType.ERROR });
//             setInprogress(false);
//             return setConvertedFiles([]);
//         }
//         setConvertedFiles(files?.files?.data as ConvertedFile[]);
//         setInprogress(false);
//     };

//     return (
//         <div>
//             <Stack spacing={3}>
//                 {inprogress && <CircularIndeterminate />}
//                 <Stack direction="row" spacing={3}>
//                     <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
//                         <Typography variant="h4">Manual Import</Typography>
//                     </Stack>
//                 </Stack>
//                 <Card>
//                     <Box sx={{ padding: '22px' }}>
//                         <h3>Upload and Convert File</h3>
//                         <form onSubmit={handleUpload}>
//                             <FormControl fullWidth sx={{ mb: 2 }}>
//                                 <InputLabel id="vendor-select-label">Select Vendor</InputLabel>
//                                 <Select
//                                     labelId="vendor-select-label"
//                                     value={selectedVendor}
//                                     onChange={handleVendorChange}
//                                     displayEmpty
//                                     required
//                                 >
//                                     <MenuItem value="" disabled>Select a vendor</MenuItem>
//                                     {vendors && vendors.length > 0 ? (
//                                         vendors.map((vendor, index) => (
//                                             <MenuItem key={index} value={vendor.email}>
//                                                 {`${vendor.firstName} ${vendor.lastName}`}
//                                             </MenuItem>
//                                         ))
//                                     ) : (
//                                         <MenuItem disabled>No vendors available</MenuItem>
//                                     )}
//                                 </Select>
//                             </FormControl>
                            
//                             <Button
//                                 component="label"
//                                 role={undefined}
//                                 variant="contained"
//                                 tabIndex={-1}
//                                 startIcon={<CloudUploadIcon />}
//                             >
//                                 Upload files
//                                 <VisuallyHiddenInput
//                                     type="file"
//                                     onChange={handleFileChange}
//                                     multiple
//                                 />
//                             </Button>
//                             <Button sx={{ mx: 2 }} type='submit' variant="contained" endIcon={<SendIcon />}>
//                                 Send
//                             </Button>
//                         </form>
//                         {downloadLink && (
//                             <div>
//                                 <a href={downloadLink} download="converted_file.xlsx">Download Converted File</a>
//                             </div>
//                         )}
//                     </Box>
//                 </Card>
//                 {inprogress && <CircularIndeterminate />}
//                 <FileConversionFilter setKeyword={setKeyword} />
//                 <FileConversionTable
//                     count={filteredConvertedFileData.length}
//                     page={0}
//                     rows={filteredConvertedFileData}
//                     rowsPerPage={10}
//                 />
//             </Stack>
//         </div>
//     );
// };

// export default UploadAndConvertFile;


