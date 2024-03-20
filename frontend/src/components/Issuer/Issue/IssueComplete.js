import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function IssueComplete(props) {


    const exportData = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(props.data)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "data.json";
        link.click();
    };

    return (
        <Box sx={{ width: '82vw', height: '52vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 105, color: '#003060', m: 1 }} />
            <Typography variant="h3" sx={{ color: '#003060' }} gutterBottom>Issue Complete！</Typography>
            <Button variant="contained" size="large" sx={{ bgcolor: '#003060' }} onClick={exportData}>Download VC</Button>
        </Box>
    )
}