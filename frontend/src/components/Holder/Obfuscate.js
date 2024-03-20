import React from "react";
import { useState, useEffect } from 'react';
import { obfuscateDocument } from "../../API/holderApi";
import ObfuscateListItem from "./ObfuscateListItem";
import ObfuscateComplete from "./ObfuscateComplete";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const uploadWrapperStyle = {
    margin: 'auto',
    maxWidth: '1000px',
    paddingTop: '0px',
    textAlign: 'center',
    borderRadius: '10px',
    fontFamily: 'Montserrat',
    // background: '#535c68',
}

const containerStyle = {
    padding: 20,
    borderRadius: 10,
}

const uploadContainerStyle = {
    width: 700,
    height: 400,
    backgroundColor: 'rgb(239, 239, 239)',
    borderRadius: '6px',
    padding: '10px',
}

const borderContainerStyle = {
    border: '5px dashed rgba(198, 198, 198, 0.65)',
    width: '100%',
    height: '100%',
    padding: '10px',
}


export default function Obfuscate() {

    const [isRevealed, setIsRevealed] = useState();
    const [doc, setDoc] = useState([{ document: { credentialSubject: {} } }]);
    const [obfuscatedDoc, setObfuscatedDoc] = useState();
    const [showBtn, setShowBtn] = useState(false);
    const [showDownload, setShowDownload] = useState(false); // 希望這裡之後可以改成像issue一樣接stepper並跳轉畫面
    const [showUpload, setShowUpload] = useState(true);

    const handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            console.log("e.target.result", e.target.result);
            //setFiles(e.target.result);
            setDoc([{ document: JSON.parse(e.target.result) }]);
            setIsRevealed((doc[0].document.credentialSubject));
            console.log('checkkk: ', doc[0].document.credentialSubject)
            setShowDownload(false); // 之後加入stepper後可拿掉
            setShowBtn(true);
            //doc = [{ document: e.target.result}];
            setShowUpload(false);
            console.log(doc);
        };
    };

    useEffect(() => {
        // handleList();
        console.log("check:", doc[0].document.credentialSubject);

    }, [doc]);


    const handleSubmit = () => {
        obfuscateDocument(doc[0].document, isRevealed)
            .then(async (response) => {
                let res = await response.json();
                console.log('testttt:', isRevealed)
                if (res.success === true) {
                    console.log("遮罩成功: ", res.obfuscatedDocument);
                    setObfuscatedDoc(res.obfuscatedDocument);
                    setShowDownload(true); // 之後加入stepper後可拿掉
                    alert("遮罩成功")
                } else {
                    console.log(res.err);
                    alert(res.err);
                }
            })
    }

    return (
        <div style={{ width: '82vw' }}>
            {
                showUpload ?
                    // <div style={uploadWrapperStyle}>
                    //     <div style={containerStyle}>
                    //         <h1 style={{
                    //             color: '#130f40',
                    //             fontFamily: 'Varela Round',
                    //             letterSpacing: '-.5px',
                    //             fontWeight: 700,
                    //             paddingBottom: '10px'
                    //         }}>遮罩文件</h1>
                    //         <div style={uploadContainerStyle}>
                    //             <div style={borderContainerStyle}>
                    //                 <div class="icon">
                    //                     <div> <FileUploadIcon fontSize="large" /></div>
                    //                 </div>
                    //                 <p>Drag and drop files here.</p>
                    //                 <input class="uploadFileBtn" type="file" onChange={handleChange} />
                    //             </div>
                    //         </div>
                    //     </div>
                    // </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Typography variant="h5" sx={{ color: '#003060', letterSpacing: '-.5px', fontWeight: 600, pb: 1 }}>遮罩文件</Typography>
                        <Box sx={{ width: 700, height: 350, backgroundColor: 'rgb(239, 239, 239)', borderRadius: '10px', p: 4, }}>
                            <form style={{ width: '100%', height: '100%', }}>
                                <Box sx={{ border: '5px dashed rgba(198, 198, 198, 0.65)', borderRadius: '10px', width: '99%', height: '99%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <FileUploadIcon sx={{ mb: 3, fontSize: 74, color: '#003060' }} />
                                    <Typography variant="h4" sx={{ color: '#003060', mb: 3 }}>Drag and drop files here.</Typography>
                                    <div>
                                        <input class="uploadFileBtn" type="file" onChange={handleChange} />
                                    </div>
                                </Box>
                            </form>
                        </Box>
                    </div>
                    :
                    showDownload ?
                        <ObfuscateComplete data={obfuscatedDoc} />
                        :
                        <div>
                            <ObfuscateListItem doc={doc} isRevealed={isRevealed} />
                            {
                                showBtn ?
                                    // <button onClick={handleSubmit}>遮罩</button>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        sx={{ bgcolor: '#003060' }}
                                        onClick={handleSubmit}
                                    >
                                        遮罩
                                    </Button>
                                    // <ObfuscateComplete data={obfuscatedDoc} />
                                    : null
                            }
                        </div>


            }

        </div >
    );
}