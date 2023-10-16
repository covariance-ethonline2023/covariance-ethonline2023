pragma solidity ^0.8.10;

interface TestSafeProtocolManager {
    event ActionsExecuted(address indexed safe, bytes32 metadataHash, uint256 nonce);
    event HooksChanged(address indexed safe, address indexed hooksAddress);
    event OwnershipTransferStarted(address indexed previousOwner, address indexed newOwner);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event PluginDisabled(address indexed safe, address indexed plugin);
    event PluginEnabled(address indexed safe, address indexed plugin, bool allowRootAccess);
    event RegistryChanged(address indexed oldRegistry, address indexed newRegistry);
    event RootAccessActionExecuted(address indexed safe, bytes32 metadataHash);

    struct SafeProtocolAction {
        address to;
        uint256 value;
        bytes data;
    }

    struct PluginAccessInfo {
        bool rootAddressGranted;
        address nextPluginPointer;
    }

    struct SafeRootAccess {
        SafeProtocolAction action;
        uint256 nonce;
        bytes32 metadataHash;
    }

    struct SafeTransaction {
        SafeProtocolAction[] actions;
        uint256 nonce;
        bytes32 metadataHash;
    }

    function acceptOwnership() external;
    function disablePlugin(address prevPlugin, address plugin) external;
    function enablePlugin(address plugin, bool allowRootAccess) external;
    function enabledHooks(address) external view returns (address);
    function enabledPlugins(address, address)
        external
        view
        returns (bool rootAddressGranted, address nextPluginPointer);
    function executeRootAccess(address safe, SafeRootAccess memory rootAccess) external returns (bytes memory data);
    function executeTransaction(address safe, SafeTransaction memory transaction)
        external
        returns (bytes[] memory data);
    function getEnabledHooks(address safe) external view returns (address hooksAddress);
    function getPluginInfo(address safe, address plugin) external view returns (PluginAccessInfo memory enabled);
    function getPluginsPaginated(address start, uint256 pageSize, address safe)
        external
        view
        returns (address[] memory array, address next);
    function isPluginEnabled(address safe, address plugin) external view returns (bool);
    function owner() external view returns (address);
    function pendingOwner() external view returns (address);
    function registry() external view returns (address);
    function renounceOwnership() external;
    function setHooks(address hooks) external;
    function setRegistry(address newRegistry) external;
    function transferOwnership(address newOwner) external;
}
