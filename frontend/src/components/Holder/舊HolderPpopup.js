import { useRef, useState } from 'react';
import "../css/Holder.css";
import { storeDocument } from '../../API/holderApi';
import { uploadVCToIPFS } from '../../API/holderApi';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function HolderPopup(props) {
    const [vcName, setVcName] = useState(null);
    const [file, setFile] = useState();

    const handleVcName = (e) => {
        setVcName(e.target.value);
    }

    const handleClose = () => {
        props.setShowPopup(false);
    }

    const handleSubmit = () => {
        let doc = { [vcName]: file }
        // storeDocument(doc).then(async (response) => {
        uploadVCToIPFS(vcName, doc).then(async (response) => {
            let res = await response.json();
            if (res.success === true) {
                alert(res.message);
                console.log("message: ", res.message);
                window.location.reload();
            } else {
                console.log("error: ", res.err)
                alert(res.err);
            }
        })
    }

    const handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            console.log("e.target.result", e.target.result);
            setFile(JSON.parse(e.target.result));
            console.log(file);
        };
    };

    return (
        <div>
            <Modal
                open={props.open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        上傳文件
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                        <input
                            className="inputColumn"
                            type="file"
                            id="input_json"
                            onChange={handleChange}
                        />
                        <div>

                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="outlined-basic" label="請輸入此份VC的名字" variant="outlined" value={vcName} onChange={handleVcName} />

                            </Box>
                            <Button onClick={handleSubmit} variant="contained">Submit</Button>
                        </div>

                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
