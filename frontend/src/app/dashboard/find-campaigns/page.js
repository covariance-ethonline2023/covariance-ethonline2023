"use client"

import { ContributorForm } from "@/components/contributorForm";
import { Button } from "@/components/ui/button";
import { CampaignCard } from "@/components/ui/campaignCard";
import { useEffect, useState } from "react";


const Campaigns = () => {
    const [showCampaigns, setShowCampaigns] = useState(true);
    const [selectedCampaign, setSelectedCampaign] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(()=> {

    },[showCampaigns]);

    const fakecampaignData={name: "NFT Strategy Development", location: "Binance Exchange CA, USA.", duration:"Dec 30th - Jan 29th", progress: 60, amount: "$5000", amountUnit: "$5/KPI"}


    
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

        {showModal ? <ContributorForm open={showModal} setOpen={()=>setShowModal(!showModal)}/> : <>
            
              {showCampaigns && <CampaignCard type={"contribute"} campaignData={fakecampaignData} actionBtn={handleContribute} onCardClick={handleselectedCard}/>}
            
            {/* get data and map */}
            {/* {CampaignCardDataArray.map((card) => (
        <CampaignCard type={"contribute"} campaignData={fakecampaignData} actionBtn={handleContribute()} cardClick={(data) => handleselectedCard(data)}/>
      ))} */}

        {!showCampaigns &&    
                <div>
                    <div>
                    <h1 className="font-bold text-black text-lg">{selectedCampaign?.name}  </h1>
                    </div>                   
                    <div className="flex flow-row gap-4 pt-4 pb-4">
                        <p className="text-gray-500 text-sm">{selectedCampaign?.location}</p>
                        <Button onClick={handleApply}>APPLY</Button>
                    </div>

                    <h1 className="text-black text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h1>


            </div>}                
            </>}            
        </div>
    );
  };
  
  export default Campaigns;