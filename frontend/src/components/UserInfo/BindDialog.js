import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { bindAddress } from '../../API/userApi';
import { setUserDid, setUserToken } from '../utils';
import { getAccountAddress } from '../../API/web3Api';

export default function BindDialog(props) {

    const [isAuthorizedPK, setIsAuthorizedPK] = React.useState("false");
    const [Pin, setPin] = React.useState();
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const changeIsAuthorizedPK = (value) => {
        if (value && typeof value === "string") {
            if (value.toLowerCase() === "true") return true;
            if (value.toLowerCase() === "false") return false;
        }
        return value;
    }

    const handleIsAuthorizedPK = async (e) => {
        let pk = await changeIsAuthorizedPK(e.target.value);
        setIsAuthorizedPK(pk);
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handlePin = (e) => {
        setPin(e.target.value);
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let address = null
        console.log("PIN:", Pin)

        if (isAuthorizedPK == false) {
            // 有 meta mask 拿取 account address
            address = await getAccountAddress();
            console.log("MetaMask account address: ", address)
            console.log("isAuthotizedPK:", isAuthorizedPK);
            console.log("address:", address)
        } else {
            console.log("You don't have MetaMask")
            console.log("isAuthotizedPK:", isAuthorizedPK);
            console.log("address:", address)
        }




        bindAddress(isAuthorizedPK, Pin, address).then(async (response) => {
            console.log("isAuthotizedPK in API:", isAuthorizedPK);
            console.log("address in API:", address)
            let res = await response.json();
            if (res.success === true) {
                console.log("bind: ", res.message);
                setUserDid(res.userDid);
                setUserToken(res.userToken);
                // window.location.reload(false);
                alert("綁定成功")
                props.goSuccess();
            } else {
                alert(res.err);
                console.log("綁定失敗: ", res.err);
            }
        })

    }

    const handleClose = () => {
        props.setOpen(false);
        // setIsAuthorizedPK(false);
        setPin(null);
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>Bind Account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        您是否擁有MetaMask帳號?
                    </DialogContentText>
                    <FormControl>
                        {/* <FormLabel id="demo-row-radio-buttons-group-label">您是否擁有MetaMask帳號?</FormLabel> */}
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={isAuthorizedPK}
                            onChange={handleIsAuthorizedPK}
                        >
                            <FormControlLabel value={false} control={<Radio />} label="是" />
                            <FormControlLabel value={true} control={<Radio />} label="否" />
                        </RadioGroup>
                    </FormControl>
                    <DialogContentText>
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
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>取消</Button>
                    <Button onClick={handleSubmit}>確定</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
