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
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

// MUI lab components
import LoadingButton from '@mui/lab/LoadingButton';

// MUI form controls
import { Select, FormControl, InputLabel, Checkbox, FormControlLabel } from '@mui/material';

// MUI additional components
import { useTheme } from '@emotion/react';
import Tooltip from '@mui/material/Tooltip';

// Custom hooks and context
import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar';
import { useBoolean } from 'src/hooks/use-boolean';

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


// Routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// Mock data
import { _appFeatured, _appAuthors, _appInstalled, _appRelated, _appInvoices } from 'src/_mock';



export default function ResturantDetailsPage() {

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const times = [
        '12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM',
        '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM',
        '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM',
    ];

    const settings = useSettingsContext();

    const NewUserSchema = Yup.object().shape({
        fullname: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        password: Yup.string().required('Password is required'),


        restaurantName: Yup.string().required('Restaurant Name is required'),
        bio: Yup.string().required('Bio is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
        website: Yup.string(),
        facebook: Yup.string().required('Facebook is required'),
        instagram: Yup.string().required('Instagram is required'),
        twiter: Yup.string().required('Twiter is required'),
        cuisineType: Yup.string().required('Cuisine Type is required'),
        location: Yup.string().required('Location is required'),
        dressCode: Yup.string().required('Dress Code is required'),
        avaragePrice: Yup.string().required('Avarage Price is required'),
        features: Yup.string().required('Features is required'),
        bookingExtras: Yup.string().required('Booking Extras is required'),

    });

    const defaultValues = {
        fullname: '',
        email: '',
        password: '',

        restaurantName: '',
        bio: '',
        phoneNumber: '',
        website: '',
        facebook: '',
        instagram: '',
        twiter: '',
        cuisineType: 'Italian',
        location: 'Dubai',
        dressCode: '',
        avaragePrice: '',
        features: '',
        bookingExtras: '',
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

    const Features = [
        { value: 'indoor', label: 'Indoor' },
        { value: 'outdoor', label: 'Outdoor' },
        { value: 'smoking', label: 'Smoking' },
        { value: 'wifi', label: 'WiFi' },
        { value: 'petFriendly', label: 'Pet Friendly' },
        { value: 'shisha', label: 'Shisha' },
        { value: 'privateRoom', label: 'Private Room' },
        { value: 'valet', label: 'Valet' },
        { value: 'liveEntertainment', label: 'Live Entertainment' },
        { value: 'wheelchairAccessible', label: 'Wheelchair Accessible' },
    ];

    const Booking_Extras = [
        { value: 'privateRoom', label: 'Private Room' },
        { value: 'entirePlace', label: 'Entire PlacePrivate Room' },
        { value: 'terrace', label: 'Terrace' },
    ];


    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            <Grid sx={12} lg={12}>
                <Typography variant="h4" mb={2}>Restaurant Details</Typography>
                <Card sx={{ p: 3 }}>
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
                            mt={3}
                            rowGap={3}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                            }}
                        >
                            <RHFTextField name="restaurantName" label="Enter Restaurant Name (Max 100 characters)" />
                        </Box>

                        <Typography variant="body2" mt={3}>Bio</Typography>
                        <Box
                            mt={1}
                            rowGap={2}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(1, 1fr)',
                            }}
                        >
                            <RHFTextField name="bio" label="Enter Bio (Max 255 characters)" multiline rows={3} />
                        </Box>

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
                            <RHFTextField name="restaurantName" label="Phone Number" />
                            <RHFTextField name="website" label="Website (optional)" />
                        </Box>

                        <Typography variant="body2" mt={3}>Social Media Link (optional)</Typography>
                        <Box
                            mt={1}
                            rowGap={3}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(3, 1fr)',
                            }}
                        >
                            <RHFTextField name="facebook" label="Facebook" />
                            <RHFTextField name="instagram" label="Instagram" />
                            <RHFTextField name="twiter" label="Twiter" />
                        </Box>

                        <Box
                            mt={4}
                            rowGap={3}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(3, 1fr)',
                            }}
                        >
                            <RHFSelect
                                fullWidth
                                name="cuisineType"
                                label="Cuisine Type"
                                InputLabelProps={{ shrink: true }}
                                PaperPropsSx={{ textTransform: 'capitalize' }}
                            >
                                {['Italian', 'Indian', 'French'].map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </RHFSelect>
                        </Box>

                        <Grid xs={12} md={8}>
                            <Box rowGap={3} mt={3} columnGap={2} display="grid" gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' }}>
                                <Stack spacing={1}>
                                    <Typography variant="subtitle2" mt={3}>Operating Hours</Typography>

                                    {days.map((day) => (
                                        <Box key={day} display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                                            <Typography variant="body2" sx={{ width: '100px' }}>{day}</Typography>

                                            <FormControl sx={{ minWidth: 120 }}>
                                                {/* <InputLabel>{day} Start Time</InputLabel> */}
                                                <Select defaultValue="09:00 AM">
                                                    {times.map((time) => (
                                                        <MenuItem key={time} value={time}>{time}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                            <Typography variant="body2" sx={{ mx: 1 }}>to</Typography>

                                            <FormControl sx={{ minWidth: 120 }}>
                                                {/* <InputLabel>{day} End Time</InputLabel> */}
                                                <Select defaultValue="12:00 AM">
                                                    {times.map((time) => (
                                                        <MenuItem py={0} key={time} value={time}>{time}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>

                                            <FormControlLabel
                                                control={<Checkbox />}
                                                label="Confirm Slot"
                                                sx={{ ml: 2 }}
                                            />
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>
                        </Grid>

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
                            <RHFSelect
                                fullWidth
                                name="location"
                                label="Location"
                                InputLabelProps={{ shrink: true }}
                                PaperPropsSx={{ textTransform: 'capitalize' }}
                            >
                                {['Dubai', 'Egypt', 'France'].map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </RHFSelect>

                            <RHFSelect
                                fullWidth
                                name="dressCode"
                                label="Dress Code"
                                InputLabelProps={{ shrink: true }}
                                pcaleholder="Select Dress Code"
                                PaperPropsSx={{ textTransform: 'capitalize' }}
                            >
                                {['001', '002', '003'].map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </RHFSelect>

                            <RHFSelect
                                fullWidth
                                name="avaragePrice"
                                label="Avarage Price"
                                InputLabelProps={{ shrink: true }}
                                pcaleholder="Select Dress Code"
                                PaperPropsSx={{ textTransform: 'capitalize' }}
                            >
                                {['$100', '$200', '$300'].map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </RHFSelect>
                        </Box>

                        <Box
                            rowGap={3}
                            mt={3}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(4, 1fr)',
                            }}
                        >
                            <Stack spacing={1} sx={{ gridColumn: { sm: 'span 3' } }}>
                                <Typography variant="subtitle2">Features</Typography>
                                <RHFMultiCheckbox row name="features" spacing={2} options={Features} />
                                <Button variant="text" color="primary" sx={{ alignSelf: 'flex-start' }}>
                                    + Add More
                                </Button>
                            </Stack>
                        </Box>

                        <Box
                            rowGap={3}
                            mt={3}
                            columnGap={2}
                            display="grid"
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(4, 1fr)',
                            }}
                        >
                            <Stack spacing={1} sx={{ gridColumn: { sm: 'span 3' } }}>
                                <Typography variant="subtitle2">Booking Extras</Typography>
                                <RHFMultiCheckbox row name="bookingExtras" spacing={2} options={Booking_Extras} />
                                <Button variant="text" color="primary" sx={{ alignSelf: 'flex-start' }}>
                                    + Add More
                                </Button>
                            </Stack>
                        </Box>

                    </FormProvider>
                </Card>
            </Grid>
        </Container >
    )
}
