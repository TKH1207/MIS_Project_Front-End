import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/css/Issuer.css"
import { issuerInfo } from "../API/issuerApi";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IssuerTabs from "../components/Issuer/IssuerTabs";
import Divider from '@mui/material/Divider';
import DeployDialog from "../components/Issuer/DeployDialog";
import { getUserToken } from "../components/utils";


export default function Issuer() {

    const [openDeploye, setOpenDeploye] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {

        if (getUserToken === null) {
            alert("請先登入帳號");
        } else {
            issuerInfo().then(async (response) => {
                let res = await response.json();
                console.log("issuerInfo:", res)
                if (res.success === true) {
                    //     console.log("成功且已經部署:", res);
                    // } else {
                    if (res.contractAddress == null) {
                        console.log("尚未部署:", res);
                        console.log("contractAddress: ", res.contractAddress)
                        setOpenDeploye(true);
                    } else {
                        console.log("issuer info拿取失敗:", res.err)
                        console.log("contractAddress: ", res.contractAddress)
                        // navigate("/Login");
                        // setOpenDeploye(true);
                        // alert(res.err);
                    }
                } else {
                    alert("請先登入帳號");
                    navigate("/Login");
                }

            });
        }

    }, [])

    return (
        <div>
            <DeployDialog
                open={openDeploye}
                setDialogClose={() => { setOpenDeploye(false) }}
            />
            <Box sx={{ p: 4, width: '95vw' }}>
                <Toolbar />
                <Box
                    sx={{ pt: 2, flexGrow: 1, bgcolor: 'background.paper', minHeight: '78vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: 2, boxShadow: '1px 2px 9px #909090', margin: 'auto', }}
                >
                    <Typography variant="h4" gutterBottom sx={{ color: '#003060' }}>Issuer</Typography>
                    <Box sx={{ width: '100%' }}>
                        <Divider variant="middle" sx={{ mb: 2 }} />
                    </Box>
                    <IssuerTabs />
                </Box>
            </Box>
        </div>
    );

};