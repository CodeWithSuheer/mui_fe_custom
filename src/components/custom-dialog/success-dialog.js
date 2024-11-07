import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { alpha, useTheme } from '@mui/material/styles';
import Image from 'src/components/image';

import checklist from "./checklist.png";

// ----------------------------------------------------------------------

export default function SuccessDialog({ title, content, action, open, onClose, ...other }) {

    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>

            <Image sx={{ paddingTop: 2, width: '3rem', margin: 'auto' }} src={checklist} alt="success logo" />

            <DialogTitle sx={{ py: 1, textAlign: 'center' }}>{title}</DialogTitle>

            {content && <DialogContent sx={{ py: 1, typography: 'body2', textAlign: 'center' }}> {content} </DialogContent>}

            <DialogActions sx={{ py: 1, mb: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant="contained" sx={{
                    px: 3,
                    backgroundColor: '#2568EF',
                    '&:hover': {
                        backgroundColor: '#0069d9',
                        borderColor: '#0062cc',
                        boxShadow: 'none',
                    },
                }} onClick={onClose}>
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    );
}

SuccessDialog.propTypes = {
    action: PropTypes.node,
    content: PropTypes.node,
    onClose: PropTypes.func,
    open: PropTypes.bool,
    title: PropTypes.string,
};
