'use client'

import React, { useState } from "react";
import { useStepper } from "headless-stepper";
import SwitchForms from "@/app/dashboard/create-campaign/_SwitchForm";
import CovarianceHubABI from "../../../abi/CovarianceHubABI";

import { useContractWrite, useAccount } from 'wagmi';



const Stepper = () => {
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

  const { address, isConnected } = useAccount()
  console.log("address", address);
  console.log("isConnected", isConnected);

  const { data: writeFormData, isLoading: isSubmitting, write: create, error: createError } = useContractWrite(
    {
    address: process.env.COVARIANCEHUB_CONTRACT_ADDRESS,
    abi: CovarianceHubABI,
    functionName: "createCampaign",
  });


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
    create({args: ["0xf036f3f9e58cB13D85022E7926D14Acdc63f763E", formData]})
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
    <>
      <nav className="my-4 w-100 grid grid-cols-6 relative" {...stepperProps}>
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
      </nav>

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

    </>
  )
}

export default Stepper
