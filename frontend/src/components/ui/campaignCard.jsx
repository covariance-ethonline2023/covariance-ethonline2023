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
      <Card className={`w-[825px] grid grid-cols-4 gap-4 place-items-center p-2 ${type === "contribute" && "hover:bg-gray-100 cursor-pointer"}`} onClick={handleCardClick}>
        <div className="flex flex-row items-center">
            <Image src={campaignData?.imgSrc} width={24} height={24} className="mx-1" />
            <div className="flex flex-col">
            <h1 className="font-bold grow">{campaignData?.name}</h1>
            <p className="text-sm">{campaignData?.duration}</p>
            </div>
        </div>
        <div className="">
            <CircularProgress progress={campaignData?.progress}/>
        </div>
        <div>
            <h1 className="font-bold">{campaignData?.amount}</h1>
            <p>{campaignData?.amountUnit}</p>
        </div>
        <div>
            <Button onClick={handleActionBtn}>
                {type === "contribute" ? "CONTRIBUTE" : "CLAIM REWARDS"}
            </Button>
        </div>
      </Card>
    )
  }