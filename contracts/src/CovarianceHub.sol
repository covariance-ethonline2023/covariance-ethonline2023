// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Safe } from 'safe-contracts/Safe.sol';
import {
    OptimisticOracleV3Interface
} from 'uma/optimistic-oracle-v3/interfaces/OptimisticOracleV3Interface.sol';
import '@openzeppelin/contracts/interfaces/IERC20.sol';

import { console2 } from 'forge-std/Test.sol';

error NotEnoughFundsInSafe();
error InitiatorNotSafeAccount();
error SenderIsNotInitiator();
error InvalidContribution(string field);
error NotAllowed();

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
}

struct Claim {
    Safe initiator;
    uint campaignId;
    Contribution contribution;
}

contract CovarianceHub {
    uint campaignId = 1;
    uint contributionId = 1;
    mapping(Safe => uint[]) private _campaignsByAccount;
    mapping(address => uint[]) private _contributionsByAccount;
    mapping(uint => uint[]) private _contributionsByCampaign;
    mapping(uint => uint) private _campaignByContribution;
    mapping(uint => Contribution) private _contributionById;
    mapping(uint => address) private _contributer;
    mapping(uint => Campaign) public campaignById;

    OptimisticOracleV3Interface constant oov3 = OptimisticOracleV3Interface(0x9923D42eF695B5dd9911D05Ac944d4cAca3c4EAB);
    IERC20 private constant WETH = IERC20(0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6);

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
    ) public view returns (Contribution[] memory contribs) {
        uint contribCount = _contributionsByCampaign[_campaignId].length;
        contribs = new Contribution[](contribCount);
        for (uint i = 0; i < contribCount; i++) {
            contribs[i] = contribution(_contributionsByCampaign[_campaignId][i]);
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

            _contributionsByAccount[msg.sender].push(contributionId);
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

        assertionId = oov3.assertTruth({
            claim: abi.encode(Claim({
                initiator: initiator,
                campaignId: campId,
                contribution: contribution(contribId)
            })),
            asserter: msg.sender,
            callbackRecipient: address(this),
            escalationManager: address(0),
            liveness: 60,
            currency: WETH,
            bond: 0,
            identifier: oov3.defaultIdentifier(),
            domainId: ''
        });
    }

    function storeCampaign (uint id, Campaign memory campaign) private {
        campaignById[id].rewardAmount = campaign.rewardAmount;
        campaignById[id].rewardToken = campaign.rewardToken;
        campaignById[id].initiator = campaign.initiator;
        campaignById[id].title = campaign.title;
        campaignById[id].ipfsCid = campaign.ipfsCid;
        for (uint i = 0; i < campaign.challenges.length; i++) {
            campaignById[id].challenges.push(campaign.challenges[i]);
        }
    }
}
