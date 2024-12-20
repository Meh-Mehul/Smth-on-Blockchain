// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SqNFT {
    event NFTCreated(uint256 tokenId, string inputArray);

    address public owner;
    mapping(uint256 => bool) private _existsMapping;
    mapping(uint256 => string) private _nfts;
    mapping(uint256 => bytes32) private _tokenHashes;
    uint256 private _nextTokenId;
    
    constructor() {
        owner = msg.sender;
    }
    function _exists(uint256 tokenId) internal view returns (bool) {
        return _existsMapping[tokenId];
    }
    function createNFT(string memory inputArray) public returns (uint256) {
        uint256 tokenId = _nextTokenId; 
        _nextTokenId++; 
        _nfts[tokenId] = inputArray;
        bytes32 tokenHash = keccak256(abi.encodePacked(inputArray));
        _tokenHashes[tokenId] = tokenHash;
        _existsMapping[tokenId] = true;
        emit NFTCreated(tokenId, inputArray);
        return tokenId; 
    }

    function getNFT(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "NFT does not exist");
        return _nfts[tokenId];
    }
    function validateNFT(uint256 tokenId, bool[1024] memory inputArray) public view returns (address) {
        require(_exists(tokenId), "NFT does not exist");
        bytes32 inputHash = keccak256(abi.encodePacked(inputArray));
        if(inputHash == _tokenHashes[tokenId]){
            return owner;
        }
        else{
            return address(0);
        }
        
    }
}
