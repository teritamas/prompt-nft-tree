// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

import "../lib/openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract PromptTreeNFT is ERC721 {
    uint256 private _tokneIdCounter = 0;

    // Token ID of the NFT associated with this NFT, if any
    mapping(uint256 => uint256) private _sourceNftId;

    // Encrypted prompt
    mapping(uint256 => string) private _encryptedPrompts;

    constructor() ERC721("PromptTreeNFT", "PRMPTTREE") {}

    /**
     * Mint PromptNFT
     * if this prompt is source prompt. sourceNftTokenId = 0
     */
    function mintNft(address ownerAddress, string memory encryptedPrompts, uint sourceNftTokenId)
        public
    {
        _tokneIdCounter += 1; 
        uint256 newTokenId = _tokneIdCounter;

        _mint(ownerAddress, newTokenId);

        _setSourceNftTokenId(newTokenId, sourceNftTokenId);
        _setEncryptedPrompt(newTokenId, encryptedPrompts);
    }

    /**
     * Associated Token Id
     */ 
    function _setSourceNftTokenId(uint256 newTokenId, uint256 sourceNftTokenId) private {
        _sourceNftId[newTokenId] = sourceNftTokenId;
    }

    /**
     * Set Encytped Prompt
     */ 
    function _setEncryptedPrompt(uint256 newTokenId, string memory encryptedPrompts) private {
        _encryptedPrompts[newTokenId] = encryptedPrompts;
    }

    /**
     * Get Token Source Prompt Token Id
     */
    function getSourcePromptId(uint256 tokneId) public view returns(uint256){
        return _sourceNftId[tokneId];
    }


    /**
     * Get Token Encrypted Prompt
     */
    function getEncryptedPrompt(uint256 tokneId) public view returns(string memory){
        return _encryptedPrompts[tokneId];
    }
}
