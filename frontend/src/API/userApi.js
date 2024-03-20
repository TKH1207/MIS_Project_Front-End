import { getUserToken } from "../components/utils";
// import { setUserToken } from "../components/utils";

const url = process.env.REACT_APP_URL;

export const login = (username, password, address) => {
    return (
        fetch(url + "/user/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                address: address,
            }),
        })

    )

};


export const register = (inputData) => {
    return (
        fetch(url + '/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputData)
        })

    )
};


export const getUserInfo = () => {

    const userToken = getUserToken();
    // console.log(userToken)
    return (
        fetch(url + '/user/information', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken
            }
        })

    )
};


export const authenticate = (realName) => {

    const userToken = getUserToken();
    return (
        fetch(url + '/user/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken
            },
            body: JSON.stringify({
                "realName": realName
            })
        })
    )
}

export const bindAddress = (isAuthorizedPK, Pin, address) => {

    const userToken = getUserToken();
    return (
        fetch(url + '/user/bindAddress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken
            },
            body: JSON.stringify({
                "isAuthorizedPK": isAuthorizedPK,
                "Pin": Pin,
                "address": address
            })
        })
    )
}

export const loginToVault = (Pin) => {
    const userToken = getUserToken()
    return (
        fetch(url + "/user/loginToVault", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'userToken': userToken,
            },
            body: JSON.stringify({
                Pin: Pin
            }),
        })
    );
};