import React, { useState, useEffect, useLayoutEffect } from "react";
import { getUserInfo } from "../API/userApi"
// import { AuthContext } from "../components/context";
import { getUserToken, getUserDid } from "../components/utils";
import "../components/css/UserInfo.css"
import Popup from "../components/UserInfo/Popup";
import AuthDialog from "../components/UserInfo/AuthDialog";
import BindDialog from "../components/UserInfo/BindDialog";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import GroupsIcon from '@mui/icons-material/Groups';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import BadgeIcon from '@mui/icons-material/Badge';
import { width } from "@mui/system";

export default function UserInfo() {

    // const { user } = useContext(AuthContext)
    // console.log(user)
    console.log("使用者頁面");
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [userStatus, setUserStatus] = useState(null);
    const [authenBtn, setButtonPop] = useState(false);
    const [userDid, setUserDid] = useState(null);
    const [msg, setMsg] = useState("尚未進行實名認證");
    const [showBtn, setShowBtn] = useState(true);
    const [showBindBtn, setShowBindBtn] = useState(true);
    const [openBind, setOpenBind] = useState(false);
    // const userDid = getUserDid()

    useLayoutEffect(() => {
        //以 getUserToken 從 localStorage 讀取 userToken
        if (getUserToken()) {
            // 有 userToken 才 call API
            console.log("User Token from UserInfo:", getUserToken())
            getUserInfo().then(async (response) => {
                let res = await response.json();
                console.log("test from getUserInfo")
                console.log(res)
                let userStatus = ""
                if (res.success === true) {

                    if (res.status === 0) {
                        userStatus = "Personal"
                    } else {
                        userStatus = "Organization"
                    }
                    setUsername(res.username);
                    setPhoneNumber(res.phoneNumber);
                    setUserStatus(userStatus);
                    setEmail(res.email);
                    setUserDid(res.userDid);
                    console.log("isA:" + res.isAuthenticated)
                    console.log(res.userDid)
                    if (res.isAuthenticated) {
                        setMsg("已通過實名認證");
                        setShowBtn(false);
                    } else {
                        setMsg("尚未進行實名認證");
                    }

                    if (res.userDid === null) {
                        setShowBindBtn(true);
                    } else {
                        setUserDid(res.userDid);
                        console.log(res.userDid);
                        setShowBindBtn(false);
                    }

                } else {
                    alert(res.err)
                }

            })

        }
    }, []);

    return (
        <div className="wrap">
            {/* <div className="wrap2"> */}
            {/* <div className="container"> */}
            <Box sx={{ width: 600 }}>
                <Typography variant="h5" sx={{ m: 1 }} >使用者基本資料</Typography>
                <Box sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary={"使用者名稱：" + username} />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <GroupsIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Status：" + userStatus} />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <EmailIcon />
                                </ListItemIcon>
                                <ListItemText primary={"E-mail：" + email} />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton >
                                <ListItemIcon>
                                    <FactCheckIcon />
                                </ListItemIcon>
                                <ListItemText primary={msg} />
                                {
                                    showBtn ?
                                        <Button variant="contained" onClick={() => setButtonPop(true)}>Authenticate</Button>
                                        : null
                                }
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <BadgeIcon />
                                </ListItemIcon>
                                <ListItemText primary={"User DID：" + userDid} />
                                {
                                    showBindBtn ?
                                        <Button variant="contained" onClick={() => setOpenBind(true)}>Bind Acccount</Button>
                                        : null
                                }
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>




                {/* <h2>Full Name:</h2>
                    <p>{username} </p>
                    <h2>Status:</h2>
                    <p>{userStatus}</p>
                    <h2>Phone Number:</h2>
                    <p>{phoneNumber}</p>
                    <h2>Email:</h2>
                    <p>{email}</p>
                    <div className="authen">{msg}
                        {
                            showBtn ?
                                <button onClick={() => setButtonPop(true)}>Authenticate</button>
                                : null
                        }
                    </div> */}

                {/* <Popup trigger={authenBtn} setButtonPop={setButtonPop} /> */}
                <AuthDialog open={authenBtn} setOpen={setButtonPop} />

                {/* <div className="authen">userDid: {userDid}
                    {
                        showBindBtn ?
                            <button onClick={() => setOpenBind(true)}>Bind Acccount</button>
                            : null
                    }
                    </div> */}
                <BindDialog open={openBind} setOpen={setOpenBind} />
                {/* <div className="backBtn">Back</div> */}
            </Box>
            {/* </div> */}
            {/* </div> */}
        </div >

    );
};
