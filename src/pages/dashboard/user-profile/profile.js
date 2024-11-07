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
import InputAdornment from '@mui/material/InputAdornment';

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
import { useBoolean } from 'src/hooks/use-boolean';

export default function Profile() {
    const password = useBoolean();

    const NewUserSchema = Yup.object().shape({
        fullname: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        phoneNumber: Yup.string().required('Phone number is required'),
        password: Yup.string().required('Password is required'),
    });

    const defaultValues = {
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
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
            <Card sx={{ px: 3, py: 4 }}>
                <Box sx={{ py: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" mb={2}>Profile</Typography>


                    <IconButton color={'inherit'}
                    // onClick={popover.onOpen}
                    >
                        <Iconify icon="lucide:edit" />
                    </IconButton>
                </Box>

                <Box sx={{ py: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image sx={{ width: '5rem' }} src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/Ellipse_174.png?v=1730983207" alt="success logo" />
                </Box>

                <FormProvider methods={methods} onSubmit={onSubmit}>
                    <Box
                        mt={4}
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    >
                        <RHFTextField name="name" label="Full Name" />
                        <RHFTextField name="email" label="Email Address" />
                        <RHFTextField
                            name="oldPassword"
                            type={password.value ? 'text' : 'password'}
                            label="Old Password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={password.onToggle} edge="end">
                                            <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <RHFTextField name="phoneNumber" label="Phone Number" />

                    </Box>
                </FormProvider>

            </Card>
        </Grid >
    )
}
