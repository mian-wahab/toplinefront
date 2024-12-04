import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
import CircularIndeterminate from '@/components/spinner/MuiSpinner';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from '@emotion/styled';
import SendIcon from '@mui/icons-material/Send';
import { ConvertedFile, FileConversionTable } from '../conversion/file-conversion-table';
import { FileConversionFilter } from '../conversion/file-conversion-filters';
import { useUser } from '@/hooks/use-user';
import { ToastType } from '@/contexts/enums';
import { GetAllConvertedFiles } from '@/service';

const UploadAndConvertFile = () => {
    const { toast } = useUser();
    const [file, setFile] = useState<File | null>(null);
    const [inprogress, setInprogress] = useState(false);
    const [downloadLink, setDownloadLink] = useState('');
    const [keyword, setKeyword] = useState<string>('');
    const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // max limit of file is 200mb
        if (e?.target?.files && e.target.files[0]?.size > 200000000) {
            return toast.setToast({ isOpen: true, message: 'File size should be less than 200mb', type: ToastType.ERROR });
        }
        // it must be a csv, xlsx or xls file
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
    const handleUpload = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!file) {
            return toast.setToast({ isOpen: true, message: 'Please select a file to upload', type: ToastType.ERROR });
        }
        setInprogress(true);
        const formData = new FormData();
        formData.append('file', file);
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
        return convertedFile?.createdBy?.fullName?.toLowerCase()?.includes(keyword)
            || convertedFile?.conversionType?.toLowerCase()?.includes(keyword)
            || convertedFile.vendor?.fullName?.toLowerCase()?.includes(keyword)
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
    }

    useEffect(() => {
        GetAllFiles();
    }, []);
    console.log('convertedFiles', convertedFiles);
    return (
        <div>
            <Stack spacing={3}>
                {inprogress && <CircularIndeterminate />}
                <Stack direction="row" spacing={3}>
                    <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                        <Typography variant="h4">Ftps</Typography>
                    </Stack>
                </Stack>
                <Card>
                    <Box sx={{ padding: '22px' }}>
                        <h3>Upload and Convert File</h3>
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
                            <Button sx={{ mx: 2 }} type='submit' variant="contained" endIcon={<SendIcon />}>
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
