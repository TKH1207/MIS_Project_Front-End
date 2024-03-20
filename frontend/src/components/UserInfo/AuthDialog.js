import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { authenticate } from '../../API/userApi';
import { setUserToken } from "../utils";

export default function AuthDialog(props) {

    const [realName, setRealName] = React.useState(null);
    // const [hideInput, setHideInput] = useState(true);

    function realNameSubmit(e) {
        e.preventDefault();
        authenticate(realName).then(async (response) => {
            let res = await response.json();
            console.log(res);
            if (res.success === true) {
                console.log("實名驗證成功")
                alert("實名驗證成功")
                setUserToken(res.userToken);
                // setHideInput(false);
                window.location.reload(false);
            } else {
                alert(res.err)
            }

        })

    }

    const handleRealName = (e) => {
        setRealName(e.target.value);
    }


    const handleClose = () => {
        props.setOpen(false);
        window.location.reload(false);
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>實名認證</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        請註冊Vault帳號
                    </DialogContentText>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">PIN</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={Pin}
                            onChange={handlePin}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="PIN"
                        />
                    </FormControl> */}

                    <TextField
                        required
                        id="outlined-required"
                        label="請輸入您的真實名稱"
                        value={realName}
                        onChange={handleRealName}
                        sx={{ m: 2 }}
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={realNameSubmit}>確定</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
