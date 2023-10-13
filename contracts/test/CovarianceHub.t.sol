// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Safe, Enum } from 'safe-contracts/Safe.sol';
import { ModuleManager } from 'safe-contracts/base/ModuleManager.sol';
import { SafeProxyFactory } from 'safe-contracts/proxies/SafeProxyFactory.sol';
import {
    SafeProtocolRegistry
} from 'safe-core-protocol/SafeProtocolRegistry.sol';
import {
    SafeProtocolManager
} from 'safe-core-protocol/SafeProtocolManager.sol';
import {
    OptimisticOracleV3Interface
} from '../src/external/OptimisticOracleV3Interface.sol';
import '@openzeppelin/contracts/interfaces/IERC20.sol';
import { Test, console2 } from 'forge-std/Test.sol';
import { Vm } from 'forge-std/Vm.sol';
import '../src/CovarianceHub.sol';
import '../src/CovarianceSafePlugin.sol';

contract CovarianceHubTest is Test {
    IERC20 private constant WETH = IERC20(0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6);
    SafeProxyFactory safeFactory = SafeProxyFactory(0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67);
    Safe safeSingleton = Safe(payable(0x29fcB43b46531BcA003ddC8FCB67FFE91900C762));
    OptimisticOracleV3Interface constant oov3 = OptimisticOracleV3Interface(0x9923D42eF695B5dd9911D05Ac944d4cAca3c4EAB);
    SafeProtocolRegistry constant pluginRegistry = SafeProtocolRegistry(0x2b18E7246d213676a0b9741fE860c7cC05D75cE2);
    SafeProtocolManager constant pluginManager = SafeProtocolManager(0x6a97233258CD825F45b73f4B14e2cE22D4627cAf);
    CovarianceHub public testContract;
    CovarianceSafePlugin safePlugin;
    Safe public safeAccount;

    Vm.Wallet company = vm.createWallet('company');
    Vm.Wallet contributor = vm.createWallet('contributor');

    struct TxDetails {
        Vm.Wallet signer;
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
        safePlugin = new CovarianceSafePlugin();
        pluginRegistry.addModule(address(safePlugin), 1);
        testContract = new CovarianceHub();
        testContract.setPlugin(safePlugin);
        safePlugin.setHub(testContract);

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
        // deployCodeTo('Safe.sol', address(safeAccount));

        execSafeTx(TxDetails({
            signer: company,
            to: address(safeAccount),
            value: 0,
            data: abi.encodeWithSelector(
                ModuleManager.enableModule.selector,
                pluginManager
            ),
            operation: Enum.Operation.Call,
            safeTxGas: 0,
            baseGas: 0,
            gasPrice: 0,
            gasToken: address(0),
            refundReceiver: payable(0)
        }));
        execSafeTx(TxDetails({
            signer: company,
            to: address(pluginManager),
            value: 0,
            data: abi.encodeWithSelector(
                SafeProtocolManager.enablePlugin.selector,
                safePlugin,
                1,
                safeAccount
            ),
            operation: Enum.Operation.Call,
            safeTxGas: 0,
            baseGas: 0,
            gasPrice: 0,
            gasToken: address(0),
            refundReceiver: payable(0)
        }));
    }

    function getDataHash (TxDetails memory details) private view returns (bytes32) {
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

        return keccak256(abi.encodePacked(
            "\x19Ethereum Signed Message:\n32",
            txHash
        ));
    }

    function execSafeTx (TxDetails memory details) private returns (bool) {
        bytes32 dataHash = getDataHash(details);

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(
            details.signer,
            dataHash
        );

        return safeAccount.execTransaction({
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

    function createCampaignViaSafe () public returns (bool) {
        return createCampaignViaSafe(IERC20(address(0)), 0);
    }

    function createCampaignViaSafe (
        IERC20 rewardToken,
        uint rewardAmount
    ) public returns (bool) {
        Challenge[] memory challenges = new Challenge[](2);
        challenges[0] = Challenge({
            kpi: 'Bring customers',
            points: 10,
            maxContributions: 3,
            contributionsSpent: 0
        });
        challenges[1] = Challenge({
            kpi: 'Increase hackathon participation',
            points: 20,
            maxContributions: 5,
            contributionsSpent: 0
        });

        bytes memory data = abi.encodeWithSelector(
            CovarianceHub.createCampaign.selector,
            Campaign({
                initiator: safeAccount,
                title: 'Test Campaign',
                ipfsCid: '',
                rewardToken: rewardToken,
                rewardAmount: rewardAmount,
                challenges: challenges
            })
        );

        return execSafeTx(TxDetails({
            signer: company,
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

    function test_setPluginOnHub_shouldRevert () public {
        vm.expectRevert(NotAllowed.selector);
        vm.prank(contributor.addr);
        testContract.setPlugin(CovarianceSafePlugin(address(1)));
    }

    function test_setHubOnPlugin_shouldRevert () public {
        vm.expectRevert(NotAllowed.selector);
        vm.prank(contributor.addr);
        safePlugin.setHub(CovarianceHub(address(1)));
    }

    function test_callPayoutOnPluginDirectly_shouldRevert () public {
        deal(address(WETH), address(safeAccount), 0.15 ether);
        vm.expectRevert(NotAllowed.selector);
        safePlugin.payout({
            from: safeAccount,
            to: contributor.addr,
            rewardToken: WETH,
            amount: 0.1 ether
        });
    }

    function test_invokeOovDisputedCallbackDirectly_shouldRevert () public {
        vm.expectRevert(NotAllowed.selector);
        testContract.assertionDisputedCallback('test');
    }

    function test_invokeOovResolvedCallbackDirectly_shouldRevert () public {
        vm.expectRevert(NotAllowed.selector);
        testContract.assertionResolvedCallback('test', false);
    }

    function test_settleContribution_invokeOOV3() public {
        deal(address(WETH), address(safeAccount), 0.15 ether);
        createCampaignViaSafe(WETH, 0.13 ether);

        Contribution[] memory contributions = new Contribution[](1);
        contributions[0] = Contribution({
            campaignId: 1,
            challengeIndex: 0,
            amount: 1
        });

        vm.prank(contributor.addr);
        testContract.contribute(contributions);

        vm.startPrank(company.addr);

        testContract.approve(1);

        vm.warp(block.timestamp + 120);

        bytes32 assertion = testContract.assertionByContribution(1);

        vm.stopPrank();
        vm.prank(contributor.addr);
        bool isApproved = oov3.settleAndGetAssertionResult(assertion);

        assertEq(isApproved, true);

        assertEq(
            uint8(testContract.contributionStatus(1)),
            uint8(Status.APPROVED)
        );

        assertEq(WETH.balanceOf(contributor.addr), 0.01 ether);
        assertEq(WETH.balanceOf(address(safeAccount)), 0.14 ether);
    }

    function test_approveTwice_shouldRevert() public {
        createCampaignViaSafe();

        Contribution[] memory contributions = new Contribution[](1);
        contributions[0] = Contribution({
            campaignId: 1,
            challengeIndex: 0,
            amount: 1
        });

        vm.prank(contributor.addr);
        testContract.contribute(contributions);

        vm.startPrank(company.addr);

        testContract.approve(1);

        vm.expectRevert(InvalidStateTransition.selector);
        testContract.approve(1);
    }

    function test_approveContribution_invokeOOV3() public {
        createCampaignViaSafe();

        Contribution[] memory contributions = new Contribution[](1);
        contributions[0] = Contribution({
            campaignId: 1,
            challengeIndex: 0,
            amount: 1
        });

        vm.prank(contributor.addr);
        testContract.contribute(contributions);

        vm.startPrank(company.addr);

        bytes32 assertionId = testContract.approve(1);
        address recipient = oov3.getAssertion(assertionId).callbackRecipient;

        assertEq(recipient, address(testContract));
    }

    function test_approveContributionAsContributor_shouldRevert() public {
        createCampaignViaSafe();

        Contribution[] memory contributions = new Contribution[](1);
        contributions[0] = Contribution({
            campaignId: 1,
            challengeIndex: 0,
            amount: 1
        });

        vm.prank(contributor.addr);
        testContract.contribute(contributions);

        uint[] memory contribIds = testContract.getAccountContributions(contributor.addr);

        vm.expectRevert(NotAllowed.selector);
        vm.prank(contributor.addr);
        testContract.approve(contribIds[0]);
    }

    function test_campaignContributions() public {
        createCampaignViaSafe();
        vm.prank(contributor.addr);
        Contribution[] memory contributions = new Contribution[](2);
        contributions[0] = Contribution({
            campaignId: 1,
            challengeIndex: 0,
            amount: 1
        });
        contributions[1] = Contribution({
            campaignId: 1,
            challengeIndex: 1,
            amount: 2
        });
        testContract.contribute(contributions);

        Contribution[] memory contribs = testContract.campaignContributions(1);
        assertEq(contribs[0].campaignId, 1);
        assertEq(contribs[0].challengeIndex, 0);
        assertEq(contribs[0].amount, 1);
        assertEq(contribs[1].campaignId, 1);
        assertEq(contribs[1].challengeIndex, 1);
        assertEq(contribs[1].amount, 2);
    }

    function test_contribute_shouldStoreContributions() public {
        createCampaignViaSafe();
        vm.prank(contributor.addr);
        Contribution[] memory contributions = new Contribution[](2);
        contributions[0] = Contribution({
            campaignId: 1,
            challengeIndex: 0,
            amount: 1
        });
        contributions[1] = Contribution({
            campaignId: 1,
            challengeIndex: 1,
            amount: 2
        });
        testContract.contribute(contributions);

        Contribution memory contrib1 = testContract.contribution(1);
        Contribution memory contrib2 = testContract.contribution(2);
        assertEq(contrib1.campaignId, 1);
        assertEq(contrib1.challengeIndex, 0);
        assertEq(contrib1.amount, 1);
        assertEq(contrib2.campaignId, 1);
        assertEq(contrib2.challengeIndex, 1);
        assertEq(contrib2.amount, 2);
    }

    function test_contributeZeroAmount_shouldRevert() public {
        createCampaignViaSafe();
        vm.prank(contributor.addr);
        Contribution[] memory contributions = new Contribution[](1);
        contributions[0] = Contribution({
            campaignId: 1,
            challengeIndex: 0,
            amount: 0
        });
        vm.expectRevert(abi.encodeWithSelector(
            InvalidContribution.selector,
            'amount'
        ));
        testContract.contribute(contributions);
    }

    function test_contribute() public {
        createCampaignViaSafe();
        vm.prank(contributor.addr);
        Contribution[] memory contributions = new Contribution[](1);
        contributions[0] = Contribution({
            campaignId: 1,
            challengeIndex: 0,
            amount: 1
        });
        testContract.contribute(contributions);
    }

    function test_contributeNonExistingCampaign_shouldRevert() public {
        createCampaignViaSafe();
        vm.prank(contributor.addr);
        Contribution[] memory contributions = new Contribution[](1);
        contributions[0] = Contribution({
            campaignId: 123,
            challengeIndex: 0,
            amount: 1
        });
        vm.expectRevert(abi.encodeWithSelector(
            InvalidContribution.selector,
            'campaignId'
        ));
        testContract.contribute(contributions);
    }

    function test_contributeNonExistingChallenge_shouldRevert() public {
        createCampaignViaSafe();
        vm.prank(contributor.addr);
        Contribution[] memory contributions = new Contribution[](1);
        contributions[0] = Contribution({
            campaignId: 1,
            challengeIndex: 123,
            amount: 1
        });
        vm.expectRevert(abi.encodeWithSelector(
            InvalidContribution.selector,
            'challengeIndex'
        ));
        testContract.contribute(contributions);
    }

    function test_campaignWithRewardHasBalance_txSucceeds() public {
        deal(address(WETH), address(safeAccount), 1 ether);
        bool success = createCampaignViaSafe(WETH, 1 ether);
        assertTrue(success);
    }

    function test_campaignWithRewardNoBalance_shouldRevert() public {
        Challenge[] memory challenges = new Challenge[](1);
        challenges[0] = Challenge({
            kpi: 'Bring customers',
            points: 10,
            maxContributions: 3,
            contributionsSpent: 0
        });

        bytes memory data = abi.encodeWithSelector(
            CovarianceHub.createCampaign.selector,
            Campaign({
                initiator: safeAccount,
                title: 'Test Campaign',
                ipfsCid: '',
                rewardToken: WETH,
                rewardAmount: 1 ether,
                challenges: challenges
            })
        );

        bytes32 dataHash = getDataHash(TxDetails({
            signer: company,
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

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(
            company,
            dataHash
        );

        vm.expectRevert('GS013');
        safeAccount.execTransaction({
            to: address(testContract),
            value: 0,
            data: data,
            operation: Enum.Operation.Call,
            safeTxGas: 0,
            baseGas: 0,
            gasPrice: 0,
            gasToken: address(0),
            refundReceiver: payable(0),
            signatures: abi.encodePacked(r, s, v + 4)
        });
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
        testContract.createCampaign(Campaign({
            initiator: safeAccount,
            title: 'Test Campaign',
            ipfsCid: '',
            rewardToken: IERC20(address(0)),
            rewardAmount: 0,
            challenges: new Challenge[](1)
        }));
    }
}
