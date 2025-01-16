'use client';

import * as React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Unstable_Grid2';
import { TextField, FormHelperText, IconButton } from '@mui/material';
import { AddVendor, UpdateVendor } from '@/service';
import { useUser } from '@/hooks/use-user';
import { ToastType } from '@/contexts/enums';
import CloseIcon from '@mui/icons-material/Close';
interface FTPServerProps {
  control: any;
  index: number;
  errors: any;
}

const VALUES = {
  firstName: '',
  lastName: '',
  companyName: '',
  email: '',
  companyAddress: '',
  contactNumber: '',
  ftps: [
    { host: '', ftpUser: '', password: '', path: '' },
  ],
};

const FTPServer = ({ control, index, errors }: FTPServerProps) => {
  const { remove } = useFieldArray({ control, name: 'ftps' });
  const handleRemove = () => {
    remove(index);
  }
  return (
    <>
      <CardContent>
        {/* <IconButton
          edge="start"
          color="inherit"
          onClick={handleRemove}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton> */}
        <Grid container spacing={3}>
          <Grid md={6} xs={12}>
            <Controller
              name={`ftps[${index}].host`}
              control={control}
              rules={{ required: 'Host is required' }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors?.ftps?.[index]?.host}>
                  <TextField
                    {...field}
                    label="Host"
                    variant="outlined"
                    error={!!errors?.ftps?.[index]?.host}
                    helperText={errors?.ftps?.[index]?.host?.message}
                  />
                </FormControl>
              )}
            />
          </Grid>
          <Grid md={6} xs={12}>
            <Controller
              name={`ftps[${index}].ftpUser`}
              control={control}
              rules={{ required: 'User is required' }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors?.ftps?.[index]?.ftpUser}>
                  <TextField
                    {...field}
                    label="User"
                    variant="outlined"
                    error={!!errors?.ftps?.[index]?.ftpUser}
                    helperText={errors?.ftps?.[index]?.ftpUser?.message}
                  />
                </FormControl>
              )}
            />
          </Grid>
          <Grid md={6} xs={12}>
            <Controller
              name={`ftps[${index}].password`}
              control={control}
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors?.ftps?.[index]?.password}>
                  <TextField
                    {...field}
                    label="Password"
                    variant="outlined"
                    error={!!errors?.ftps?.[index]?.password}
                    helperText={errors?.ftps?.[index]?.password?.message}
                  />
                </FormControl>
              )}
            />
          </Grid>
          <Grid md={6} xs={12}>
            <Controller
              name={`ftps[${index}].path`}
              control={control}
              rules={{ required: 'Path is required' }}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors?.ftps?.[index]?.path}>
                  <TextField
                    {...field}
                    label="Path"
                    variant="outlined"
                    error={!!errors?.ftps?.[index]?.path}
                    helperText={errors?.ftps?.[index]?.path?.message}
                  />
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
};

interface VendorManagementProps {
  action: () => void;
  editVendor: any;
}

export function VendorManagement({ editVendor = null, action }: VendorManagementProps): React.JSX.Element {
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: editVendor?.email ? {
      firstName: editVendor.firstName as string,
      email: editVendor.email as string,
      lastName: editVendor.lastName as string,
      companyName: editVendor.companyName as string,
      companyAddress: editVendor.companyAddress as string,
      ftps: editVendor.ftps as [{}],
    } : VALUES
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'ftps', rules: { validate: (value) => value.length > 0 || "At least one FTP server is required" } });
  const { toast } = useUser();
  let vendor: any;
  const onSubmit = async (data: any) => {
    if (editVendor?.email) {
      vendor = await UpdateVendor(editVendor?.email, data);
    } else {
      vendor = await AddVendor(data);
    }
    if (vendor?.error) {
      toast.setToast({ isOpen: true, message: vendor.error, type: ToastType.ERROR });
    } else {
      toast.setToast({ isOpen: true, message: editVendor?.email ? 'Vendor Updated Successfully' : 'Vendor Added Successfully', type: ToastType.SUCCESS });
      // action();
    }
  };

  const handleAddMoreFTP = () => {
    append({ host: '', ftpUser: '', password: '', path: '' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader subheader="The information can be editable" title={editVendor?.email ? 'Update Member' : 'Add New Member'} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: 'User Name is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.firstName}>
                    <InputLabel>First Name</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="First Name"
                      error={!!errors.firstName}
                    />
                    <FormHelperText>{errors?.firstName?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Last Name is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.lastName}>
                    <InputLabel>Last Name</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="Last Name"
                      error={!!errors.lastName}
                    />
                    <FormHelperText>{errors.lastName?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>

            <Grid md={6} xs={12}>
              <Controller
                name="email"
                control={control}
                rules={{ required: 'Email is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.email}>
                    <InputLabel>Email</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="Email"
                      error={!!errors.email}
                    />
                    <FormHelperText>{errors.email?.message || null}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                name="contactNumber"
                control={control}
                rules={{ required: 'Email is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.contactNumber}>
                    <InputLabel>Contact Number</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="Contact Number"
                      error={!!errors.contactNumber}
                    />
                    <FormHelperText>{errors.contactNumber?.message || null}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                name="companyName"
                control={control}
                rules={{ required: 'Email is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.companyName}>
                    <InputLabel>Company Name</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="Company Name"
                      error={!!errors.companyName}
                    />
                    <FormHelperText>{errors.companyName?.message || null}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid md={6} xs={12}>
              <Controller
                name="companyAddress"
                control={control}
                rules={{ required: 'Company Address is required' }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.companyAddress}>
                    <InputLabel>Company Address</InputLabel>
                    <OutlinedInput
                      {...field}
                      label="Company Address"
                      error={!!errors.companyAddress}
                    />
                    <FormHelperText>{errors.companyAddress?.message || null}</FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        {fields.map((field, index) => (
          <FTPServer key={field.id} control={control} index={index} errors={errors} />
        ))}
        {errors.ftps && (
          <CardContent>
            <FormHelperText error>{errors.ftps.message}</FormHelperText>
          </CardContent>
        )}
        <CardContent>
          <Button onClick={handleAddMoreFTP} variant="contained">Add More FTP</Button>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">{editVendor?.email ? 'Update Member' : 'Add Member'}</Button>
        </CardActions>
      </Card>
    </form>
  );
}
