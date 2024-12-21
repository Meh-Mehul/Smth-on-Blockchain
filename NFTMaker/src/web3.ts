import Web3 from "web3";
let web3:Web3|null;
try{
    //@ts-expect-error missing
    window.ethereum.request({ method: "eth_requestAccounts" });
    //@ts-expect-error missing
    web3 = new Web3(window.ethereum);
}
catch(e){
    web3 = null;
    console.log(e);
}

export default web3;