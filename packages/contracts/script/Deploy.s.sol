// SPDX-License-Identifier: MIT
pragma solidity >=0.8.19;

import {Script} from "forge-std/Script.sol";
import {PromptTreeNFT} from "../src/PromptTreeNFT.sol";

contract Deploy is Script {
    address internal deployer;
    PromptTreeNFT internal promptTreeNFT;

    function setUp() public virtual {
        (deployer,) = deriveRememberKey(vm.envString("MNEMONIC"), 0);
    }

    function run() public {
        vm.startBroadcast(deployer);
        promptTreeNFT = new PromptTreeNFT();
        vm.stopBroadcast();
    }
}
