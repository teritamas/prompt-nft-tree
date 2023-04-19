// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

import "forge-std/Test.sol";
import {PromptTreeNFT} from "../src/PromptTreeNFT.sol";

contract PromptTreeNFTTest is Test {
    function testMintResult() public {
        PromptTreeNFT promptTreeNFT = new PromptTreeNFT();
        
        address testAddress = 0x7FF84a54d3d7070391Dd9808696Fc547a910af91;
        string memory testencryptedPrompts = "hogehgoe";
        uint testSourceNftTokenId = 1;

        promptTreeNFT.mintNft(testAddress,testencryptedPrompts,testSourceNftTokenId );
        
        assertEq(promptTreeNFT.getSourcePromptId(1), testSourceNftTokenId);
        assertEq(promptTreeNFT.getEncryptedPrompt(1), testencryptedPrompts);
    }
}
