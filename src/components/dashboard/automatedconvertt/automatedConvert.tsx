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
    logs:string;
    jobStatus:string;
  }
  
  interface VendorTableProps {
    vendors: Vendor[];
    trigger: boolean;
  }




const AutomatedConvert = () => {
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
            const response = await axios.post('/api/v1/convert/uploadAndConvertFile', formData, {
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
        return convertedFile?.createdBy?.firstName.toLowerCase()?.includes(keyword)
            || convertedFile?.conversionType?.toLowerCase()?.includes(keyword)
            || convertedFile?.createdBy?.lastName.toLowerCase()?.includes(keyword)
            || convertedFile?.createdBy?.companyName.toLowerCase()?.includes(keyword)
            || convertedFile?.convertedBy?.firstName.toLowerCase()?.includes(keyword)
            || convertedFile?.convertedBy?.lastName.toLowerCase()?.includes(keyword)
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

    return (
        <div>
            <Stack spacing={3}>
                {inprogress && <CircularIndeterminate />}
                <Stack direction="row" spacing={3}>
                    <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                        <Typography variant="h4">Automated Import</Typography>
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

export default AutomatedConvert;