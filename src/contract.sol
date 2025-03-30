// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract CryptoFundIt {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 targetAmount;
        uint256 raisedAmount;
        uint256 deadline;
        string imageUrl;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaign = 0;

    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _targetAmount,
        uint256 _deadline,
        string memory _imageUrl
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaign];

        require(
            campaign.deadline <= block.timestamp,
            "The deadline must be greater than the current timestamp."
        );

        campaign.owner = msg.sender;
        campaign.title = _title;
        campaign.description = _description;
        campaign.targetAmount = _targetAmount;
        campaign.raisedAmount = 0;
        campaign.deadline = _deadline;
        campaign.imageUrl = _imageUrl;

        numberOfCampaign++;

        return numberOfCampaign - 1;
    }

    function donateToCampaign(uint256 _campaignId) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_campaignId];

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.donators.push(msg.sender);
            campaign.donations.push(amount);
            campaign.raisedAmount += amount;
        }
    }

    function getDonators(
        uint256 _campaignId
    ) public view returns (address[] memory, uint256[] memory) {
        return (
            campaigns[_campaignId].donators,
            campaigns[_campaignId].donations
        );
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaign);
        for (uint256 i = 0; i < numberOfCampaign; i++) {
            allCampaigns[i] = campaigns[i];
        }
        return allCampaigns;
    }

    function getCampaign(
        uint256 _campaignId
    ) public view returns (Campaign memory) {
        return campaigns[_campaignId];
    }
}
