import React, { useState } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CreateIcon from '@mui/icons-material/Create';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { verify } from "../API/verifierApi";
import { useDropzone } from 'react-dropzone';


const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    height: '100%',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#909090',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

function StyledDropzone(props) {
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone();

    const style = React.useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    return (
        <div className="container">
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <p>Drag and drop some files here, or click to select files</p>
            </div>
        </div>
    );
}

function NestedList(props) {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader" sx={{ fontSize: '25px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        驗證結果
                        {
                            props.showIcon ?
                                props.validDocument === 'true' && props.documentConsistency === 'true' && props.validIssuer === 'true' ?
                                    <CheckCircleIcon fontSize="large" color="success" sx={{ ml: 1 }} />
                                    : <CancelIcon fontSize="large" sx={{ ml: 1, color: '#cd2220' }} />
                                : null
                        }
                    </Box>
                </ListSubheader>
            }
        >
            <ListItemButton>
                <ListItemIcon>
                    <AltRouteIcon />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ fontSize: '20px' }}>文件一致性：{props.documentConsistency === 'true' ? '是' : '否'}</ListItemText>
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <AssuredWorkloadIcon />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ fontSize: '20px' }}>Issuer認證： {props.validIssuer === 'true' ? '通過' : '未通過'}</ListItemText>
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ fontSize: '20px' }}>有效文件： {props.validDocument === 'true' ? '是' : '否'}</ListItemText>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <CreateIcon />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ fontSize: '20px' }}>發布認證：{props.isIssued === 'true' ? '已發布' : '尚未發布'}</ListItemText>
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                            <RemoveCircleIcon />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ fontSize: '20px' }}>撤銷狀態：{props.isNotRevoked === 'true' ? '尚未撤銷' : '已撤銷'}</ListItemText>
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
}


export default function Verifier() {

    // const [file, setFile] = useState(null)

    const [files, setFiles] = useState("");
    const [documentConsistency, setDocumentConsistency] = useState(null);
    const [validIssuer, setValidIssuer] = useState(null);
    const [validDocument, setValidDocument] = useState(null);
    const [isIssued, setIsIssued] = useState(null);
    const [isNotRevoked, setIsNotRevoked] = useState(null);
    const [showIcon, setShowIcon] = useState(false);

    const handleChange = (e) => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            console.log("e.target.result: ", e.target.result);
            console.log("type:", typeof JSON.parse(e.target.result))
            setFiles(JSON.parse(e.target.result));
        };
    };



    const handleSubmit = () => {
        console.log("test: ", documentConsistency)
        verify(files).then(async (response) => {
            let res = await response.json();
            if (res.success === true) {
                console.log("verify success");
                setShowIcon(true);
                setDocumentConsistency(res.documentConsistency.toString());
                setValidIssuer(res.validIssuer.toString());
                setValidDocument(res.validDocument.toString());
                setIsIssued(res.isIssued.toString());
                setIsNotRevoked(res.isNotRevoked.toString());

                console.log("documentConsistency: ", res.documentConsistency);
                console.log("validIssuer: ", res.validIssuer);
                console.log("validDocument: ", res.validDocument);
                console.log("isIssued: ", res.isIssued);
                console.log("isNotRevoked: ", res.isNotRevoked);
            } else {
                console.log(res.err);
                console.log("documentConsistency: ", res.documentConsistency);
                console.log("validIssuer: ", res.validIssuer);
                console.log("validDocument: ", res.validDocument);
                console.log("isIssued: ", res.isIssued);
                console.log("isNotRevoked: ", res.isNotRevoked);
                alert(res.err);
            }
        })

    }

    return (

        <Box sx={{ p: 4, width: '100vw', }}>
            <Toolbar />
            <div style={{ backgroundColor: "white", padding: 40, borderRadius: 8, boxShadow: '1px 2px 9px #909090', margin: 'auto', height: '95%' }}>
                <Typography variant="h4" sx={{ color: '#003060' }}>Verifier</Typography>
                <div style={{ display: 'flex', flexDirection: 'row', marginTop: 15, height: '90%' }}>
                    <div style={{ width: '100%', height: '100%', marginRight: 15 }}>
                        {/* <StyledDropzone /> */}
                        <input
                            type="file"
                            className="inputColumn"
                            style={{ margin: 2, borderColor: '#909090', width: '92%', height: '75%' }}
                            onChange={handleChange}
                        />
                        <div style={{ marginTop: 5, marginBottom: 5 }}>
                            <Button
                                variant="contained"
                                sx={{ bgcolor: "#003060" }}
                                style={{ marginTop: 10 }}
                                onClick={handleSubmit}
                            >
                                驗證
                            </Button>
                        </div>
                    </div>
                    <Divider orientation="vertical" flexItem />
                    <div style={{ width: 800, marginLeft: 15 }}>
                        <NestedList
                            showIcon={showIcon}
                            documentConsistency={documentConsistency}
                            validIssuer={validIssuer}
                            validDocument={validDocument}
                            isIssued={isIssued}
                            isNotRevoked={isNotRevoked}
                        />
                        {/* <Typography>Document Consistency: {documentConsistency}</Typography>
                        <Typography>Valid Issuer: {validIssuer}</Typography>
                        <Typography>Valid Document: {validDocument}</Typography>
                        <Typography sx={{ textIndent: '2em' }}>Be Issued: {isIssued}</Typography>
                        <Typography sx={{ textIndent: '2em' }}>Didn't Be Revoked: {isNotRevoked}</Typography> */}
                    </div>
                </div>

            </div>
        </Box >
    )
}