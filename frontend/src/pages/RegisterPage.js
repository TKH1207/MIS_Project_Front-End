import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../API/userApi";
import { setUserToken } from "../components/utils";
import '../components/css/Register.css';
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
import Typography from '@mui/material/Typography';
import BindDialog from "../components/UserInfo/BindDialog";


function Register() {

    const [showStep, setShowStep] = useState(true);
    const [showStep2, setShowStep2] = useState(false);
    const [showStep3, setShowStep3] = useState(false);
    const [showBind, setShowBind] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [openBind, setOpenBind] = useState(false);

    const [username, setUsername] = useState('');
    const [status, setStatus] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    var inputData = {

        "username": username,
        "status": status,
        "email": email,
        "password": password,

    };


    function goStep2() {
        // 檢查輸入名稱等是否正確
        // 使用者名稱目前最大字元45
        // email格式
        // ...
        console.log(inputData)

        setShowStep(!showStep)
        setShowStep2(!showStep2)
    };


    function goStep3() {
        // 檢查密碼輸入格式是否正確
        // ...
        console.log(inputData)

        register(inputData).then(async (response) => {
            let res = await response.json();
            if (res.success === true) {
                console.log('Register:', res)
                setUserToken(res.userToken);
                // setUserDid(res.userDid);
            } else {
                alert(res.err);
            }

        })
            .catch(error => {
                console.error(error)
            })
        setShowStep(!showStep);
        setShowStep3(!showStep3);
    };

    function goBindAccount() {
        setShowStep3(!showStep3);
        setShowBind(!showBind);
    };

    function goSuccess() {
        // 檢查驗證碼是否無誤
        setShowBind(!showBind);
        setShowSuccess(!showSuccess)
    };

    function goBackToLogin() {
        navigate("/Login")
    };


    const RegisterSuccess = () => (
        <div>
            <div className='wrap2'>
                <Typography variant="h5" sx={{ width: 300, m: 1 }} >
                    註冊成功
                </Typography>
                <Button
                    variant="contained"
                    sx={{ bgcolor: "#003060" }}
                    onClick={goBackToLogin}>
                    回到Login
                </Button>
            </div>
        </div>
    );

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

        <div className='wrap'>

            {
                showStep ?
                    <form onSubmit={goStep3}>
                        <div className='step1'>

                            <div className="wrap4">
                                <input
                                    type="radio"
                                    id="personal"
                                    name="role"
                                    value={0}
                                    onChange={event => setStatus(parseInt(event.target.value))}
                                    checked={status === 0}
                                />
                                <label for="personal">個人</label>
                                <input
                                    type="radio"
                                    id="agency"
                                    name="role"
                                    value={1}
                                    onChange={event => setStatus(parseInt(event.target.value))}
                                    checked={status === 1}
                                />
                                <label for="agency">組織</label>

                            </div>

                            <div className='wrap2'>
                                <TextField fullWidth required sx={{ width: 350 }} id="outlined-basic" label="使用者名稱" variant="outlined" margin="normal" value={username} onChange={event => setUsername(event.target.value)} />
                                {/* <input required className='inputSize' type="text" placeholder="使用者名稱 *" value={username} onChange={event => setUsername(event.target.value)} /> */}
                                {/* <input required className='inputSize' type="email" placeholder="E-mail *" value={email} onChange={event => setEmail(event.target.value)} /> */}
                                <TextField fullWidth required id="outlined-basic" type="email" label="E-mail" variant="outlined" margin="normal" value={email} onChange={event => setEmail(event.target.value)} />
                                <FormControl fullWidth required sx={{ m: 1 }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">設定密碼</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={event => setPassword(event.target.value)}
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
                                        label="設定密碼"
                                    />
                                </FormControl>
                                <FormControl fullWidth required sx={{ m: 1 }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">再次輸入密碼</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
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
                                        label="再次輸入密碼"
                                    />
                                </FormControl>
                            </div>

                            <div className='wrap3'>
                                {/* <div className='nextBtn' onClick={goStep2}>下一步</div> */}
                                <input type="submit" className='nextBtn' value="下一步" />
                            </div>

                        </div>
                    </form>
                    : null

            }
            {
                showStep2 ?
                    <form onSubmit={goStep3}>
                        <div className='step2'>

                            <div className='wrap2'>
                                <input required className='inputSize' type="password" placeholder="設定密碼 *" value={password} onChange={event => setPassword(event.target.value)} />
                                <input required className='inputSize' type="password" placeholder="再次輸入密碼 *" />
                            </div>

                            <div className='wrap3'>
                                {/* <div className='nextBtn2' onClick={goStep3}>下一步</div> */}
                                <input type="submit" className='nextBtn2' value="下一步" />
                            </div>

                        </div>
                    </form>

                    : null
            }
            {
                showStep3 ?
                    <form onSubmit={goBindAccount}>
                        <div className='step3'>
                            <div className="wrap4">
                                <label>驗證PIN碼已送至您的E-mail</label>
                            </div>
                            <div className='wrap2'>
                                <input className='inputSize' type="text" placeholder="輸入驗證PIN碼" />
                            </div>
                            <div className='wrap3'>
                                {/* <div className='nextBtn3' onClick={goSuccess}>驗證</div> */}
                                <input type="submit" className='nextBtn3' value="驗證" />
                            </div>
                        </div>
                    </form>

                    : null
            }
            {
                showBind ?
                    <div>
                        <Typography variant="h5" >
                            驗證成功
                        </Typography>
                        <Typography variant="h6" sx={{ width: 300, m: 1 }} >
                            綁定DID正式啟用此帳號
                        </Typography>
                        <Button
                            variant="contained"
                            style={{ float: 'right' }}
                            sx={{ bgcolor: "#003060" }}
                            onClick={() => setOpenBind(true)}>
                            綁定帳號
                        </Button>
                        <BindDialog open={openBind} setOpen={setOpenBind} goSuccess={goSuccess} />
                    </div>
                    : null
            }
            {
                showSuccess ?
                    <RegisterSuccess />
                    : null
            }
        </div>

    );
}
export default Register;