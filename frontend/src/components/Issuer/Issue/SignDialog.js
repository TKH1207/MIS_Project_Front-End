import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IssueComplete from './IssueComplete';
import { issuerInfo } from '../../../API/issuerApi';
import { issue } from '../../../API/issuerApi';
import { signature } from '../../../API/web3Api'
import { sendSignedTx } from '../../../API/issuerApi';
import { CompressOutlined } from '@mui/icons-material';

export default function SignDialog(props) {

    const [showSignedByVault, setShowSignedByVault] = React.useState(false);
    const [showCircularProgress, setShowCircularProgress] = React.useState(false);
    const [Pin, setPin] = React.useState(null);

    const sign = () => {
        console.log("merkleRoot: ", props.wd[0].signature.merkleRoot)
        // signature(props.wd[0].signature.merkleRoot)
        // props.setDialogClose();
        issuerInfo().then(async (response) => {
            let res = await response.json();
            if (res.isAuthorizedPK == true) {
                // 用 Vault 進行簽章，需輸入PIN碼
                console.log("Use vault to sign");
                setShowSignedByVault(true);
            } else {
                // 用 MetaMask 進行簽章
                signature(props.wd[0].signature.merkleRoot)
            }
        })

        // setShowSignedByVault(true)

    };

    const handleClose = () => {
        props.setDialogClose();
    };

    const handlePin = (e) => {
        setPin(e.target.value);
    }

    const signedByVault = () => {
        setShowCircularProgress(true);
        // 輸入PIN碼，用 Vault 進行簽章
        issue(props.wd[0].signature.merkleRoot)
            .then(async (response) => {
                let res = await response.json();
                sendSignedTx(res.txParams, Pin)
                    .then(async (response) => {
                        let res = await response.json();
                        if (res.success === true) {
                            console.log("Vault簽章成功");
                            console.log("receipt: ", res.receipt);
                            props.setStep(<IssueComplete data={props.wd[0]} />);
                        } else {
                            console.log(res.err);
                            alert(res.err);
                            setShowCircularProgress(false);
                        }
                    })
            })

        // props.setStep(<IssueComplete data={props.wd} />);
    }

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {
                    showSignedByVault ?
                        <div>
                            <DialogTitle id="alert-dialog-title">
                                {"將使用Vault進行簽章"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    請輸入您的PIN碼
                                    <TextField
                                        required
                                        id="outlined-required"
                                        label="PIN"
                                        type="password"
                                        value={Pin}
                                        onChange={handlePin}
                                    />
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>不同意</Button>
                                <Button onClick={signedByVault} autoFocus>
                                    同意
                                </Button>
                            </DialogActions>
                        </div>
                        : <div>
                            <DialogTitle id="alert-dialog-title">
                                {"是否確定要簽章上鏈？"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    注意事項.......
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>不同意</Button>
                                <Button onClick={sign} autoFocus>
                                    同意
                                </Button>
                            </DialogActions>
                        </div>
                }

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={showCircularProgress}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

            </Dialog>
        </div>
    );
}
