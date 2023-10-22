'use client'
import React, { useState } from "react";
import { useStepper } from "headless-stepper";
import SwitchForms from "@/pages/dashboard/create-campaign/_SwitchForm";
import CovarianceHubABI from "../../../abi/CovarianceHubABI";

import { useContractWrite, useAccount, useConnect, usePrepareContractWrite } from 'wagmi';
import { goerli } from "wagmi/chains";



const Stepper = () => {
  // const [isClient, setIsClient] = useState(false)
 
  // useEffect(() => {
  //   setIsClient(true)
  // }, [])

  const [formData, setFormData] = useState({
    rewardAmount: '',
    rewardToken: '',
    initiator: '',
    title: '',
    ipfsCid: '',
    challenges: [
      {
        kpi: '',
        points: '',
        maxContributions: '',
        contributionsSpent: '0',
      },
    ],
    maxPoints: '',
      })

  const { address, isConnected, connector: activeConnector, isConnecting } = useAccount()
  const { connect, connectors, error, pendingConnector } = useConnect();
  console.log("address", address);
  console.log("isConnected", isConnected);

  const { data: writeFormData, isLoading: isSubmitting, write, error: createError } = useContractWrite(
    {
    address: "0x3895DDff1DAecC924c33645dd727f830D426b2E6",
    abi: [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "field",
            "type": "string"
          }
        ],
        "name": "InvalidContribution",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "InvalidStateTransition",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "NotAllowed",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "NotEnoughFundsInSafe",
        "type": "error"
      },
      {
        "inputs": [],
        "name": "SenderIsNotInitiator",
        "type": "error"
      },
      {
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
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "assertionByContribution",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "assertionId",
            "type": "bytes32"
          }
        ],
        "name": "assertionDisputedCallback",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "assertionId",
            "type": "bytes32"
          },
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "name": "assertionResolvedCallback",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "campaignById",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "rewardAmount",
            "type": "uint256"
          },
          {
            "internalType": "contract IERC20",
            "name": "rewardToken",
            "type": "address"
          },
          {
            "internalType": "contract Safe",
            "name": "initiator",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "title",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "ipfsCid",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "maxPoints",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
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
      },
      {
        "inputs": [
          {
            "internalType": "contract Safe",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "campaignsByAccount",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "ids",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
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
            "internalType": "struct Contribution[]",
            "name": "contributions",
            "type": "tuple[]"
          }
        ],
        "name": "contribute",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "contribId",
            "type": "uint256"
          }
        ],
        "name": "contribution",
        "outputs": [
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
            "name": "contrib",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "contributionByAssertion",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "contributionStatus",
        "outputs": [
          {
            "internalType": "enum Status",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "rewardAmount",
                "type": "uint256"
              },
              {
                "internalType": "contract IERC20",
                "name": "rewardToken",
                "type": "address"
              },
              {
                "internalType": "contract Safe",
                "name": "initiator",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "ipfsCid",
                "type": "string"
              },
              {
                "components": [
                  {
                    "internalType": "string",
                    "name": "kpi",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "points",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "maxContributions",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "contributionsSpent",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Challenge[]",
                "name": "challenges",
                "type": "tuple[]"
              },
              {
                "internalType": "uint256",
                "name": "maxPoints",
                "type": "uint256"
              }
            ],
            "internalType": "struct Campaign",
            "name": "campaign",
            "type": "tuple"
          }
        ],
        "name": "createCampaign",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "contributor",
            "type": "address"
          }
        ],
        "name": "getAccountContributions",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "contribs",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          }
        ],
        "name": "getCampaign",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "rewardAmount",
                "type": "uint256"
              },
              {
                "internalType": "contract IERC20",
                "name": "rewardToken",
                "type": "address"
              },
              {
                "internalType": "contract Safe",
                "name": "initiator",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "ipfsCid",
                "type": "string"
              },
              {
                "components": [
                  {
                    "internalType": "string",
                    "name": "kpi",
                    "type": "string"
                  },
                  {
                    "internalType": "uint256",
                    "name": "points",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "maxContributions",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "contributionsSpent",
                    "type": "uint256"
                  }
                ],
                "internalType": "struct Challenge[]",
                "name": "challenges",
                "type": "tuple[]"
              },
              {
                "internalType": "uint256",
                "name": "maxPoints",
                "type": "uint256"
              }
            ],
            "internalType": "struct Campaign",
            "name": "campaign",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "contract CovarianceSafePlugin",
            "name": "_plugin",
            "type": "address"
          }
        ],
        "name": "setPlugin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "contribId",
            "type": "uint256"
          }
        ],
        "name": "settle",
        "outputs": [
          {
            "internalType": "bool",
            "name": "isApproved",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    functionName: "createCampaign",
    chainId: goerli.id,
    args: [formData]
  });



  // const { data: writeFormData, isLoading: isSubmitting, write, error: createError } = useContractWrite(config);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [key, field] = name.split('.');
  
    if (key === 'challenges') {
      setFormData((prevData) => ({
        ...prevData,
        challenges: [{ ...prevData.challenges[0], [field]: value }],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    }
  };



  const handleSubmit =  () => {
    console.log('Form submitted:', formData);
    write({
      args: [formData],
      from: "0x3bc7087dd1514d36012a846B2f6079177909eC91",
    })
  }






  const steps = React.useMemo(
    () => [
      { label: "Campaign details" },
      { label: "Define KPI" },
      { label: "Deposit rewards" }
    ],
    []
  )
useStepper

  const { state, nextStep, stepperProps, stepsProps, progressProps } = useStepper({
    steps
  })

  const barSize = React.useMemo(
    () => Math.ceil((state.currentStep / (steps?.length - 1)) * 100),
    [state, steps]
  )

  return (
    <div suppressHydrationWarning>
      {/* <nav className="my-4 w-100 grid grid-cols-6 relative" {...stepperProps}>
        <ol className="col-span-full flex flex-row z-1">
          {stepsProps?.map((step, index) => (
            <li className="text-center flex-[1_0_auto]" key={index}>
              <a
                className="group flex flex-col items-center cursor-pointer focus:outline-0"
                {...step}
              >
                <span
                  className={`flex items-center justify-center bg-white text-black w-8 h-8 border border-full rounded-full group-focus:ring-2 group-focus:ring-offset-2 transition-colors ease-in-out ${
                    state?.currentStep === index
                      ? "bg-sky-500 text-white ring-2 ring-offset-2"
                      : ""
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  className={`${
                    state?.currentStep === index ? "font-bold" : ""
                  }`}
                >
                  
                </span>
              </a>
            </li>
          ))}
        </ol>
        <div
          style={{ gridColumn: "2 / 8" }}
          className="flex items-center flex-row top-4 right-16 relative border-0.5 bg-gray-300 z-[-1] pointer-events-none row-span-full w-full h-0.5"
          {...progressProps}
        >
          <span className="h-full w=full flex" />
          <div
            style={{
              width: `${barSize}%`,
              gridColumn: 1 / -1,
              gridRow: 1 / -1
            }}
            className="flex flex-row h-full overflow-hidden border-solid border-0 bg-sky-500"
          />
        </div>
      </nav> */}

        <div>
        {connectors
          .filter((x) => x.ready && x.id !== activeConnector?.id)
          .map((x) => (
            <button key={x.id} onClick={() => connect({ connector: x })}>
              {x.name}
              {isConnecting && x.id === pendingConnector?.id && ' (connecting)'}
            </button>
          ))}
        </div>

      <div>
        <SwitchForms step={state.currentStep} formData={formData} onInputChange={handleInputChange} onNext={nextStep} onSubmit={handleSubmit} />

        {isSubmitting && <h1>Please confirm the transaction on your wallet</h1>}
        {writeFormData && <h1>The transaction was sent! Here is the hash: {writeFormData.hash}</h1>}
        {createError && (
        <p>
          Calling that contract function will fail for this reason:
          {createError.reason ?? createError.message}
        </p>)}

      </div>

    </div>
  )
}

export default Stepper
