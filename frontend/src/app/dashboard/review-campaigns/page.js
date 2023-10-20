"use client"
import { CampaignCard } from "@/components/ui/campaignCard";
import { CampaignDetails } from "@/components/ui/campaignDetails";
import { Contributions } from "@/components/ui/contributions";
import React, { useState } from 'react';


const ReviewCampaigns = () => {
    const [ campaignId, setCampaignId ] = useState(null);

    const campaigns = [{
        id: 1,
        name: "Secure NFT collabs",
        location: "Safe Protocol",
        duration:"Dec 12th - Dec 29th",
        progress: 60,
        amount: "$5,000",
        amountUnit: "$5/KPI",
        imgSrc: "https://user-images.githubusercontent.com/3975770/212338977-5968eae5-bb1b-4e71-8f82-af5282564c66.png",
    }, {
        id: 2,
        name: "Bring app developers",
        location: "Safe Protocol",
        duration:"Dec 12th - Dec 29th",
        progress: 35,
        amount: "$7,200",
        amountUnit: "$5/KPI",
        imgSrc: "https://user-images.githubusercontent.com/3975770/212338977-5968eae5-bb1b-4e71-8f82-af5282564c66.png",
    }]

    const selectedCampaign = campaigns.find(c => c.id === campaignId)

    return (
        <div className="flex flex-col gap-y-2 items-stretch content-stretch">
            {
                campaignId == null ?
                    <>
                    <h1>CREATED CAMPAIGNS</h1>
                    {campaigns.map(campaign =>
                        <CampaignCard key={campaign.id} type={"claim"}
                            buttonLabel="MANAGE"
                            campaignData={campaign}
                            actionBtn={()=> setCampaignId(campaign.id)}
                        />
                    )}
                    </>
                :
                    <>
                        <CampaignDetails
                            campaign={selectedCampaign}
                            onBack={() => setCampaignId(null)}
                        />
                        <Contributions campaignId={selectedCampaign.id} />
                    </>
            }
        </div>
    );
};

export default ReviewCampaigns;
