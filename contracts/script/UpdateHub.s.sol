// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import '../src/CovarianceHub.sol';
import '../src/external/Constants.sol';

contract UpdateHubScript is Script {
    function setUp() public {}

    function run() public {
        vm.createSelectFork('goerli');
        address deployer = vm.envAddress('DEPLOYER');
        vm.startBroadcast(deployer);

        string memory json = vm.readFile(string.concat(
            vm.projectRoot(),
            '/broadcast/CovarianceHub.s.sol/5/run-latest.json'
        ));
        address pluginAddr = vm.parseJsonAddress(
            json,
            '.transactions[?(@.contractName=="CovarianceSafePlugin")].contractAddress'
        );

        CovarianceSafePlugin plugin = CovarianceSafePlugin(pluginAddr);
        CovarianceHub hub = new CovarianceHub();
        plugin.setHub(hub);
    }
}
