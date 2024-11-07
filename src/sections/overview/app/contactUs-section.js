import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// MUI components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// Custom components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import SuccessDialog from 'src/components/custom-dialog/success-dialog';
import { useBoolean } from 'src/hooks/use-boolean';

export default function ContactUsSection() {
    const success = useBoolean();

    const NewUserSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        subject: Yup.string().required('Subject is required'),
        message: Yup.string().required('Message is required'),

    });

    const defaultValues = {
        name: '',
        subject: '',
        message: '',
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
        <>
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <Box
                    mt={3}
                    rowGap={3}
                    columnGap={2}
                    display="grid"
                    gridTemplateColumns={{
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                    }}
                >
                    <RHFTextField name="email" label="Email Address" />
                    <RHFTextField name="subject" label="Subject" />
                </Box>

                <Box
                    rowGap={3}
                    mt={3}
                    columnGap={2}
                    display="grid"
                    gridTemplateColumns={{
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(1, 1fr)',
                    }}
                >
                    <RHFTextField name="message" label="Message" multiline rows={7} />
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

            <SuccessDialog
                open={success.value}
                onClose={success.onFalse}
                // title="Congratulations"
                content="Your message send successfully"
            />
        </>
    )
}
      