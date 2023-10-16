// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Safe } from 'safe-contracts/Safe.sol';
import {
    TestSafeProtocolManager
} from './TestSafeProtocolManager.sol';
import {
    TestSafeProtocolRegistryUnrestricted
} from './TestSafeProtocolRegistryUnrestricted.sol';
import {
    OptimisticOracleV3Interface
} from './OptimisticOracleV3Interface.sol';
import { SafeProxyFactory } from 'safe-contracts/proxies/SafeProxyFactory.sol';
import '@openzeppelin/contracts/interfaces/IERC20.sol';

IERC20 constant WETH = IERC20(0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6);
SafeProxyFactory constant SAFE_PROXY_FACTORY = SafeProxyFactory(0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2);
Safe constant SAFE_SINGLETON = Safe(payable(0x3E5c63644E683549055b9Be8653de26E0B4CD36E));
OptimisticOracleV3Interface constant OOV3 = OptimisticOracleV3Interface(0x9923D42eF695B5dd9911D05Ac944d4cAca3c4EAB);
TestSafeProtocolRegistryUnrestricted constant SAFE_PLUGIN_REGISTRY = TestSafeProtocolRegistryUnrestricted(0x9EFbBcAD12034BC310581B9837D545A951761F5A);
TestSafeProtocolManager constant SAFE_PLUGIN_MANAGER = TestSafeProtocolManager(0xAbd9769A78Ee63632A4fb603D85F63b8D3596DF9);
