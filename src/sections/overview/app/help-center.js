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
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';

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
import ContactUsSection from './contactUs-section';


export default function HelpCenter() {
    const [currentTab, setCurrentTab] = useState('contactUs');

    const HELP_CENTER_TABS = [
        { value: 'contactUs', label: 'Contact Us' },
        { value: 'helpcenter', label: 'Help Center' },
    ];

    const handleChangeTab = useCallback((event, newValue) => {
        setCurrentTab(newValue);
    }, []);

    const renderTabs = (
        <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
                mb: { xs: 3, md: 5 },
            }}
        >
            {HELP_CENTER_TABS?.map((tab) => (
                <Tab
                    key={tab.value}
                    iconPosition="end"
                    value={tab.value}
                    label={tab.label}
                />
            ))}
        </Tabs>
    );

    return (
        <Grid sx={12} lg={12}>
            <Card sx={{ p: 3 }}>
                <Typography variant="h4" mb={2}>Help Center</Typography>
                {renderTabs}

                {currentTab === 'contactUs' && <ContactUsSection />}

                {currentTab === 'helpcenter' && <ContactUsSection />}
            </Card>
        </Grid>
    )
}
