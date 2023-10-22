import React from 'react';
import { Button } from './ui/button';
import FieldTextarea from './ui/FieldTextarea';
import FieldInput from './ui/FieldInput';

const KPIForm = ({ formData, onInputChange, onNext }) => {
  return (
    <div>
      <FieldInput name="initiator" value={formData.initiator} onChange={onInputChange} label="Initiator Address" placeholder="Initiator Address" />
      <FieldInput name="maxPoints" value={formData.maxPoints} onChange={onInputChange} label="Max Points" placeholder="Max Points" />

      {/* {formData.challenges.map((challenge, index) => ( */}
         {/* <div key={index}> */}
      <FieldTextarea name="challenges.kpi" value={formData.challenges[0].kpi} onChange={onInputChange} label="KPI" placeholder="Define the campaign KPI concisely"/>
      <FieldInput name="challenges.points" value={formData.challenges[0].points} onChange={onInputChange} label="Points" placeholder="Points" />
      <FieldInput name="challenges.maxContributions" value={formData.challenges[0].maxContributions} onChange={onInputChange} label="Max Contributions" placeholder="Max Contributions" />
      <FieldInput name="challenges.contributionsSpent" value={formData.challenges[0].contributionsSpent} onChange={onInputChange} label="Contributions Spent" placeholder="Contributions Spent" />
      {/* </div> */}
      {/* ))} */}

      <Button onClick={onNext} className={"rounded-[2rem] p-1 pl-6 pr-6 bg-appGreenDark hover:bg-appGreenDark whitespace-nowrap text-xs h-auto ml-8"}>
        NEXT
      </Button>
    </div>
  )
}

export default KPIForm
