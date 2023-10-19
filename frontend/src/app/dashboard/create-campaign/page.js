'use client'

import React, { useState } from "react";
import { useStepper } from "headless-stepper";
import SwitchForms from "@/app/dashboard/create-campaign/_SwitchForm";

const Stepper = () => {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        links: '',
        kpi: '',
        reward: '',
      })

      const handleInputChange = (event) => {
        const { name, value } = event.target
        console.log("form data  =>>", "name:",name  , "value:",value)
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }))
      }

      const handleSubmit = () => {
        // submission logic here using formData
        console.log('Form submitted:', formData);
        // Reset the form and navigate to my campaigns page
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
      </div>

    </>
  )
}

export default Stepper
