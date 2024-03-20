import React, { useState } from 'react';
import { signRevoke } from "../../../API/web3Api";


export default function RevokePopup(props) {

    const sign = () => {
        console.log("revokeTarget: ", props.revokeTarget)
        signRevoke(props.revokeTarget);
    }

    const closePopup = () => {
        props.setRevokeCheck(false);
    }

    return (props.trigger) ? (
        <div className="deployPopup">
            <div className="popup-inner">
                {/* <button className="close-btn" onClick={() => props.setButtonPop(false)}>close</button> */}
                <h3>Revoke Popup</h3>
                <div>
                    <button className="yes-btn" onClick={sign}>確定</button>
                    <button className="no-btn" onClick={closePopup}>返回</button>
                </div>
            </div>
        </div>
    ) : "";
}