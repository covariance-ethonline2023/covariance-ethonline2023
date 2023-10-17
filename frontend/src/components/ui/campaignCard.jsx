import { Card  } from "@/components/ui/card"
import CircularProgress from "./circularProgress"
import { Button } from "./button"
import Image from "next/image"

  export function CampaignCard({campaignData, actionBtn, type, onCardClick}) {


    const handleCardClick = () => {
        onCardClick(campaignData);
      };

    const handleActionBtn = () => {
    actionBtn(campaignData);
    };

    return (
      <Card className={`
          max-w-[825px] grid grid-cols-12 gap-4 p-2 text-white
          rounded-2xl bg-transparent border-2
          border-appSecondary
      `} onClick={handleCardClick}>
        <div className="col-span-5 flex flex-row justify-start items-center">
            <Image src={campaignData?.imgSrc} className={`
                mx-1 ml-4 mr-4 rounded-full bg-appGlass
                border-2 border-appSecondary
            `} width={36} height={36} />
            <div className="flex flex-col">
            <h3 className="font-medium grow">{campaignData?.name}</h3>
            <p className="text-xs text-gray-400">{campaignData?.duration}</p>
            </div>
        </div>
        <div className="col-span-2 text-md font-bold flex flex-col items-center justify-center">
            {campaignData?.progress}%
            <span className="box-content border-[1px] border-appSecondary rounded-md relative h-2 w-full bg-appGlass overflow-hidden">
                <span className={`rounded-md absolute t-0 l-0 inline-block h-2 bg-appGreen`} style={{width:`${campaignData?.progress}%`}}>
                </span>
            </span>
        </div>
        <div className="col-span-2 flex flex-col items-center justify-center">
            <h3 className="text-appGreen font-bold">{campaignData?.amount}</h3>
            <p className="text-xs">Reward pool</p>
        </div>
        <div className="col-span-3 flex items-center justify-center">
            <Button onClick={handleActionBtn} className={`
                rounded-[2rem] p-1 pl-6 pr-6 bg-appGreenDark hover:bg-appGreenDark
                whitespace-nowrap text-xs h-auto
            `}>
                {type === "contribute" ? "CONTRIBUTE" : "CLAIM REWARDS"}
            </Button>
        </div>
      </Card>
    )
  }
