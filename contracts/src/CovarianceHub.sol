// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Safe } from 'safe-contracts/Safe.sol';
import './external/IERC20.sol';

import { console2 } from 'forge-std/Test.sol';

error NotEnoughFundsInSafe();
error InitiatorNotSafeAccount();
error SenderIsNotInitiator();
error InvalidContribution();

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

contract CovarianceHub {
    uint campaignId = 1;
    mapping(Safe account => uint[] campaignIds) private _campaignsByAccount;
    mapping(uint campaignId => Campaign campaign) public campaignById;

    function campaignsByAccount (
        Safe account
    ) view external returns (uint[] memory ids) {
        ids = _campaignsByAccount[account];
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
            if (
                contrib.campaignId >= campaignId ||
                contrib.challengeIndex >=
                    campaignById[contrib.campaignId].challenges.length ||
                contrib.amount == 0
            ) {
                revert InvalidContribution();
            }
        }
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
