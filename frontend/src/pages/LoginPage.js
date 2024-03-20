import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUserDid, setUserToken, setUserState } from "../components/utils";
import { getUserInfo, login } from "../API/userApi";
import { AuthContext } from "../components/context";
import '../components/css/Login.css';
import { requireWeb3 } from "../API/web3Api";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // 暫時寫死MetaMask Address
    const [address, setAddress] = useState("0x8E00BAA6b0e69550757b4D6AEC668f7D713FdBb3");
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // let res = await login(email, password)
        login(username, password, address)
            .then(async (response) => {
                //await:先讓程式執行完response
                let res = await response.json();
                console.log(res);
                console.log("login success:" + res.success)
                if (res.success === true) {
                    setUserToken(res.userToken);

                    // 彈出MetaMask
                    // requireWeb3()

                } else {
                    setUserToken(null)
                    alert(res.err);
                };
                // res.json();
                getUserInfo()
                    .then(async (response) => {
                        let res = await response.json();
                        console.log("test from Login")
                        console.log(res);
                        console.log("username:" + res.username);
                        let userStatus = ""

                        if (res.success === true) {
                            if (res.status === 0) {
                                userStatus = "Personal"
                            } else {
                                userStatus = "Organization"
                            }
                            setUser(
                                {
                                    "username": res.username,
                                    "email": res.email,
                                    "userStatus": userStatus
                                }
                            );
                            if (res.userDid !== null) {
                                setUserDid(res.userDid);
                                setUserState(true);
                            } else {
                                setUserDid(null);
                            }
                            navigate("/UserInfo");
                            window.location.reload(false);
                        } else {
                            console.log(res.err)
                            setUserDid(null)
                            alert("登入失敗")
                        }


                    })
                    .catch(error => {
                        console.error(error)
                    })
            })
            .catch(error => {
                console.error(error);
            })


    };

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
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

    return (
        <div className="wrap">
            <form onSubmit={handleSubmit}>

                <div className="wrap2">
                    {/* <input required className="inputSize" type="text" placeholder="請輸入您的Username*" value={username} onChange={handleUsername} /> */}
                    <TextField fullWidth required id="outlined-basic" label="請輸入您的Username" variant="outlined" margin="normal" value={username} onChange={handleUsername} />
                    {/* <input required className="inputSize" type="password" placeholder="請輸入您的密碼*" value={password} onChange={handlePassword} /> */}
                    {/* <TextField fullWidth required id="outlined-basic" label="請輸入您的密碼" variant="outlined" margin="normal" value={password} onChange={handlePassword} /> */}
                    <FormControl fullWidth required sx={{ m: 1 }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">請輸入您的密碼</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePassword}
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
                            label="請輸入您的密碼"
                        />
                    </FormControl>
                </div>

                <div className="wrap3">
                    {/* <div className="loginBtn" onClick={handleSubmit}>登入</div> */}
                    <input type="submit" className="loginBtn" value="登入" />
                    <div className="forgotPass">忘記密碼</div>
                    <div className="regisBtn" >
                        <Link to="/Register" style={{ color: 'inherit', textDecoration: 'none' }}>註冊會員</Link>
                    </div>
                </div>

            </form>
        </div>
    );

}