"use client"
import { ContributorForm } from "@/components/contributorForm";
import { CampaignCard } from "@/components/ui/campaignCard";
import { useEffect, useState } from "react";
import { CampaignDetails } from "@/components/ui/campaignDetails";


const Campaigns = () => {
    const [showCampaigns, setShowCampaigns] = useState(true);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(()=> {

    },[showCampaigns]);

    const fakecampaignData={
        name: "NFT Strategy Development",
        location: "Binance Exchange CA, USA.",
        duration:"Dec 30th - Jan 29th",
        progress: 20,
        amount: "$12,000",
        amountUnit: "$5/KPI",
        imgSrc: "https://user-images.githubusercontent.com/3975770/212338977-5968eae5-bb1b-4e71-8f82-af5282564c66.png"
    }



    const handleContribute = () => {
        setShowCampaigns(false);
    }


    const handleselectedCard = (cardData) => {
        setShowCampaigns(false);
        console.log("selectedCampaign before", selectedCampaign);
        setSelectedCampaign(cardData);
        console.log("selectedCampaign after", selectedCampaign)

    };

    const handleApply = () => {
        setShowModal(true);

    }

    return (
        <div>

        {
            showModal ?
                <ContributorForm open={showModal} setOpen={()=>setShowModal(!showModal)}/>
            :
                <>
                    {
                        showCampaigns ?
                            <CampaignCard buttonLabel={"CONTRIBUTE"}
                                campaignData={fakecampaignData}
                                actionBtn={handleselectedCard}
                                onCardClick={handleselectedCard}
                            />
                        :
                            <CampaignDetails
                                campaign={selectedCampaign}
                                onBack={() => setShowCampaigns(true)}
                                button={{ label: 'CONTRIBUTE', action: handleApply }}
                            />
                    }
                </>
            }
        </div>
    );
};

export default Campaigns;
