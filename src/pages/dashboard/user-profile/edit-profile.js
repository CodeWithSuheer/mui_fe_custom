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
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';

// MUI additional components
import Tooltip from '@mui/material/Tooltip';

import { fData } from 'src/utils/format-number';

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
import SuccessDialog from 'src/components/custom-dialog/success-dialog';

export default function EditProfile() {
    const password = useBoolean();

    const success = useBoolean();

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

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            if (file) {
                setValue('avatarUrl', newFile, { shouldValidate: true });
            }
        },
        [setValue]
    );


    return (
        <>
            <Grid sx={12} lg={12}>
                <Card sx={{ px: 3, py: 4 }}>
                    <Box sx={{ py: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Typography variant="h4" mb={2}>Edit Profile</Typography>
                    </Box>

                    <FormProvider methods={methods} onSubmit={onSubmit}>
                        <Box sx={{ mb: 5 }}>
                            <RHFUploadAvatar
                                name="avatarUrl"
                                maxSize={3145728}
                                onDrop={handleDrop}
                                helperText={
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            mt: 3,
                                            mx: 'auto',
                                            display: 'block',
                                            textAlign: 'center',
                                            color: 'text.disabled',
                                        }}
                                    >
                                    </Typography>
                                }
                            />
                        </Box>

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

                        <Stack direction='row' justifyContent='center' alignItems="center" sx={{ mt: 3 }}>
                            <Button
                                // href={paths.dashboard.user.new}
                                onClick={success.onTrue}
                                variant="contained"
                                sx={{
                                    width: '8rem'
                                }}
                            >
                                Send
                            </Button>
                        </Stack>
                    </FormProvider>

                </Card>
            </Grid >

            <SuccessDialog
                open={success.value}
                onClose={success.onFalse}
                // title="Congratulations"
                content="Profile updated successfully"
            />
        </>
    )
}
