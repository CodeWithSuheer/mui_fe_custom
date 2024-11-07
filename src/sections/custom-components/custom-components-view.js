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
import AppWidgetSummary from '../overview/app/app-widget-summary';
import SuccessDialog from 'src/components/custom-dialog/success-dialog';
import { ConfirmDialog } from 'src/components/custom-dialog';
import AppNewInvoice from '../overview/app/app-new-invoice';
import InvoiceToolbar from '../invoice/invoice-toolbar';
import ReservationsDetails from '../overview/app/reservations-details';

// Routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// Mock data
import { _appFeatured, _appAuthors, _appInstalled, _appRelated, _appInvoices } from 'src/_mock';
import HelpCenter from '../overview/app/help-center';
import Profile from 'src/pages/dashboard/user-profile/profile';
import EditProfile from 'src/pages/dashboard/user-profile/edit-profile';
import ResturantDetailsPage from 'src/pages/dashboard/resturant-details-page';


export default function CustomComponentsView({ currentUser }) {
    const theme = useTheme();
    const router = useRouter();

    const [openForm, setOpenForm] = useState(false);

    const onOpenForm = useCallback(() => {
        setOpenForm(true);
    }, []);


    const onCloseForm = useCallback(() => {
        setOpenForm(false);
    }, []);

    // const [isSubmitting, setIsSubmitting] = useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const settings = useSettingsContext();

    const NewUserSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required('Email is required').email('Email must be a valid email address'),
        phoneNumber: Yup.string().required('Phone number is required'),
        address: Yup.string().required('Address is required'),
        country: Yup.string().required('Country is required'),
        company: Yup.string().required('Company is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
        role: Yup.string().required('Role is required'),
        zipCode: Yup.string().required('Zip code is required'),
        avatarUrl: Yup.mixed().nullable().required('Avatar is required'),
        // not required
        status: Yup.string(),
        isVerified: Yup.boolean(),

        title: Yup.string().max(255).required('Title is required'),
        description: Yup.string().max(5000, 'Description must be at most 5000 characters'),
    });

    const defaultValues = useMemo(
        () => ({
            name: currentUser?.name || '',
            city: currentUser?.city || '',
            role: currentUser?.role || '',
            email: currentUser?.email || '',
            state: currentUser?.state || '',
            status: currentUser?.status || '',
            address: currentUser?.address || '',
            country: currentUser?.country || '',
            zipCode: currentUser?.zipCode || '',
            company: currentUser?.company || '',
            avatarUrl: currentUser?.avatarUrl || null,
            phoneNumber: currentUser?.phoneNumber || '',
            isVerified: currentUser?.isVerified || true,
            gender: currentUser?.gender || '',


        }),
        [currentUser]
    );

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

    const values = watch();

    const onSubmit = handleSubmit(async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            reset();
            enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
            router.push(paths.dashboard.user.list);
            console.info('DATA', data);
        } catch (error) {
            console.error(error);
        }
    });

    const PRODUCT_GENDER_OPTIONS = [
        { label: 'Men', value: 'Men' },
        { label: 'Women', value: 'Women' },
        { label: 'Kids', value: 'Kids' },
    ];

    const confirm = useBoolean();
    const success = useBoolean();

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const times = [
        '12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM',
        '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM',
        '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM',
    ];


    return (
        <>
            <Container maxWidth={settings.themeStretch ? false : 'xl'}>
                <Grid container spacing={3}>
                    <Grid xs={12} md={4}>
                        <AppWidgetSummary
                            title="Total Active Users"
                            percent={2.6}
                            total={18765}
                            chart={{
                                series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                            }}
                        />
                    </Grid>

                    <Grid xs={12} md={4}>
                        <AppWidgetSummary
                            title="Total Installed"
                            percent={0.2}
                            total={4876}
                            chart={{
                                colors: [theme.palette.info.light, theme.palette.info.main],
                                series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
                            }}
                        />
                    </Grid>

                    <Grid xs={12} md={4}>
                        <AppWidgetSummary
                            title="Total Downloads"
                            percent={-0.1}
                            total={678}
                            chart={{
                                colors: [theme.palette.warning.light, theme.palette.warning.main],
                                series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                            }}
                        />
                    </Grid>

                    <Grid xs={12} md={6}>
                        <FormProvider methods={methods} onSubmit={onSubmit}>
                            <Card sx={{ p: 3 }}>
                                <Typography variant="h4" mb={2}>Profile</Typography>
                                <Box
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
                                    <RHFTextField name="phoneNumber" label="Phone Number" />

                                    <RHFSelect
                                        fullWidth
                                        name="status"
                                        label="Status"
                                        InputLabelProps={{ shrink: true }}
                                        PaperPropsSx={{ textTransform: 'capitalize' }}
                                    >
                                        {['paid', 'pending', 'overdue', 'draft'].map((option) => (
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
                                        sm: 'repeat(1, 1fr)',
                                    }}
                                >
                                    <RHFTextField name="name" label="Full Name" />
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
                                    <RHFTextField name="description" label="Description" multiline rows={3} />
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
                                    <Stack spacing={1}>
                                        <Typography variant="subtitle2">Gender</Typography>
                                        <RHFMultiCheckbox row name="gender" spacing={2} options={PRODUCT_GENDER_OPTIONS} />
                                    </Stack>
                                </Box>


                                <Stack direction='row' justifyContent='flex-end' spacing={2} alignItems="flex-end" sx={{ mt: 3 }}>
                                    <Button onClick={success.onTrue} sx={{
                                        backgroundColor: '#2568EF',
                                        '&:hover': {
                                            backgroundColor: '#0069d9',
                                            borderColor: '#0062cc',
                                            boxShadow: 'none',
                                        },
                                    }} variant="contained">
                                        Success
                                    </Button>

                                    <Button onClick={confirm.onTrue} variant="contained" color="error">
                                        Delete
                                    </Button>
                                    <LoadingButton type="submit" variant="outlined" loading={isSubmitting}>
                                        Create User
                                    </LoadingButton>

                                    <Button
                                        variant="contained"
                                        startIcon={<Iconify icon="mingcute:add-line" />}
                                        onClick={onOpenForm}
                                    >
                                        New Event
                                    </Button>
                                </Stack>
                            </Card>
                        </FormProvider>
                    </Grid>


                    <Grid xs={12} md={6}>
                        <Box rowGap={3} mt={3} columnGap={2} display="grid" gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' }}>
                            <Stack spacing={1}>
                                <Typography variant="subtitle2">Select Day & Time</Typography>

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

                    <Grid xs={12} lg={12}>
                        <AppNewInvoice
                            title="New Invoice"
                            tableData={_appInvoices}
                            tableLabels={[
                                { id: 'id', label: 'Invoice ID' },
                                { id: 'category', label: 'Category' },
                                { id: 'price', label: 'Price' },
                                { id: 'status', label: 'Status' },
                                { id: 'action', label: 'Action' },
                            ]}
                        />
                    </Grid>

                    <ReservationsDetails />
                    
                    <ResturantDetailsPage />

                    <HelpCenter />

                    <Profile />

                    <EditProfile />
                    <EditProfile />

                </Grid>
            </Container>

            <Dialog
                fullWidth
                maxWidth="sm"
                open={openForm}
                onClose={onCloseForm}
                transitionDuration={{
                    enter: theme.transitions.duration.shortest,
                    exit: theme.transitions.duration.shortest - 80,
                }}
            >
                <DialogTitle sx={{ minHeight: 76 }}>
                    Add Event
                </DialogTitle>

                <FormProvider methods={methods} onSubmit={onSubmit}>
                    <Stack mb={3} spacing={3} sx={{ px: 3 }}>
                        <RHFTextField name="title" label="Title" />
                    </Stack>

                    <Box
                        sx={{ px: 3 }}
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
                        <RHFTextField name="phoneNumber" label="Phone Number" />

                        <RHFSelect
                            fullWidth
                            name="status"
                            label="Status"
                            InputLabelProps={{ shrink: true }}
                            PaperPropsSx={{ textTransform: 'capitalize' }}
                        >
                            {['paid', 'pending', 'overdue', 'draft'].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </RHFSelect>
                    </Box>
                </FormProvider>

                <DialogActions>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button variant="outlined" color="inherit" onClick={onCloseForm}>
                        Cancel
                    </Button>

                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                    >
                        Save Changes
                    </LoadingButton>
                </DialogActions>


            </Dialog>

            <SuccessDialog
                open={success.value}
                onClose={success.onFalse}
                title="Congratulations"
                content="Your Plate IT setting has been saved successfully."
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={success.onFalse}
                    >
                        Delete
                    </Button >
                }
            />

            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete"
                content="Are you sure want to delete?"
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={confirm.onFalse}
                    >
                        Delete
                    </Button >
                }
            />
        </>
    )
}


