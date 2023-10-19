import React, { useState } from 'react';
import { Button } from './ui/button';
import FieldInput from './ui/FieldInput';
import FieldTextarea from './ui/FieldTextarea';

const CampaignDetailsForm = ({ formData, onInputChange, onNext }) => {
  return (
    <div>
      <FieldInput name="name" value={formData?.name} onChange={onInputChange} label="Campaign name" placeholder="Give your campaign a descriptive title"/>
      <FieldTextarea name="description" value={formData?.description} onChange={onInputChange} label="Describe" placeholder="Describe the campaign concisely"/>
      <FieldInput name="links" value={formData?.links} onChange={onInputChange} label="links" placeholder="Necessary URL’s that explain the campaign"/>
      <Button onClick={onNext} className={"rounded-[2rem] p-1 pl-6 pr-6 bg-appGreenDark hover:bg-appGreenDark whitespace-nowrap text-xs h-auto ml-8"}>
        NEXT
      </Button>
    </div>
  );
};

export default CampaignDetailsForm
