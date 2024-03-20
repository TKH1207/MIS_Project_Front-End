import { issue } from "./issuerApi";
import { revoke } from "./issuerApi";
// import Web3 from "web3";


// ask approve for using metamask
export const requireWeb3 = async () => {
    if (window.ethereum != null) {
        // window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
            // Acccounts now exposed
        } catch (error) {
            // User denied account access...
        }
    }
};

// get account address
export const getAccountAddress = async () => {
    // let accounts = await web3.eth.getAccounts();
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
};

// 用 MetaMask 進行簽章
export const signature = async (merkleRoot) => {
    // const { ethereum } = window;
    const txHash = await issue(merkleRoot)
        .then(async (response) => {
            let res = await response.json();
            const txParams = res.txParams;
            // 暫時寫死 from
            txParams["from"] = "0x8E00BAA6b0e69550757b4D6AEC668f7D713FdBb3";
            console.log("txParams.from:", txParams.from)
            txParams.gas = "100000";
            const txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [txParams]
            });
            console.log("Signed:", txHash);
            return txHash;
        })
        .catch((err) => {
            console.log("Sign Error:", err);
        });
    return txHash;
};

export const signRevoke = async (revokeTarget) => {
    // const { ethereum } = window;
    const txHash = await revoke(revokeTarget)
        .then(async (res) => {
            const txParams = res.txParams;
            // 暫時寫死 from
            txParams.from = "0x8E00BAA6b0e69550757b4D6AEC668f7D713FdBb3";
            console.log("txParams.from:", txParams.from)
            txParams.gas = "10000";
            const txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [txParams]
            });
            console.log("Signed:", txHash);
            return txHash;
        })
        .catch((err) => {
            console.log("Sign Error:", err);
        });
    return txHash;
};