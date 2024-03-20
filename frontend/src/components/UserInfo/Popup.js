import React, { useState } from 'react';
import { authenticate } from '../../API/userApi';
import { setUserToken } from "../utils";

export default function Popup(props) {
    const [realName, setRealName] = useState(null);
    const [hideInput, setHideInput] = useState(true);

    function realNameSubmit(e) {
        e.preventDefault();
        authenticate(realName).then(async (response) => {
            let res = await response.json();
            console.log(res);
            if (res.success === true) {
                console.log("實名驗證成功")
                setUserToken(res.userToken);
                setHideInput(false);
            } else {
                alert(res.err)
            }

        })

    }

    const handleRealName = (e) => {
        setRealName(e.target.value);
    }

    const closePopup = () => {
        props.setButtonPop(false)
        window.location.reload(false);
    }

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                {/* <button className="close-btn" onClick={() => props.setButtonPop(false)}>close</button> */}
                <button className="close-btn" onClick={closePopup}>close</button>
                <h3>Authenticate Popup</h3>
                {
                    hideInput ?
                        <form onSubmit={realNameSubmit}>
                            <div>
                                <input required className="inputSize" type="text" placeholder="請輸入您的真實姓名" value={realName} onChange={handleRealName} />
                                <button type='submit' className="submitBtn">Submit</button>
                            </div>
                        </form>

                        : <p>已驗證通過！</p>
                }
            </div>
        </div>
    ) : "";
}
