// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {
    SafeProtocolRegistry
} from 'safe-core-protocol/SafeProtocolRegistry.sol';
import {Script, console2} from "forge-std/Script.sol";
import '../src/CovarianceHub.sol';

contract CovarianceHubScript is Script {
    SafeProtocolRegistry constant pluginRegistry = SafeProtocolRegistry(0x2b18E7246d213676a0b9741fE860c7cC05D75cE2);

    function setUp() public {}

    function run() public {
        vm.createSelectFork('goerli');
        address deployer = vm.envAddress('DEPLOYER');
        vm.startBroadcast(deployer);
        CovarianceSafePlugin plugin = new CovarianceSafePlugin();
        pluginRegistry.addModule(address(plugin), 1);
        new CovarianceHub(plugin);
    }
}
