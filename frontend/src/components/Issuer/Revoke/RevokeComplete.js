import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function RevokeComplete(props) {


    return (
        <Box sx={{ width: '82vw', height: '52vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 105, color: '#003060', m: 1 }} />
            <Typography variant="h3" sx={{ color: '#003060' }} gutterBottom>Revoke Complete！</Typography>
        </Box>
    )
}