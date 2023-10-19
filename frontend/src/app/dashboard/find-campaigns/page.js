"use client"

import { ContributorForm } from "@/components/contributorForm";
import { Button } from "@/components/ui/button";
import { CampaignCard } from "@/components/ui/campaignCard";
import { useEffect, useState } from "react";
import Image from "next/image"


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

        {showModal ? <ContributorForm open={showModal} setOpen={()=>setShowModal(!showModal)}/> : <>
            
              {showCampaigns && <CampaignCard buttonLabel={"CONTRIBUTE"} campaignData={fakecampaignData} actionBtn={handleContribute} onCardClick={handleselectedCard}/>}
            
            {/* get data and map */}
            {/* {CampaignCardDataArray.map((card) => (
        <CampaignCard type={"contribute"} campaignData={fakecampaignData} actionBtn={handleContribute()} cardClick={(data) => handleselectedCard(data)}/>
      ))} */}

        {!showCampaigns &&    
                <div>
                    <div onClick={() => setShowCampaigns(true)} className="mb-8 hover:cursor-pointer">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.5">
                        <path d="M12 8L8 12M8 12L12 16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        </svg>
                    </div>
                    <div>
                        <h1 className="font-medium text-white text-[2rem]">{selectedCampaign?.name}  </h1>
                    </div>                   
                    <div className="flex flow-row items-center gap-2 mt-4 mb-4">
                        <Image src={selectedCampaign?.imgSrc} className={`
                            rounded-full bg-appGlass
                            border-2 border-appSecondary
                        `} width={32} height={32} />
                        <p className="underline text-white text-lg">{selectedCampaign?.location}</p>
                        <Button onClick={handleApply} className={`
                            rounded-[2rem] p-1 pl-6 pr-6 bg-appGreenDark hover:bg-appGreenDark
                            whitespace-nowrap text-xs h-auto ml-8
                        `}>CONTRIBUTE</Button>
                    </div>

                    <h1 className="text-white text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h1>


            </div>}                
            </>}            
        </div>
    );
  };
  
  export default Campaigns;
