"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CampaignCard } from "@/components/ui/campaignCard";
import React, { useState } from 'react';


const ReviewCampaigns = () => {
    const [ campaignId, setCampaignId ] = useState(null);

    const campaigns = [{
        id: 1,
        name: "Safe",
        duration:"Dec 12th - Dec 29th",
        progress: 60,
        amount: "$5,000",
        amountUnit: "$5/KPI",
        imgSrc: "https://user-images.githubusercontent.com/3975770/212338977-5968eae5-bb1b-4e71-8f82-af5282564c66.png",
    }, {
        id: 2,
        name: "Safe",
        duration:"Dec 12th - Dec 29th",
        progress: 60,
        amount: "$7,200",
        amountUnit: "$5/KPI",
        imgSrc: "https://user-images.githubusercontent.com/3975770/212338977-5968eae5-bb1b-4e71-8f82-af5282564c66.png",
    }]

    const className = `
    data-[state=active]:bg-appGray data-[state=active]:text-white
    rounded-[8px] w-[248px] text-sm p-0
    `;

    return (
        <div className="flex flex-col gap-y-2 items-stretch content-stretch">
            <h1>CREATED CAMPAIGNS</h1>
            {
                campaignId == null ?
                    campaigns.map(campaign =>
                        <CampaignCard type={"claim"}
                            buttonLabel="MANAGE CAMPAIGN"
                            campaignData={campaign}
                            actionBtn={()=> setCampaignId(campaign.id)}
                        />
                    )
                :
                <h1>{campaignId}</h1>
            }
        </div>
    );
};

export default ReviewCampaigns;
