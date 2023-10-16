// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Safe } from 'safe-contracts/Safe.sol';
import {
    OptimisticOracleV3Interface
} from './external/OptimisticOracleV3Interface.sol';
import {
    OptimisticOracleV3CallbackRecipientInterface
} from './external/OptimisticOracleV3CallbackRecipientInterface.sol';
import './CovarianceSafePlugin.sol';

error NotEnoughFundsInSafe();
error InitiatorNotSafeAccount();
error SenderIsNotInitiator();
error InvalidContribution(string field);
error InvalidStateTransition();
error NotAllowed();

contract CovarianceHub {
    uint campaignId = 1;
    uint contributionId = 1;
    mapping(Safe => uint[]) private _campaignsByAccount;
    mapping(address => uint[]) private _contributionsByAccount;
    mapping(uint => address) private _accountByContribution;
    mapping(uint => uint[]) private _contributionsByCampaign;
    mapping(uint => uint) private _campaignByContribution;
    mapping(uint => Contribution) private _contributionById;
    mapping(uint => Campaign) public campaignById;
    mapping(uint => Status) public contributionStatus;
    mapping(bytes32 => uint) public contributionByAssertion;
    mapping(uint => bytes32) public assertionByContribution;

    CovarianceSafePlugin plugin;
    address public owner;

    constructor () {
        owner = msg.sender;
    }

    function campaignsByAccount (
        Safe account
    ) view external returns (uint[] memory ids) {
        ids = _campaignsByAccount[account];
    }

    function contribution (
        uint contribId
    ) public view returns (Contribution memory contrib) {
        contrib.campaignId = _contributionById[contribId].campaignId;
        contrib.challengeIndex = _contributionById[contribId].challengeIndex;
        contrib.amount = _contributionById[contribId].amount;
    }

    function campaignContributions (
        uint _campaignId
    ) public view returns (ContributionInfo[] memory contribs) {
        uint contribCount = _contributionsByCampaign[_campaignId].length;
        contribs = new ContributionInfo[](contribCount);
        for (uint i = 0; i < contribCount; i++) {
            uint contribId = _contributionsByCampaign[_campaignId][i];
            contribs[i].contributionId = contribId;
            contribs[i].contributor = _accountByContribution[contribId];
            contribs[i].contribution = contribution(contribId);
        }
    }

    function createCampaign (Campaign memory campaign) external returns (uint id) {
        if (msg.sender != address(campaign.initiator)) revert SenderIsNotInitiator();
        if (address(campaign.rewardToken) != address(0)) {
            uint initiatorBalance = campaign.rewardToken
                .balanceOf(address(campaign.initiator));
            if (initiatorBalance < campaign.rewardAmount)
                revert NotEnoughFundsInSafe();
        }
        id = campaignId;
        _campaignsByAccount[campaign.initiator].push(id);
        storeCampaign(id, campaign);
        campaignId++;
    }

    function contribute (
        Contribution[] memory contributions
    ) external {
        for (uint i = 0; i < contributions.length; i++) {
            Contribution memory contrib = contributions[i];
            if (contrib.campaignId >= campaignId)
                revert InvalidContribution('campaignId');

            uint challengeCount = campaignById[contrib.campaignId].challenges.length;
            if (contrib.challengeIndex >= challengeCount)
                revert InvalidContribution('challengeIndex');

            if (contrib.amount == 0) revert InvalidContribution('amount');

            contributionStatus[contributionId] = Status.SUBMITTED;
            _contributionsByAccount[msg.sender].push(contributionId);
            _accountByContribution[contributionId] = msg.sender;
            _contributionsByCampaign[contrib.campaignId].push(contributionId);
            // contributer[contributionId] = msg.sender;
            _contributionById[contributionId] = contrib;
            _campaignByContribution[contributionId] = contrib.campaignId;
            contributionId++;
        }
    }

    function getAccountContributions (
        address contributor
    ) external view returns (uint[] memory contribs) {
        contribs = _contributionsByAccount[contributor];
    }

    function approve (
        uint contribId
    ) external returns (bytes32 assertionId) {
        if (contributionStatus[contribId] != Status.SUBMITTED) {
            revert InvalidStateTransition();
        }
        uint campId = _campaignByContribution[contribId];
        Safe initiator = campaignById[campId].initiator;
        address[] memory owners = initiator.getOwners();
        bool isAllowed = false;
        for (uint i = 0; i < owners.length; i++) {
            if (owners[i] == msg.sender) {
                isAllowed = true;
                break;
            }
        }

        if (isAllowed == false) revert NotAllowed();

        contributionStatus[contribId] = Status.ASSERTING;

        assertionId = OOV3.assertTruth({
            claim: abi.encode(Claim({
                initiator: initiator,
                campaignId: campId,
                contribution: contribution(contribId)
            })),
            asserter: msg.sender,
            callbackRecipient: address(this),
            escalationManager: address(0),
            liveness: 30,
            currency: WETH,
            bond: 0,
            identifier: OOV3.defaultIdentifier(),
            domainId: ''
        });

        assertionByContribution[contribId] = assertionId;
        contributionByAssertion[assertionId] = contribId;
    }

    function getCampaign (uint id) public view returns (Campaign memory campaign) {
        // Campaign storage stored = ;
        campaign.rewardAmount = campaignById[id].rewardAmount;
        campaign.rewardToken = campaignById[id].rewardToken;
        campaign.initiator = campaignById[id].initiator;
        campaign.title = campaignById[id].title;
        campaign.ipfsCid = campaignById[id].ipfsCid;
        campaign.maxPoints = campaignById[id].maxPoints;
        campaign.challenges = new Challenge[](campaignById[id].challenges.length);
        for (uint i = 0; i < campaign.challenges.length; i++) {
            Challenge storage challenge = campaignById[id].challenges[i];
            campaign.challenges[i] = Challenge({
                kpi: challenge.kpi,
                points: challenge.points,
                maxContributions: challenge.maxContributions,
                contributionsSpent: challenge.contributionsSpent
            });
        }
    }

    function storeCampaign (uint id, Campaign memory campaign) private {
        campaignById[id].rewardAmount = campaign.rewardAmount;
        campaignById[id].rewardToken = campaign.rewardToken;
        campaignById[id].initiator = campaign.initiator;
        campaignById[id].title = campaign.title;
        campaignById[id].ipfsCid = campaign.ipfsCid;
        campaignById[id].maxPoints = campaign.maxPoints;
        for (uint i = 0; i < campaign.challenges.length; i++) {
            campaignById[id].challenges.push(campaign.challenges[i]);
        }
    }

    function assertionResolvedCallback(
        bytes32 assertionId,
        bool
    ) external {
        if (msg.sender != address(OOV3)) revert NotAllowed();
        uint contribId = contributionByAssertion[assertionId];
        contributionStatus[contribId] = Status.APPROVED;
        Campaign storage campaign = campaignById[_campaignByContribution[contribId]];
        Contribution memory contrib = contribution(contribId);
        uint remainingPointsBudget = campaign.maxPoints;
        for (uint i = 0; i < campaign.challenges.length; i++) {
            Challenge storage challenge = campaign.challenges[i];
            remainingPointsBudget -= challenge.contributionsSpent * challenge.points;
        }
        uint rewardPerPoint = campaign.rewardAmount / campaign.maxPoints;
        Challenge storage contribChallenge = campaign.challenges[contrib.challengeIndex];
        uint availableContribSpots = contribChallenge.maxContributions - contribChallenge.contributionsSpent;
        uint effectiveContribAmount = availableContribSpots > contrib.amount ?
            contrib.amount : availableContribSpots;
        uint contribPointsAmount = effectiveContribAmount * contribChallenge.points;
        uint effectivePointsAmount = contribPointsAmount > remainingPointsBudget ?
            remainingPointsBudget : contribPointsAmount;
        uint rewardAmount = effectivePointsAmount * rewardPerPoint;
        
        contribChallenge.contributionsSpent += effectiveContribAmount;

        plugin.payout({
            from: campaign.initiator,
            to: _accountByContribution[contribId],
            rewardToken: campaign.rewardToken,
            amount: rewardAmount
        });
    }

    function assertionDisputedCallback(bytes32 assertionId) external {
        if (msg.sender != address(OOV3)) revert NotAllowed();
        uint contribId = contributionByAssertion[assertionId];
        contributionStatus[contribId] = Status.DISPUTED;
    }

    function settle (
        uint contribId
    ) external returns (bool isApproved) {
        bytes32 assertion = assertionByContribution[contribId];
        isApproved = OOV3.settleAndGetAssertionResult(assertion);
    }

    function setPlugin (
        CovarianceSafePlugin _plugin
    ) external {
        if (msg.sender != owner) revert NotAllowed();
        plugin = _plugin;
    }
}

struct Contribution {
    uint campaignId;
    uint challengeIndex;
    uint amount;
}

struct Challenge {
    string kpi;
    uint points;
    uint maxContributions;
    uint contributionsSpent;
}

struct Campaign {
    uint rewardAmount;
    IERC20 rewardToken;
    Safe initiator;
    string title;
    string ipfsCid;
    Challenge[] challenges;
    uint maxPoints;
}

struct ContributionInfo {
    uint contributionId;
    address contributor;
    Contribution contribution;
}

struct Claim {
    Safe initiator;
    uint campaignId;
    Contribution contribution;
}

enum Status {
    NONE,
    SUBMITTED,
    ASSERTING,
    APPROVED,
    DISPUTED
}
