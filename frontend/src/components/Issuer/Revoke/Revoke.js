import React, { useState } from "react";
import "../../css/Issuer.css"
import RevokePopup from "./RevokePopup";
import RevokeDialog from "./RevokeDialog";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import RevokeIMG from '../../../IMG/Revoke.png';
import RevokeComplete from "./RevokeComplete";

export default function Revoke() {

    const [revokeTarget, setRevokeTarget] = useState(null);
    const [revokeCheck, setRevokeCheck] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [showComplete, setShowComplete] = useState(false);

    const handleTarget = (e) => {
        setRevokeTarget(e.target.value);
    }

    const handleSubmit = () => {
        setRevokeCheck(true);
        setOpenDialog(true)
    };

    return (
        <Box sx={{ height: '380px' }}>
            {/* <RevokePopup trigger={revokeCheck} setRevokeCheck={setRevokeCheck} revokeTarget={revokeTarget} /> */}
            <RevokeDialog
                open={openDialog}
                setDialogClose={setOpenDialog}
                revokeTarget={revokeTarget}
                setShowComplete={setShowComplete}
            />
            {
                showComplete ?
                    <RevokeComplete />
                    :
                    <Box sx={{ pt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%', height: '100%' }}>
                                    <Box sx={{ dispaly: 'flex', flexDirection: 'column', m: 'auto' }}>
                                        {/* <input required type="text" size={40} placeholder="請輸入您想撤銷的VC Revoke Target" value={revokeTarget} onChange={handleTarget} /> */}
                                        <Box sx={{ m: 'auto' }}>
                                            <Box sx={{ display: 'flex' }}>
                                                <TextField required sx={{ width: '480px', m: 'auto' }} id="revoke-outlined-basic" label="請輸入您想撤銷VC之Revoke Target" variant="outlined" value={revokeTarget} onChange={handleTarget} />
                                            </Box>
                                            <Box sx={{ pt: 2, display: 'flex' }}>
                                                <Button
                                                    type="submit"
                                                    sx={{ bgcolor: "#003060", m: 'auto' }}
                                                    variant="contained">
                                                    撤銷
                                                </Button>
                                            </Box>
                                        </Box>

                                    </Box>
                                </form>
                            </Grid>
                            <Grid item xs={6}>
                                <Box sx={{ display: 'flex' }}>
                                    <img src={RevokeIMG} alt='Cover' style={{ width: 650, height: 400, margin: 'auto' }} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
            }

        </Box>
    );

};