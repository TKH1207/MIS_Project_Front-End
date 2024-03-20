import * as React from 'react';
import { addNewTag, getTagDict, deleteTag, addTagToVC } from '../../API/tagApi';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';


export default function TagPopup(props) {
    const [tagName, setTagName] = React.useState(null);
    const [checked, setChecked] = React.useState([]);
    const [tagIds, setTagIds] = React.useState([]);

    const handleClose = () => {
        props.setShowTagPopup(false);
    }

    const handleTagName = (e) => {
        setTagName(e.target.value);
    }
    const handleToggle = (value, tagID) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        var array = tagIds;

        if (currentIndex === -1) {
            newChecked.push(value);
            array.push(tagID);
            setTagIds(array);
            console.log("tagID: ", tagID);
        } else {
            newChecked.splice(currentIndex, 1);
            removeItemOnce(array, tagID);
            setTagIds(array);
            console.log(tagIds);
        }

        setChecked(newChecked);
    };
    const removeItemOnce = (arr, value) => {
        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    const handleDelete = (tagID) => {
        console.log(tagID);
        console.log(typeof tagID);
        deleteTag(tagID).then(async (response) => {
            let res = await response.json();
            console.log("You delete the tag.")
            if (res.success === true) {
                getTagDict().then(async (response) => {
                    let res = await response.json();
                    if (res.success === true) {
                        props.setTags(res.tagDict);
                        console.log(res.tagDict);
                    } else {
                        alert("Didn't get tagDict");
                    }
                })
            } else {
                alert("Fail to delete the tag");
            }
        })
    }
    const handleAdd = () => {
        addTagToVC(props.vcID, tagIds).then(async (response) => {
            let res = await response.json();
            if (res.success === true) {
                console.log(res.message);
                window.location.reload();
            } else {
                alert("Failed to add tag to VC.");
            }
        })
    }
    const handleSubmit = () => {
        addNewTag(tagName).then(async (response) => {
            let res = await response.json();
            if (res.success === true) {
                console.log("addTagName success");
                getTagDict().then(async (response) => {
                    let res = await response.json();
                    if (res.success === true) {
                        props.setTags(res.tagDict);
                        console.log(res.tagDict);
                    } else {
                        alert("Didn't get tagDict");
                    }
                })
            } else {
                console.log("error: ", res.err);
                alert(res.err);
            }
        })
    }

    // const listTag = Object.keys(props.tags).map((tagName, i) => {
    //     return (
    //         <div key={i}>
    //             <Stack direction="row" spacing={1}>
    //                 <Chip
    //                     label={tagName}
    //                     variant="outlined"
    //                     onClick={handleClick}
    //                     onDelete={() => { handleDelete(props.tags[tagName]) }} />
    //             </Stack>
    //         </div>
    //     )

    // })
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"新增標籤"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tag
                    </DialogContentText>
                    <TextField id="outlined-basic" label="請輸入標籤的名字" variant="outlined" value={tagName} onChange={handleTagName} />
                    <Button sx={{ bgcolor: "#003060", m: 1 }} onClick={handleSubmit} variant="contained">確認</Button>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {Object.keys(props.tags).map((tagName, value) => {
                            const labelId = `checkbox-list-label-${value}`;
                            return (
                                <ListItem
                                    key={value}
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="comments" onClick={() => { handleDelete(props.tags[tagName]) }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                    disablePadding
                                >
                                    <ListItemButton role={undefined} onClick={handleToggle(value, props.tags[tagName])} dense>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={checked.indexOf(value) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} primary={tagName} />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" sx={{ bgcolor: "#003060" }} onClick={() => { handleAdd() }}>新增</Button>
                    </Stack>
                </DialogContent>

            </Dialog>
        </div>
    )

}