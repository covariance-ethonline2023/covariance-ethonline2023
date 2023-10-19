"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CampaignCard } from "@/components/ui/campaignCard";


const MyCampaigns = () => {

    const handleClaimReward = () => { }

    const fakecampaignClaimData={
        name: "Safe",
        duration:"Dec 12th - Dec 29th",
        progress: 60,
        amount: "$5,000",
        amountUnit: "$5/KPI",
        imgSrc: "https://user-images.githubusercontent.com/3975770/212338977-5968eae5-bb1b-4e71-8f82-af5282564c66.png",
    }

    const className = `
        data-[state=active]:bg-appGray data-[state=active]:text-white
        rounded-[8px] w-[248px] text-sm p-0
    `;

    return (
        <div className="flex flex-col items-stretch content-stretch">
            <Tabs defaultValue="current" className="flex flex-col items-stretch">
                <TabsList className="rounded-[10px] p-[2px] mb-16 items-stretch h-[48px] bg-appBlack border-2 border-appSecondary self-start">
                    <TabsTrigger className={className} value="current">CURRENT</TabsTrigger>
                    <TabsTrigger className={className} value="history">HISTORY</TabsTrigger>
                </TabsList>
                <TabsContent value="current">
                     {/* get data and map */}
                    <CampaignCard buttonLabel={"CLAIM REWARDS"} campaignData={fakecampaignClaimData} actionBtn={()=> handleClaimReward}/>
                </TabsContent>

                <TabsContent value="history">
                {/* get data and map */}
                {/* <CampaignCard type={"contribute"} campaignData={fakecampaignData} actionBtn={()=> handleClaimReward}/> */}
                </TabsContent>
            </Tabs>
        </div>
    );
  };
  
  export default MyCampaigns;
