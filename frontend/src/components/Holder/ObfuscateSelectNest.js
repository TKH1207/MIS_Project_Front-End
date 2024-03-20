import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const answer = [
    {
        value: 'false',
        label: '遮罩',
    },
    {
        value: 'true',
        label: '保留',
    },
];
export default function ObfuscateSelectNest(props) {
    const [ans, setAns] = React.useState(true);

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-select-currency"
                select
                label="Select"
                value={ans}
                onChange={(e) => {
                    setAns(e.target.value);
                    props.isRevealed[props.claim][props.subClaim] = (e.target.value === 'true');
                    console.log("isRevealed:", props.isRevealed)
                    console.log("ObfuscateSelect ans: ", e.target.value);
                }}>

                {answer.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </Box >
    );

}