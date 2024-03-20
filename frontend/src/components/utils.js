const TOKEN_NAME = "token";
const USER_DID = "did";
const METAMASK_ACCOUNT = "metaMask";
const DOC = "doc";
const USER_STATE = "userState";

// 將 userToken 存到 localStorage
export const setUserToken = (userToken) => {
    localStorage.setItem(TOKEN_NAME, userToken);
}
export const getUserToken = () => {
    return localStorage.getItem(TOKEN_NAME);
};

// 將 userDid 存到 localStorage
export const setUserDid = (userDid) => {
    localStorage.setItem(USER_DID, userDid);
};
export const getUserDid = () => {
    return localStorage.getItem(USER_DID);
};

// 將 userState 存到 localStorage 用以判斷登入狀態
export const setUserState = (userState) => {
    localStorage.setItem(USER_STATE, userState)
};
export const getUserState = () => {
    return localStorage.getItem(USER_STATE);
};

// 將 Meta Mask Account Address 存到 localStorage
export const setMetaMaskAccount = (metaMaskAccount) => {
    localStorage.setItem(METAMASK_ACCOUNT, metaMaskAccount);
};
export const getMetaMaskAccount = () => {
    return localStorage.getItem(METAMASK_ACCOUNT);
};

// 以下暫時偷吃步存wrapped document
export const setDocument = (document) => {
    localStorage.setItem(DOC, document);
};
export const getDocument = () => {
    return localStorage.getItem(DOC)
}