"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CampaignCard } from "@/components/ui/campaignCard";


const MyCampaigns = () => {

    const handleClaimReward = () => { }

    const fakecampaignClaimData={name: "Binance", duration:"Dec 12th - Dec 29th", progress: 60, amount: "$5000", amountUnit: "$5/KPI", }

    return (
        <div>
            <Tabs defaultValue="current" className="w-[400px]">
            <TabsList>
                <TabsTrigger value="current">CURRENT</TabsTrigger>
                <TabsTrigger value="history">HISTORY</TabsTrigger>
            </TabsList>
            <TabsContent value="current">
                 {/* get data and map */}
                <CampaignCard type={"claim"} campaignData={fakecampaignClaimData} actionBtn={()=> handleClaimReward}/>
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