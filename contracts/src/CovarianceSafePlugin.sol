// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { Safe } from 'safe-contracts/Safe.sol';
import { ISafeProtocolPlugin } from 'safe-core-protocol/interfaces/Modules.sol';
import {
    SafeProtocolManager,
    SafeProtocolAction,
    SafeTransaction
} from 'safe-core-protocol/SafeProtocolManager.sol';
import '@openzeppelin/contracts/interfaces/IERC20.sol';

import { CovarianceHub, NotAllowed } from './CovarianceHub.sol';

struct PluginMetadata {
    string name;
    string version;
    bool requiresRootAccess;
    string iconUrl;
    string appUrl;
}

contract CovarianceSafePlugin is ISafeProtocolPlugin {
    using PluginMetadataOps for PluginMetadata;

    SafeProtocolManager constant pluginManager = SafeProtocolManager(0x6a97233258CD825F45b73f4B14e2cE22D4627cAf);

    PluginMetadata public pluginMetadata;
    bytes public encodedMetadata;
    bytes32 public immutable metadataHash;
    CovarianceHub public covarianceHub;
    address public owner;

    constructor () {
        owner = msg.sender;
        pluginMetadata = PluginMetadata({
            name: unicode'♓ Covariance',
            version: '1.0.0-rc1',
            requiresRootAccess: false,
            iconUrl: 'https://softr-prod.imgix.net/applications/125c1d0e-866a-42bf-b831-89853e605024/assets/0dcef2ca-432b-44fe-8d94-f4a5a23ae5b2.png',
            appUrl: 'https://example.com'
        });

        encodedMetadata = pluginMetadata.encode();
        metadataHash = keccak256(encodedMetadata);
    }

    function name() external view returns (string memory _name) {
        _name = pluginMetadata.name;
    }

    function version() external view returns (string memory _version) {
        _version = pluginMetadata.version; 
    }

    function metadataProvider() external view returns (
        uint256 providerType,
        bytes memory location
    ) {
        providerType = 2;
        location = abi.encode(address(this));
    }

    function retrieveMetadata(
        bytes32 _metadataHash
    ) external view returns (bytes memory metadata) {
        require(metadataHash == _metadataHash, "Cannot retrieve metadata");
        return encodedMetadata;
    }

    function requiresPermissions() external pure returns (uint8 permissions) {
        permissions = 1;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) external pure returns (bool) {
        if (interfaceId == 0x01ffc9a7) return true;
        if (interfaceId == type(ISafeProtocolPlugin).interfaceId) return true;
        return false;
    }

    function setHub (
        CovarianceHub hub
    ) external {
        if (msg.sender != owner) revert NotAllowed();
        covarianceHub = hub;
    }

    function payout (
        Safe from,
        address to,
        IERC20 rewardToken,
        uint amount
    ) external {
        if (msg.sender != address(covarianceHub)) revert NotAllowed();
        SafeProtocolAction[] memory actions = new SafeProtocolAction[](1);

        actions[0] = SafeProtocolAction({
            to: payable(address(rewardToken)),
            value: 0,
            data: abi.encodeWithSelector(
                IERC20.transfer.selector,
                address(to),
                amount
            )
        });

        pluginManager.executeTransaction({
            account: address(from),
            transaction: SafeTransaction({
                actions: actions,
                nonce: from.nonce(),
                metadataHash: metadataHash
            })
        });
    }
}

library PluginMetadataOps {
    function encode(PluginMetadata memory data) internal pure returns (bytes memory) {
        return
        abi.encodePacked(
            uint8(0x00), // Format
            uint8(0x00), // Format version
            abi.encode(data.name, data.version, data.requiresRootAccess, data.iconUrl, data.appUrl) // Plugin Metadata
        );
    }
}
