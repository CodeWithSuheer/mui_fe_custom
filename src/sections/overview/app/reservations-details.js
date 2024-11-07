import React, { useState } from 'react';
import { useCallback, useMemo } from 'react';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// MUI components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';

// MUI additional components
import Tooltip from '@mui/material/Tooltip';

// Custom components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import FormProvider, {
    RHFSwitch,
    RHFTextField,
    RHFUploadAvatar,
    RHFAutocomplete,
    RHFMultiCheckbox,
} from 'src/components/hook-form';
import { RHFSelect } from 'src/components/hook-form';
import Image from 'src/components/image';

export default function ReservationsDetails() {

    const NewUserSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        phoneNumber: Yup.string().required('Phone number is required'),
        date: Yup.string().required('Date is required'),
        time: Yup.string().required('Time is required'),
        group: Yup.string().required('Group is required'),
        occasion: Yup.string().required('Occasion is required'),
        addsOns: Yup.string().required('Adds Ons is required'),
        description: Yup.string().required('Description Ons is required'),
    });

    const defaultValues = {
        name: '',
        email: '',
        phoneNumber: '',
        date: '',
        time: '',
        group: '',
        occasion: '',
        addsOns: '',
    }

    const methods = useForm({
        resolver: yupResolver(NewUserSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        console.log('Working');
    });


    return (
        <Grid sx={12} lg={12}>
            <Typography variant="h4" mb={2}>Details</Typography>
            <Card sx={{ p: 3 }}>

                <Box sx={{ py: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Image sx={{ width: '5rem' }} src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/Ellipse_174.png?v=1730983207" alt="success logo" />

                    <Stack
                        spacing={3}
                        direction={{ xs: 'column', sm: 'row' }}
                        alignItems={{ xs: 'flex-end', sm: 'center' }}
                    // sx={{ mb: { xs: 3, md: 5 } }}
                    >
                        <Stack direction="row" spacing={1} flexGrow={1} sx={{ width: 1 }}>
                            <Tooltip title="View">
                                <IconButton
                                // onClick={view.onTrue}
                                >
                                    <Iconify icon="solar:eye-bold" />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Chat">
                                <IconButton
                                // onClick={view.onTrue}
                                >
                                    <Iconify icon="jam:messages-alt-f" />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Edit">
                                <IconButton
                                // onClick={handleEdit}
                                >
                                    <Iconify icon="solar:pen-bold" />
                                </IconButton>

                            </Tooltip>
                            <Tooltip title="Cancel">
                                <IconButton
                                // onClick={handleEdit}
                                >
                                    <Iconify icon="hugeicons:cancel-01" />
                                </IconButton>

                            </Tooltip>
                            <Tooltip title="Confirm">
                                <IconButton
                                // onClick={handleEdit}
                                >
                                    <Iconify icon="line-md:confirm-circle-filled" />
                                </IconButton>

                            </Tooltip>
                        </Stack>
                    </Stack>
                </Box>

                <FormProvider methods={methods} onSubmit={onSubmit}>
                    <Box
                        mt={3}
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(3, 1fr)',
                        }}
                    >
                        <RHFTextField name="name" label="Full Name" />
                        <RHFTextField name="email" label="Email Address" />
                        <RHFTextField name="phoneNumber" label="Phone Number" />
                        <RHFTextField name="date" label="Date" />
                        <RHFTextField name="time" label="Time" />
                        <RHFTextField name="group" label="Group" />
                        <RHFTextField name="occasion" label="Occasion" />
                        <RHFTextField name="addsOns" label="AddsOns" />
                    </Box>

                    <Card sx={{ px: 3, py: 2, mt: 3, backgroundColor: '#DFEBFF' }}>
                        <Stack><Typography variant="h6" sx={{ py: 1 }}>Al Baik Specials</Typography></Stack>
                        <Stack><Typography variant="body1" sx={{ py: 1 }}>Al Baik Special Deal</Typography></Stack>
                        <Stack><Typography variant="body1" sx={{ py: 1 }}>Burger Deal</Typography></Stack>
                    </Card>

                    <Box
                        mt={3}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(1, 1fr)',
                        }}
                    >
                        <Typography variant="h6" sx={{ py: 1 }}>Special Request</Typography>
                        <RHFTextField name="description" label="Description" multiline rows={3} />
                    </Box>
                </FormProvider>

            </Card>
        </Grid >
    )
}
