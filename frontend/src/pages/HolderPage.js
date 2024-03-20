import * as React from 'react';
import "../components/css/Holder.css";
import { useNavigate } from "react-router-dom";
import { getVCFromIPFS, getVCInformation } from "../API/holderApi";
import { getTagDict, removeTagFromVC } from '../API/tagApi';
import HolderPopup from "../components/Holder/HolderPopup";
import TagPopup from "../components/Holder/TagPopup";
import GrayPage from "../components/Holder/GrayPage";
import Obfuscate from "../components/Holder/Obfuscate";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ShowVC from "../components/Holder/ShowVC";
import Toolbar from '@mui/material/Toolbar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AssignmentIcon from '@mui/icons-material/Assignment';



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

    const [document, setDocument] = React.useState({});
    const [showGrayPage, setShowGrayPage] = React.useState(false);
    const [showPopup, setShowPopup] = React.useState(false);
    const [showVC, setShowVC] = React.useState(false);
    const [showTagPopup, setShowTagPopup] = React.useState(false);
    const [showNull, setShowNull] = React.useState(true);
    const [tags, setTags] = React.useState({});
    const [vcID, setVcID] = React.useState();
    const [vcContent, setVcContent] = React.useState();
    const [vcName, setVcName] = React.useState();
    const navigate = useNavigate();


    React.useEffect(() => {
        getVCInformation().then(async (response) => {
            let res = await response.json();
            console.log("Document:", res);
            if (res.success === true) {
                if (res.status === false) {
                    // 顯示灰色頁面
                    // 尚未登入vault
                    console.log(res.response)
                    setShowGrayPage(true);
                }
                else {
                    setDocument(res.allVCNamesDict);
                    console.log('allVCNamesDict: ', res.allVCNamesDict);
                    console.log('document: ', document);
                    if (JSON.stringify(res.allVCNamesDict) != '{}') {
                        setShowNull(false);
                        console.log(res.allVCNamesDict);
                        console.log('showNull: ', showNull)
                    }
                    getTagDict().then(async (response) => {
                        let res = await response.json();
                        if (res.success === true) {
                            console.log("Get tag dict by useEffect.");
                            setTags(res.tagDict);

                        } else {
                            //alert(res.err);
                            console.log('getTagDict err: ', res.err)
                        }
                    })
                }
            }
            else {
                console.log('getVCInformation err: ', res.err)
                alert("請先登入帳號");
                navigate("/Login")
            }

        })
    }, []);

    const openTagPopup = (vcID) => {
        console.log(vcID);
        setVcID(vcID);
        setShowTagPopup(true);
        getTagDict().then(async (response) => {
            let res = await response.json();
            if (res.success === true) {
                setTags(res.tagDict);

            } else {
                alert(res.err);
            }
        })
    }
    const handleRemoveTag = (vcID, tagIds) => {
        console.log(vcID, tagIds);
        removeTagFromVC(vcID, [tagIds]).then(async (response) => {
            let res = await response.json();
            if (res.success === true) {
                console.log(res.message);
                getVCInformation().then(async (response) => {
                    let res = await response.json();
                    if (res.success === true) {
                        setDocument(res.allVCNamesDict);
                    } else {
                        console.log("failed to remove tag.")
                    }
                })
            } else {
                alert("Failed to remove tag.");
            }
        })
    }
    const showVCContent = (vcIPFS) => {
        console.log("show vc content")
        getVCFromIPFS(vcIPFS).then(async (response) => {
            let res = await response.json();
            if (res.success === true) {
                setShowVC(true);
                setVcContent(res.VC);
                console.log("Get VC from IPFS success.");
            } else {
                console.log("Get VC from IPFS failed.");
                alert(res.err);
            }
        })
    }

    const listVC = Object.keys(document).map((VCname, i) => {
        if (typeof (document[VCname]) === "object") {
            return (
                <div key={i}>
                    <Box sx={{ minWidth: 275 }} >
                        <Card variant="outlined" style={{ border: '1px solid' }} sx={{ m: '10px', height: '200px', width: '310px', color: '#CED0CE' }} >
                            <React.Fragment>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        VC {i + 1}
                                    </Typography>

                                    <Typography component="div" sx={{ fontSize: 30, color: 'black' }} >
                                        {VCname}
                                        <Box component="div" sx={{ whiteSpace: 'normal' }}>
                                            <Stack direction="row" spacing={1}>
                                                {
                                                    Object.keys(document[VCname].tags).map((tagName, i) => {
                                                        return (
                                                            <Chip
                                                                key={i}
                                                                label={document[VCname].tags[tagName]}
                                                                onDelete={() => { handleRemoveTag(document[VCname].vcId, tags[document[VCname].tags[tagName]]) }
                                                                }
                                                            />
                                                        )
                                                    })

                                                }
                                                <IconButton aria-label="add_circle" component="label" size="small">

                                                    <AddIcon onClick={() => { openTagPopup(document[VCname].vcId) }} />
                                                </IconButton>
                                                <TagPopup open={showTagPopup} setShowTagPopup={setShowTagPopup} tags={tags} setTags={setTags} vcID={vcID} />
                                            </Stack>
                                        </Box>
                                    </Typography>
                                    <Button size="medium" sx={{ m: '1px' }} onClick={() => { showVCContent(document[VCname].vcIPFS); console.log(typeof document[VCname]); setVcName(VCname) }}>顯示詳細資訊</Button>
                                    <ShowVC open={showVC} setShowVC={setShowVC} VCname={vcName} content={vcContent} />
                                </CardContent>

                            </React.Fragment>
                        </Card>
                    </Box>
                </div >
            )
        }
    })


    return (
        <div>
            <Box sx={{ p: 4, width: '95vw' }}>

                <Toolbar />
                <Box
                    sx={{ pt: 2, flexGrow: 1, bgcolor: 'background.paper', minHeight: '78vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: 2, boxShadow: '1px 2px 9px #909090', margin: 'auto', }}
                >
                    <Typography variant="h4" gutterBottom sx={{ color: '#003060' }}>Holder</Typography>
                    <Box sx={{ width: '100%' }}>
                        <Divider variant="middle" sx={{ mb: 2 }} />
                    </Box>
                    <Box
                        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', minHeight: '50vh', width: '100%', borderRadius: 2, m: 'auto', }}
                    >
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            <Tab label="VC檔案存放區" {...a11yProps(0)} />
                            <Tab label="VC修改/遮罩" {...a11yProps(1)} />

                        </Tabs>

                        <TabPanel value={value} index={0}>
                            {
                                showNull ?
                                    <Box sx={{ width: '82vw', height: '52vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <AssignmentIcon color="action" sx={{ fontSize: 105, m: 1 }} />
                                        <Typography variant="h3" sx={{ color: "#616161" }} gutterBottom>您尚未儲存任何可驗證憑證</Typography>
                                    </Box>
                                    : <Box sx={{ display: "flex" }}>{listVC}</Box>
                            }
                            <Fab sx={{
                                position: 'fixed',
                                bottom: 20,
                                right: 20,
                                bgcolor: '#003060',
                                transform: 'scale(1.4)'
                            }}
                                size='large'
                                color="primary"
                                aria-label="add"
                                onClick={() => setShowPopup(true)}
                            >
                                <AddIcon />
                            </Fab>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            {/*放遮罩頁面component*/}
                            <Obfuscate />
                        </TabPanel>
                    </Box>
                </Box>


                <HolderPopup open={showPopup} setShowPopup={setShowPopup} />
                <GrayPage open={showGrayPage} handleClose={() => { setShowGrayPage(false) }} />

            </Box>
        </div>

    )
}