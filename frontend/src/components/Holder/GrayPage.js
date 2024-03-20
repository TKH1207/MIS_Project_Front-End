import React, { useState } from "react";
import { loginToVault } from "../../API/userApi";
import { setUserToken } from "../utils";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


export default function GrayPage(props) {

    const [pin, setPin] = useState(null);

    const handlePin = (e) => {
        setPin(e.target.value);
    }

    const handleSubmit = () => {
        loginToVault(pin).then(async (response) => {
            let res = await response.json();
            if (res.success === true) {
                setUserToken(res.userToken);
                console.log("login to vault success!");
                props.handleClose();
                window.location.reload();
            } else {
                alert(res.err);
            }
        })
    }

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"您尚未登入Vault"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <form onSubmit={handleSubmit}>
                            <TextField id="outlined-basic" label="請輸入Vault PIN碼" variant="outlined" value={pin} onChange={handlePin} />
                            <Button onClick={handleSubmit} variant="contained">登入</Button>
                        </form>
                    </DialogContentText>
                </DialogContent>
            </Dialog>

        </div>
    )

}