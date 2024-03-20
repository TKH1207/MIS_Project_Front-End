import React from "react";
import { obfuscateDocument } from "../../API/holderApi";

export default function Obfuscate() {

    const doc = [{
        document: {
            claims: {
                name: 'fdc378c2614dd59299178fae661bfa7e:string:test',
                age: 'cb35e27d29cd6effb7741e80ce840daa:number:20',
                address: {
                    street: 'bb5a3dd163403134e2dd5ebcb2b547cd:string:test',
                    city: '41c3e475056ec1737eb5896a47874351:string:test',
                    state: '656ca0a1cfff44f67075c93216e556b4:string:test'
                }
            },
            issuer: { test: "test" },
            signature: { test: "test" }
        }
    }]

    let isRevealed = JSON.parse(JSON.stringify(doc[0].document.claims))

    const listItem2 = Object.keys(doc[0].document.claims).map((claim, i) => {

        // 渲染claims裡面的內容，以及增加其true/false選單
        if (typeof (isRevealed[claim]) !== 'object') {
            isRevealed[claim] = true
            console.log("isRevealeddddd:", isRevealed)
            return (
                <div key={i}>
                    <label>{claim}:</label>
                    <select name={claim} onChange={(e) => {
                        isRevealed[claim] = (e.target.value === 'true');
                        console.log("isRevealed:", isRevealed)
                    }}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                </div>
            )
        } else {
            return (
                <div key={i}>
                    <label>{claim}:</label>
                    {
                        // 判斷並增加巢狀結構
                        Object.keys(doc[0].document.claims[claim]).map((subClaim, j) => {
                            // console.log("test2:", subClaim)
                            if (typeof (doc[0].document.claims[claim]) === 'object') {
                                isRevealed[claim][subClaim] = true;
                                console.log("測試isRevealed:", isRevealed)
                                return (
                                    <div style={{ marginLeft: '20px' }} key={j}>
                                        <label>{subClaim}:</label>
                                        <select name={subClaim} onChange={(e) => {
                                            isRevealed[claim][subClaim] = (e.target.value === 'true');
                                            console.log("isRevealed:", isRevealed)
                                        }}>
                                            <option value={true}>True</option>
                                            <option value={false}>False</option>
                                        </select>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            )
        }
    })

    const handleSubmit = () => {
        obfuscateDocument(doc[0].document, isRevealed)
            .then(async (response) => {
                let res = await response.json();
                if (res.success === true) {
                    console.log(res.obfuscatedDocument);
                } else {
                    console.log(res.err);
                    alert(res.err);
                }
            })
    }

    return (
        <div>
            <div>Obfuscate</div>
            <br></br>
            {/* {JSON.stringify(doc[0].document.claims)} */}
            {/* {console.log(doc[0].document.claims)} */}

            {/* {listItem} */}
            {listItem2}
            <button onClick={handleSubmit}>確認</button>
        </div>
    );
}