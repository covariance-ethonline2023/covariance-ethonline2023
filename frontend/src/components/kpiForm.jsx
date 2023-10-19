import React from 'react';
import { Button } from './ui/button';
import FieldTextarea from './ui/FieldTextarea';

const KPIForm = ({ formData, onInputChange, onNext }) => {
  return (
    <div>
      <FieldTextarea name="kpi" value={formData?.kpi} onChange={onInputChange} label="KPI" placeholder="Define the campaign KPI concisely"/>
      <Button onClick={onNext} className={"rounded-[2rem] p-1 pl-6 pr-6 bg-appGreenDark hover:bg-appGreenDark whitespace-nowrap text-xs h-auto ml-8"}>
        NEXT
      </Button>
    </div>
  )
}

export default KPIForm
