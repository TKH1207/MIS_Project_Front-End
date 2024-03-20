import { getUserToken } from "../components/utils";

const url = process.env.REACT_APP_URL;

export const addNewTag = (newTagName) => {
    const userToken = getUserToken()
    return (
        fetch(url + "/tag/addNewTag", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken,
            },
            body: JSON.stringify({
                newTagName: newTagName,
            }),
        })
    )
}
export const getTagDict = () => {
    const userToken = getUserToken()
    return (
        fetch(url + "/tag/getTagDict", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken,
            },
        })
    )
}
export const addTagToVC = (VCId, tagIds) => {
    const userToken = getUserToken()
    return (
        fetch(url + "/tag/addTagToVC", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken,
            },
            body: JSON.stringify({
                VCId: VCId,
                tagIds: tagIds,
            }),
        })
    )
}
export const deleteTag = (tagID) => {
    const userToken = getUserToken()
    return (
        fetch(url + "/tag/deleteTag", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken,
            },
            body: JSON.stringify({
                tagID: tagID,
            }),
        })
    )
}
export const removeTagFromVC = (VCId, tagIds) => {
    const userToken = getUserToken()
    return (
        fetch(url + "/tag/removeTagFromVC", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken,
            },
            body: JSON.stringify({
                VCId: VCId,
                tagIds: tagIds,
            }),
        })
    )
}
