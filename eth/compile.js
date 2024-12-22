const path = require('path');
const fs = require('fs');
const solc = require('solc');

const NFTPath = path.resolve(__dirname, 'contracts', 'SqNFT.sol');
const source = fs.readFileSync(NFTPath, 'utf8');
const input = {
    language: 'Solidity',
    sources: {
        'SqNFT.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

const compiled = JSON.parse(solc.compile(JSON.stringify(input))).contracts['SqNFT.sol'].SqNFT;
const outputPath = path.resolve(__dirname, 'SqNFT.json');
if (!fs.existsSync(path.dirname(outputPath))) {
    fs.mkdirSync(path.dirname(outputPath));
}
fs.writeFileSync(outputPath, JSON.stringify({ abi: compiled.abi, bytecode: compiled.evm.bytecode.object }, null, 2));
console.log('Compiled contract saved to:', outputPath);
module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['SqNFT.sol'].SqNFT;