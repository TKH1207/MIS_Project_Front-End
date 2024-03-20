import { getUserToken } from "../components/utils";

const url = process.env.REACT_APP_URL;

export const issuerInfo = () => {
    const userToken = getUserToken()
    return (
        fetch(url + "/issuer/information", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken
            }
        })
    );
};

export const deployDocStore = () => {
    const userToken = getUserToken()
    return (
        fetch(url + "/issuer/deployDocumentStore", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken
            }
        })
    );
};

export const wrapDocuments = (documents, schema) => {
    const userToken = getUserToken()
    return (
        fetch(url + "/issuer/wrapDocuments", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken,
            },
            body: JSON.stringify({
                documents: documents,
                schema: schema
            }),
        })
    );
};

export const issue = (merkleRoot) => {
    const userToken = getUserToken()
    return (
        fetch(url + "/issuer/issue", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken,
            },
            body: JSON.stringify({
                merkleRoot: merkleRoot,
            }),
        })
    );
};

export const revoke = (revokeTarget) => {
    const userToken = getUserToken()
    return (
        fetch(url + "/issuer/revoke", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken,
            },
            body: JSON.stringify({
                revokeTarget: revokeTarget,
            }),
        })
    );
};

export const sendSignedTx = (txParams, Pin) => {
    const userToken = getUserToken()
    return (
        fetch(url + "/issuer/sendSignedTx", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken,
            },
            body: JSON.stringify({
                txParams: txParams,
                Pin: Pin
            }),
        })
    );
}

export const getVCInformation = () => {
    const userToken = getUserToken()
    return (
        fetch(url + "/issuer/VCInformation", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken
            }
        })
    );
}

export const getVCFromIPFS = (vcIPFS) => {
    const userToken = getUserToken()
    return (
        fetch(url + "/issuer/getVCFromIPFS", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken,
            },
            body: JSON.stringify({
                vcIPFS: vcIPFS,
            }),
        })
    );
}

export const uploadVCToIPFS = (vcName, vc) => {
    const userToken = getUserToken()
    return (
        fetch(url + "/issuer/uploadVCToIPFS", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken,
            },
            body: JSON.stringify({
                vcName: vcName,
                VC: vc
            }),
        })
    );
}