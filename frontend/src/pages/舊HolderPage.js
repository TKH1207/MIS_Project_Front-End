import { useState, useEffect } from "react";
import * as React from 'react';
import "../components/css/Holder.css";
import HolderPopup from "../components/Holder/HolderPpopup";
import { getDocument } from "../API/holderApi";
import { getVCInformation } from "../API/holderApi";
import GrayPage from "../components/Holder/GrayPage";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Obfuscate from "../components/Holder/Obfuscate";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ShowVC from "../components/Holder/ShowVC";
import Toolbar from '@mui/material/Toolbar';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


export default function Holder() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const [document, setDocument] = useState({});
    const [showGrayPage, setShowGrayPage] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showVC, setShowVC] = useState(false);

    useEffect(() => {
        getVCInformation().then(async (response) => {
            // getDocument().then(async (response) => {
            let res = await response.json();
            console.log("Document:", res);
            if (res.success === true) {
                if (res.status === false) {
                    // 顯示灰色頁面
                    // 尚未登入vault
                    setShowGrayPage(true);
                }
                else {
                    setDocument(res.allVCNamesDict);
                    console.log(res.allVCNamesDict);
                }
            }
            else {
                alert(res.err);
            }

        })
    }, []);

    const listVC = Object.keys(document).map((VCname, i) => {
        if (typeof (document[VCname]) === "object") {
            return (
                <div key={i}>
                    <Box sx={{ minWidth: 275 }}>
                        <Card variant="outlined">
                            <React.Fragment>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        VC {i}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {VCname}
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                    {/* 打開卡面機關需要再調整！！ */}
                                    <Button size="small" onClick={() => { setShowVC(true); console.log(typeof document[VCname]) }}>顯示詳細資訊</Button>
                                    <ShowVC open={showVC} setShowVC={setShowVC} VCname={VCname} content={document[VCname]} />

                                </CardActions>
                            </React.Fragment>
                        </Card>
                    </Box>
                </div>
            )
        }
    })


    return (
        <div>
            <Box sx={{ p: 4, backgroundColor: '#FDF6E7', width: 1500 }}>

                <Toolbar />
                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 600, width: '100%' }}
                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab label="ＶＣ檔案存放區" {...a11yProps(0)} />
                        <Tab label="ＶＣ修改/遮罩" {...a11yProps(1)} />

                    </Tabs>

                    <TabPanel value={value} index={0}>
                        {/*<Box sx={{ minWidth: 275 }}>
              <Card variant="outlined">{card}</Card>
            </Box>
            <Box sx={{ minWidth: 275 }}>
              <Card variant="outlined">{card}</Card>
            </Box>*/}

                        {listVC}

                        <Fab sx={{
                            position: 'absolute',
                            bottom: 16,
                            right: 16,
                        }}
                            color="primary" aria-label="add"
                            onClick={() => setShowPopup(true)}
                        >
                            <AddIcon />
                        </Fab>

                        <HolderPopup open={showPopup} setShowPopup={setShowPopup} />

                    </TabPanel>

                    <TabPanel value={value} index={1}>
                        {/*放遮罩頁面component*/}
                        {Obfuscate()}
                    </TabPanel>



                </Box>


                <GrayPage open={showGrayPage} handleClose={() => { setShowGrayPage(false) }} />


            </Box>
        </div>

    )
}