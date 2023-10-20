import React from 'react';
import { Button } from './ui/button';
import FieldInput from './ui/FieldInput';

const RewardForm = ({ formData, onInputChange, onSubmit }) => {
  return (
    <div>
      <FieldInput name="rewardAmount" value={formData?.rewardAmount} onChange={onInputChange} label="Total rewards" placeholder="Total rewards for this campaign in USDT"/>
      <Button onClick={onSubmit} className={"rounded-[2rem] p-1 pl-6 pr-6 bg-appGreenDark hover:bg-appGreenDark whitespace-nowrap text-xs h-auto ml-8"}>
        CREATE CAMPAIGN
      </Button>
    </div>
  )
}

export default RewardForm
