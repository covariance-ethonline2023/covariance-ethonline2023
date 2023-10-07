// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { Safe, Enum } from 'safe-contracts/Safe.sol';
import { SafeProxyFactory } from 'safe-contracts/proxies/SafeProxyFactory.sol';
import { Test, console2 } from 'forge-std/Test.sol';
import { Vm } from 'forge-std/Vm.sol';
import '../src/CovarianceHub.sol';

contract CovarianceHubTest is Test {
    SafeProxyFactory safeFactory = SafeProxyFactory(0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67);
    Safe safeSingleton = Safe(payable(0x29fcB43b46531BcA003ddC8FCB67FFE91900C762));
    CovarianceHub public testContract;
    Safe public safeAccount;

    Vm.Wallet company;
    Vm.Wallet contributor;

    struct TxDetails {
        Vm.Wallet account;
        address to;
        uint256 value;
        bytes data;
        Enum.Operation operation;
        uint256 safeTxGas;
        uint256 baseGas;
        uint256 gasPrice;
        address gasToken;
        address payable refundReceiver;
    }

    function setUp() public {
        vm.createSelectFork('goerli');
        testContract = new CovarianceHub();

        company = vm.createWallet('company');
        contributor = vm.createWallet('contributor');

        address[] memory owners = new address[](1);
        owners[0] = company.addr;

        bytes memory setupTx = abi.encodeWithSelector(
            Safe.setup.selector,
            owners,
            1,
            address(0),
            '',
            address(0),
            0,
            0,
            address(0)
        );

        safeAccount = Safe(payable(address(safeFactory.createProxyWithNonce({
            _singleton: address(safeSingleton),
            initializer: setupTx,
            saltNonce: 0
        }))));

        deployCodeTo('Safe.sol', address(safeAccount));
    }

    function execSafeTx (TxDetails memory details) private {
        bytes32 txHash = safeAccount.getTransactionHash({
            to: details.to,
            value: details.value,
            data: details.data,
            operation: details.operation,
            safeTxGas: details.safeTxGas,
            baseGas: details.baseGas,
            gasPrice: details.gasPrice,
            gasToken: details.gasToken,
            refundReceiver: details.refundReceiver,
            _nonce: safeAccount.nonce()
        });

        bytes32 dataHash = keccak256(abi.encodePacked(
            "\x19Ethereum Signed Message:\n32",
            txHash
        ));

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(
            details.account,
            dataHash
        );

        safeAccount.execTransaction({
            to: details.to,
            value: details.value,
            data: details.data,
            operation: details.operation,
            safeTxGas: details.safeTxGas,
            baseGas: details.baseGas,
            gasPrice: details.gasPrice,
            gasToken: details.gasToken,
            refundReceiver: details.refundReceiver,
            signatures: abi.encodePacked(r, s, v + 4)
        });
    }

    function createCampaignViaSafe () public {
        bytes memory data = abi.encodeWithSelector(
            CovarianceHub.createCampaign.selector,
            CovarianceHub.Campaign({
                initiator: safeAccount,
                title: 'Test Campaign',
                ipfsCid: '',
                rewardToken: address(0),
                rewardAmount: 0
            })
        );

        execSafeTx(TxDetails({
            account: company,
            to: address(testContract),
            value: 0,
            data: data,
            operation: Enum.Operation.Call,
            safeTxGas: 0,
            baseGas: 0,
            gasPrice: 0,
            gasToken: address(0),
            refundReceiver: payable(0)
        }));
    }

    function test_createCampaignTwice_getAccountCampaigns() public {
        createCampaignViaSafe();
        createCampaignViaSafe();
        uint[] memory expected = new uint[](2);
        expected[0] = 1;
        expected[1] = 2;
        uint[] memory campaigns = testContract.campaignsByAccount(safeAccount);
        assertEq(campaigns, expected);
    }

    function test_createCampaignViaSafe_getAccountCampaigns() public {
        vm.startPrank(company.addr);
        createCampaignViaSafe();
        uint[] memory expected = new uint[](1);
        expected[0] = 1;
        uint[] memory campaigns = testContract.campaignsByAccount(safeAccount);
        assertEq(campaigns, expected);
    }

    function test_createCampaignNotAsSender_shouldRevert() public {
        vm.startPrank(company.addr);
        vm.expectRevert(SenderIsNotInitiator.selector);
        testContract.createCampaign(CovarianceHub.Campaign({
            initiator: safeAccount,
            title: 'Test Campaign',
            ipfsCid: '',
            rewardToken: address(0),
            rewardAmount: 0
        }));
    }
}
