import * as React from 'react';

export default function ObfuscateListItem(props) {

    return (
        <div>
            {
                Object.keys(props.doc[0].document.claims).map((claim, i) => {
                    console.log("list test")
                    // 渲染claims裡面的內容，以及增加其true/false選單
                    if (typeof (props.isRevealed[claim]) !== 'object') {
                        props.isRevealed[claim] = true
                        console.log("isRevealeddddd:", props.isRevealed)
                        return (
                            <div key={i}>
                                <label>{claim}:</label>
                                <select name={claim} onChange={(e) => {
                                    props.isRevealed[claim] = (e.target.value === 'true');
                                    console.log("isRevealed:", props.isRevealed)
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
                                    Object.keys(props.doc[0].document.claims[claim]).map((subClaim, j) => {
                                        // console.log("test2:", subClaim)
                                        if (typeof (props.doc[0].document.claims[claim]) === 'object') {
                                            props.isRevealed[claim][subClaim] = true;
                                            console.log("測試isRevealed:", props.isRevealed)
                                            return (
                                                <div style={{ marginLeft: '20px' }} key={j}>
                                                    <label>{subClaim}:</label>
                                                    <select name={subClaim} onChange={(e) => {
                                                        props.isRevealed[claim][subClaim] = (e.target.value === 'true');
                                                        console.log("isRevealed:", props.isRevealed)
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
            }
        </div>
    )


}