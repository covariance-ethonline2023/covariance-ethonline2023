import { Card  } from "@/components/ui/card"
import CircularProgress from "./circularProgress"
import { Button } from "./button"
import Image from "next/image"

export function CampaignDetails ({
    campaign,
    onBack,
    button
}) {
    return (
        <div>
            <div onClick={onBack} className="mb-8 hover:cursor-pointer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.5"><path d="M12 8L8 12M8 12L12 16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></g></svg>
            </div>
            <div>
                <h1 className="font-medium text-white text-[2rem]">{campaign?.name}  </h1>
            </div>
            <div className="flex flow-row items-center gap-2 mt-4 mb-4">
                <Image alt="logo" src={campaign?.imgSrc} className={`
                    rounded-full bg-appGlass
                    border-2 border-appSecondary
                    `} width={32} height={32} />
                <p className="underline text-white text-lg">{campaign?.location}</p>
                {button?.label &&
                    <Button onClick={button.action} className={`
                        rounded-[2rem] p-1 pl-6 pr-6 bg-appGreenDark hover:bg-appGreenDark
                        whitespace-nowrap text-xs h-auto ml-8
                        `}>{button.label}</Button>
                }
            </div>
            <p className="text-white text-md">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    )
}
