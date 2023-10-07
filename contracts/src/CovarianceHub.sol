// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { Safe } from 'safe-contracts/Safe.sol';

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
        address rewardToken;
        uint rewardAmount;
    }

    function campaignsByAccount (
        Safe account
    ) view external returns (uint[] memory ids) {
        ids = _campaignsByAccount[account];
    }

    function createCampaign (Campaign memory campaign) external returns (uint id) {
        if (msg.sender != address(campaign.initiator)) revert SenderIsNotInitiator();
        id = campaignId;
        _campaignsByAccount[campaign.initiator].push(id);
        // campaigns[id] = campaign;
        campaignId++;
    }
}
