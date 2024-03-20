import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { getUserInfo } from "./API/userApi";
import { AuthContext } from "./components/context";
import { getUserToken } from "./components/utils";
import HomePage from "./pages/HomePage";
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import UserInfoPage from "./pages/UserInfoPage";
import Issuer from "./pages/IssuerPage";
// import Issue from "./components/Issuer/Issue";
import IssueStepper from "./components/Issuer/Issue/IssueStepper";
import Revoke from "./components/Issuer/Revoke/Revoke";
import Holder from "./pages/HolderPage";
import Verifier from "./pages/VerifierPage";
import TestPage from "./pages/TestPage";

function Content() {

    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     //以 getUserToken 從 localStorage 讀取 userToken
    //     if (getUserToken()) {
    //         // 有 userToken 才 call API
    //         getUserInfo().then(async (response) => {
    //             let res = await response.json();
    //             console.log("test from Main")
    //             console.log(res)
    //             let userStatus = ""
    //             if (res.status === 0) {
    //                 userStatus = "Personal"
    //             } else {
    //                 userStatus = "Organization"
    //             }
    //             setUser(
    //                 {
    //                     "username": res.username,
    //                     "email": res.email,
    //                     "phoneNumber": res.phoneNumber,
    //                     "userStatus": userStatus
    //                 }
    //             );
    //         })
    //     }
    // }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/Login" element={<LoginPage />} />
                    <Route path="/Register" element={<RegisterPage />} />
                    <Route path="/UserInfo" element={<UserInfoPage />} />
                    <Route path="/Issuer" element={<Issuer />} />
                    <Route path="/Issuer/Issue" element={<IssueStepper />} />
                    <Route path="/Issuer/Revoke" element={<Revoke />} />
                    <Route path="/Holder" element={<Holder />} />
                    <Route path="/Verifier" element={<Verifier />} />
                    <Route path="/Test" element={<TestPage />} />
                </Routes>
            </HashRouter>
        </AuthContext.Provider>

    )
}
export default Content;