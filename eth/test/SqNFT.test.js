const assert = require('assert');
const ganache = require('ganache');
const {Web3} = require('web3');
const web3 = new Web3(ganache.provider());

const {abi, evm} = require('../compile');

let SqNFT;
let accounts;

beforeEach(
    async ()=>{
        accounts = await web3.eth.getAccounts();
        SqNFT = await new web3.eth.Contract(abi)
            .deploy({data: evm.bytecode.object})
            .send({from: accounts[0], gas: '1000000'});
    }
);

describe('SqNFT Tests',
    ()=>{
            it('Deployment check', ()=>{
                assert.ok(SqNFT.options.address);
            });
            it('Ownership Test', async ()=>{
                const owner = await SqNFT.methods.owner().call();
                assert.equal(owner, accounts[0]);
            });
            it('Create NFT Test', async () => {
                let inputString = '0'.repeat(1023) + '1';  
                const reciept = await SqNFT.methods.createNFT(inputString).send({ from: accounts[0], gas:'2000000'});
                assert.ok(reciept);
                let tokenId = reciept.events.NFTCreated.returnValues.tokenId;
                const nftData = await SqNFT.methods.getNFT(tokenId).call();
                // console.log(nftData, tokenId)
                assert.equal(nftData, inputString);
            });
            it('Check More than one NFT Creation', async ()=>{
                let inputString1 = '0'.repeat(1023) + '1';  
                const reciept1 = await SqNFT.methods.createNFT(inputString1).send({ from: accounts[0], gas:'2000000'});
                assert.ok(reciept1);
                let tokenId1 = reciept1.events.NFTCreated.returnValues.tokenId;
                const nftData1 = await SqNFT.methods.getNFT(tokenId1).call();
                // console.log(nftData, tokenId)
                assert.equal(nftData1, inputString1);
                let inputString = '0'.repeat(1022) + '11';  
                const reciept = await SqNFT.methods.createNFT(inputString).send({ from: accounts[0], gas:'2000000'});
                assert.ok(reciept);
                let tokenId = reciept.events.NFTCreated.returnValues.tokenId;
                const nftData = await SqNFT.methods.getNFT(tokenId).call();
                // console.log(nftData, tokenId)
                assert.equal(nftData, inputString);
                assert.equal(tokenId, 1n);
            })
    }
);
