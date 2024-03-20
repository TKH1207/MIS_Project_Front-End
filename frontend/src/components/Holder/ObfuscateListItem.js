import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ObfuscateSelect from './ObfuscateSelect';
import ObfuscateSelectNest from './ObfuscateSelectNest';

export default function ObfuscateListItem(props) {

    return (
        <div>
            <Typography variant='h5' gutterBottom sx={{ color: '#003060' }}>請選擇您想要遮罩的項目</Typography>
            <div style={{ width: 700, marginBottom: 10, padding: 40, paddingBottom: 5, borderStyle: 'dashed', borderWidth: 3, borderColor: '#909090', borderRadius: 7 }}>
                {
                    Object.keys(props.doc[0].document.credentialSubject).map((claim, i) => {
                        console.log("list test: ", props.isRevealed)
                        // 渲染claims裡面的內容，以及增加其true/false選單
                        if (typeof (props.doc[0].document.credentialSubject[claim]) !== 'object') {
                            props.isRevealed[claim] = true
                            console.log("isRevealeddddd:", props.isRevealed)
                            return (
                                <div key={i}>
                                    {/* <div style={{ display: 'flex' }}> */}
                                    <label style={{ minWidth: 100 }}>{claim}：</label>
                                    <ObfuscateSelect claim={claim} isRevealed={props.isRevealed} />
                                    {/* </div> */}
                                </div>
                            )
                        } else {
                            return (
                                <div key={i}>
                                    <label>{claim}:</label>
                                    {
                                        // 判斷並增加巢狀結構
                                        Object.keys(props.doc[0].document.credentialSubject[claim]).map((subClaim, j) => {
                                            props.isRevealed[claim] = {
                                                dose: true,
                                                productName: true,
                                                dateVaccineGiven: true,
                                                healthcareProfessional: true,
                                                administeringCenter: true,
                                            }
                                            console.log("test2:", subClaim)
                                            console.log('test3:', props.doc[0].document.credentialSubject[claim][subClaim])
                                            console.log('test4:', props.isRevealed[claim])
                                            if (typeof (props.doc[0].document.credentialSubject[claim]) === 'object') {
                                                // props.isRevealed[claim] = { subClaim: true };
                                                console.log("測試巢狀isRevealed:", props.isRevealed[claim])
                                                return (
                                                    // <div style={{ marginLeft: '20px' }} key={j}>
                                                    //     <label>{subClaim}:</label>
                                                    //     <select name={subClaim} onChange={(e) => {
                                                    //         props.isRevealed[claim][subClaim] = (e.target.value === 'true');
                                                    //         console.log("isRevealed:", props.isRevealed)
                                                    //     }}>
                                                    //         <option value={true}>遮罩</option>
                                                    //         <option value={false}>保留</option>
                                                    //     </select>
                                                    // </div>
                                                    <div style={{ marginLeft: '20px' }} key={j}>
                                                        {/* <div style={{ display: 'flex' }}> */}
                                                        <label style={{ minWidth: 100 }}>{subClaim}：</label>
                                                        <ObfuscateSelectNest claim={claim} subClaim={subClaim} isRevealed={props.isRevealed} />
                                                        {/* </div> */}
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
        </div>
    )


}