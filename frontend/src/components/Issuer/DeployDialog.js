import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { deployDocStore } from '../../API/issuerApi';


export default function DeployDialog(props) {

    const [showCircularProgress, setShowCircularProgress] = React.useState(false);

    const handleClose = () => {
        props.setDialogClose(false);
    };

    const deploy = (e) => {
        e.preventDefault()
        console.log("確認部署")
        setShowCircularProgress(true);
        deployDocStore().then(async (response) => {
            console.log("部署中")
            let res = await response.json();
            if (res.success === true) {
                console.log("部署成功");
                alert("部署成功")
                props.setDialogClose(false);
            } else {
                alert(res.err)
                console.log("部屬失敗:", res.err)
            }
        })
    }

    return (
        <div>

            <Dialog
                open={props.open}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogTitle id="alert-dialog-title">
                    {"Deploy"}
                </DialogTitle>
                {/* {
                    showCircularProgress ?
                        <DialogContent>
                            <CircularProgress />
                        </DialogContent>

                        : */}
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Box sx={{ width: 300 }}>
                            您需要部署才能使用Issuer功能。
                        </Box>

                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        是否確定要部署？
                    </DialogContentText>
                </DialogContent>
                {/* } */}
                <DialogActions>
                    <Button onClick={handleClose}>否</Button>
                    <Button onClick={deploy}>
                        是
                    </Button>
                </DialogActions>

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
