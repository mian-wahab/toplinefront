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
    _id: string;
    userName: string;
    email: string;
    fullName: string;
    role: string;
}

interface VendorTableProps {
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
                        <TableCell>User Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vendors.map((vendor) => (
                        <TableRow key={vendor._id}>
                            <TableCell>{vendor.userName}</TableCell>
                            <TableCell>{vendor.email}</TableCell>
                            <TableCell>{vendor.fullName}</TableCell>
                            <TableCell>{vendor.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default VendorTable;
