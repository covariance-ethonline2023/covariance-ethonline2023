import { Button } from "./button"
import { Card  } from "@/components/ui/card"
import Image from "next/image"
import { useContractRead } from 'wagmi';

export function Contributions ({ campaignId }) {
    const { data, isError, isLoading } = useContractRead({
        address: '0x650f12C2E55a156EDc5730A33059958aE35266b6',
        abi: [{
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_campaignId",
                    "type": "uint256"
                }
            ],
            "name": "campaignContributions",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "contributionId",
                            "type": "uint256"
                        },
                        {
                            "internalType": "address",
                            "name": "contributor",
                            "type": "address"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "campaignId",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "challengeIndex",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "amount",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct Contribution",
                            "name": "contribution",
                            "type": "tuple"
                        }
                    ],
                    "internalType": "struct ContributionInfo[]",
                    "name": "contribs",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "contribId",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "assertionId",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }],
        functionName: 'campaignContributions',
        args: [campaignId]
    })

    const mockdata = [{
        contributionId: 1,
        contributor: '0xEe87F4a569dF482D884863d49a33F59f1fD49983',
        contribution: {
            campaignId,
            challengeIndex: 0,
            amount: 1
        }
    }, {
        contributionId: 2,
        contributor: '0xb4a0eb942E35ed28BbafB06D106481f6c95566Ed',
        contribution: {
            campaignId,
            challengeIndex: 0,
            amount: 1
        }
    }]

    return (
        <div className="flex flex-col gap-y-2 items-stretch content-stretch">
            <h2 className="text-lg mt-2">Contributors</h2>
            {(data?.length ? data : mockdata).map(contrib =>
                <Card key={contrib.contributionId} className={`
                    min-w-[760px] max-w-[825px] flex items-center py-2 px-4 text-white
                    rounded-2xl bg-transparent border-2
                    border-appSecondary
                `}>
                    <Image alt="logo" src={`https://effigy.im/a/${contrib.contributor}.png`} className={`
                        mx-1 mr-4 rounded-full bg-appGlass
                        border-2 border-appSecondary flex-none
                        `} width={36} height={36} />
                    <h3 className="flex-1 font-medium grow">{contrib.contributor}</h3>
                    <Button onClick={() => {}} className={`
                        rounded-[2rem] p-1 pl-6 pr-6 bg-appGreenDark hover:bg-appGreenDark
                        whitespace-nowrap text-xs h-auto flex-none
                        `}>
                        APPROVE
                    </Button>
                </Card>
            )}
        </div>
    )
}
