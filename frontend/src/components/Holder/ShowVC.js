import { useState } from "react";
import { getDocument } from "../utils";
import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Renderer from "../Issuer/Renderer/Renderer";

export default function ShowVC(props) {

    const handleClose = () => {
        props.setShowVC(false);
    }
    const showDoc = () => {
        getDocument().then(async (response) => {
            let res = await response.json();
            if (res.success == true) {
                console.log(res.allVCDocuments.VCname);
            } else {
                console.log(res.err);
                alert(res.err);
            }
        })
    }

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.VCname}
                </DialogTitle>
                <DialogContent >
                    <DialogContentText id="alert-dialog-description">
                        {/* {JSON.stringify(props.content)} */}
                        <Box sx={{
                            borderStyle: 'solid',
                            borderColor: '#909090',
                            borderWidth: '2px',
                            borderStyle: 'dashed',
                            borderRadius: '10px',
                            p: 2,
                            width: 750
                        }}>
                            <Renderer doc={props.content} />
                        </Box>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    )
}