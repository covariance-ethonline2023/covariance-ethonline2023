// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { ISafeProtocolPlugin } from 'safe-core-protocol/interfaces/Modules.sol';

struct PluginMetadata {
    string name;
    string version;
    bool requiresRootAccess;
    string iconUrl;
    string appUrl;
}

contract CovarianceSafePlugin is ISafeProtocolPlugin {
    using PluginMetadataOps for PluginMetadata;

    struct SafeProtocolAction {
        address payable to;
        uint256 value;
        bytes data;
    }

    struct SafeTransaction {
        SafeProtocolAction[] actions;
        uint256 nonce;
        bytes32 metadataHash;
    }

    PluginMetadata public pluginMetadata;
    bytes public encodedMetadata;
    bytes32 public immutable metadataHash;

    constructor () {
        pluginMetadata = PluginMetadata({
            name: unicode'♓ Covariance',
            version: '1.0.0-rc',
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
