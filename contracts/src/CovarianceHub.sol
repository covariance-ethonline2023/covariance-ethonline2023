// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { Safe } from 'safe-contracts/Safe.sol';
import './external/IERC20.sol';

import { console2 } from 'forge-std/Test.sol';

error NotEnoughFundsInSafe();
error InitiatorNotSafeAccount();
error SenderIsNotInitiator();

contract CovarianceHub {
    uint campaignId = 1;
    mapping(Safe account => uint[] campaignIds) private _campaignsByAccount;
    // mapping(uint campaignId => Campaign campaign) public campaignById;

    struct Campaign {
        Safe initiator;
        string title;
        string ipfsCid;
        IERC20 rewardToken;
        uint rewardAmount;
    }

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
        // campaigns[id] = campaign;
        campaignId++;
    }
}
