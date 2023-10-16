pragma solidity ^0.8.10;

interface TestSafeProtocolRegistryUnrestricted {
    event IntegrationAdded(address integration);
    event IntegrationFlagged(address integration);
    event OwnershipTransferStarted(address indexed previousOwner, address indexed newOwner);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    function acceptOwnership() external;
    function addIntegration(address integration, uint8 integrationType) external;
    function check(address integration) external view returns (uint64 listedAt, uint64 flaggedAt);
    function flagIntegration(address integration) external;
    function listedIntegrations(address)
        external
        view
        returns (uint64 listedAt, uint64 flaggedAt, uint8 integrationType);
    function owner() external view returns (address);
    function pendingOwner() external view returns (address);
    function renounceOwnership() external;
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
    function transferOwnership(address newOwner) external;
}
