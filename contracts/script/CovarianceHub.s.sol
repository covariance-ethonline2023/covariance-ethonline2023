// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import '../src/CovarianceHub.sol';
import '../src/external/Constants.sol';

contract CovarianceHubScript is Script {
    function setUp() public {}

    function run() public {
        vm.createSelectFork('goerli');
        address deployer = vm.envAddress('DEPLOYER');
        vm.startBroadcast(deployer);

        CovarianceSafePlugin plugin = new CovarianceSafePlugin();
        CovarianceHub hub = new CovarianceHub();

        SAFE_PLUGIN_REGISTRY.addIntegration(address(plugin), 0);
        hub.setPlugin(plugin);
        plugin.setHub(hub);
    }
}
