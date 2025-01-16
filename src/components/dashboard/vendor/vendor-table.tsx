"use client";
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
} from '@mui/material';
import { getAllVendor } from '@/service/vendor/getAllVendor';

interface Vendor {
    id:string;
    firstName: string;
    lastName:string;
    contactNumber:boolean;
    email: string;
    companyName: string;
    companyAddress: string;
    role: string;
}

interface VendorTableProps {
    vendors: Vendor[];
    trigger: boolean;
}

const VendorTable: React.FC<VendorTableProps> = ({ trigger }) => {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
    }, [trigger]); 

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Contact Number</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Company Name</TableCell>
                        <TableCell>Company Address</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vendors.map((vendor) => (
                        <TableRow key={vendor.email}>
                            <TableCell>{vendor.firstName}</TableCell>
                            <TableCell>{vendor.lastName}</TableCell>
                            <TableCell>{vendor.contactNumber}</TableCell>
                            <TableCell>{vendor.email}</TableCell>
                            <TableCell>{vendor.companyName}</TableCell>
                            <TableCell>{vendor.companyAddress}</TableCell>
                            <TableCell>{vendor.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default VendorTable;
