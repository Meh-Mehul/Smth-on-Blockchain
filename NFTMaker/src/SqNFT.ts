import web3 from "./web3";
//@ts-expect-error missing
import {abi, evm} from './SqNFT.json';
const address = '0x2EC2E940AC20937FB4F82bef745B0802cB10B469';
export default new web3!.eth.Contract(abi,address);