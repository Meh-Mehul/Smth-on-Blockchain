const path = require('path');
const fs = require('fs');
const solc = require('solc');

const NFTPath = path.resolve(__dirname, 'contracts', 'SqNFT.sol');
const source = fs.readFileSync(NFTPath, 'utf8');

const input = {
    language: 'Solidity',
        sources: {
            'SqNFT.sol': {
                content:source,
        },
    },
    settings:{
        outputSelection:{
            '*':{
                '*':['*'],
            },
        },
    },
};
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['SqNFT.sol'].SqNFT;