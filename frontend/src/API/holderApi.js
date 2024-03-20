import { getUserToken } from "../components/utils";

const url = process.env.REACT_APP_URL;

// 舊API可刪除
export const getDocument = () => {
    const userToken = getUserToken()
    return (
        fetch(url + "/holder/documents", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken
            }
        })
    );
};

// 舊API可刪除
export const storeDocument = (documents) => {
    const userToken = getUserToken()
    return (
        fetch(url + "/holder/documents", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken,
            },
            body: JSON.stringify({
                documents: documents
            }),
        })
    );
};

export const obfuscateDocument = (document, isRevealed) => {
    const userToken = getUserToken()
    return (
        fetch(url + "/holder/obfuscateDocument", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken,
            },
            body: JSON.stringify({
                document: document,
                isRevealed: isRevealed
            }),
        })
    );
};

export const getVCInformation = () => {
    const userToken = getUserToken();
    return (
        fetch(url + "/holder/VCInformation", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken
            }
        })
    );
};

export const getVCFromIPFS = (vcIPFS) => {
    const userToken = getUserToken()
    return (
        fetch(url + "/holder/getVCFromIPFS", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken
            },
            body: JSON.stringify({
                vcIPFS: vcIPFS
            })
        })
    )
}

export const uploadVCToIPFS = (vcName, VC) => {
    const userToken = getUserToken()
    return (
        fetch(url + "/holder/uploadVCToIPFS", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken,
            },
            body: JSON.stringify({
                vcName: vcName,
                VC: VC
            }),
        })
    );
}