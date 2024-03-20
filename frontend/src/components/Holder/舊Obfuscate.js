import React from "react";
import { useState, useEffect } from 'react';
import { obfuscateDocument } from "../../API/holderApi";
import ObfuscateListItem from "./ObfuscateListItem";
import Button from '@mui/material/Button';
import ObfuscateComplete from "./ObfuscateComplete";

export default function Obfuscate() {

    const [isRevealed, setIsRevealed] = useState();
    const [doc, setDoc] = useState([{ document: { claims: {} } }]);
    const [obfuscatedDoc, setObfuscatedDoc] = useState();
    const [showBtn, setShowBtn] = useState(false);
    const [showDownload, setShowDownload] = useState(false); // 希望這裡之後可以改成像issue一樣接stepper並跳轉畫面

    const handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            console.log("e.target.result", e.target.result);
            //setFiles(e.target.result);
            setDoc([{ document: JSON.parse(e.target.result) }]);
            setIsRevealed((doc[0].document.claims));
            setShowDownload(false); // 之後加入stepper後可拿掉
            setShowBtn(true);
            //doc = [{ document: e.target.result}];
            console.log(doc);
        };
    };

    useEffect(() => {
        // handleList();
        console.log("check:", doc[0].document.claims);

    }, [doc]);


    const handleSubmit = () => {
        obfuscateDocument(doc[0].document, isRevealed)
            .then(async (response) => {
                let res = await response.json();
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
        <div>
            <div>Obfuscate</div>
            <br></br>
            <input className="inputColumn" type="file" onChange={handleChange} />
            {
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
                                    onClick={handleSubmit}
                                >
                                    遮罩
                                </Button>
                                : null
                        }
                    </div>
            }

        </div>
    );
}