import React from 'react';
import CampaignDetailsForm from '@/components/campaignDetailsForm';
import KPIForm from '@/components/kpiForm';
import RewardForm from '@/components/RewardForm';

const SwitchForms = ({ step, formData, onInputChange, onNext, onSubmit }) => {
  switch (step) {
    case 0:
      return <CampaignDetailsForm formData={formData} onInputChange={onInputChange} onNext={onNext} />
    case 1:
      return <KPIForm formData={formData} onInputChange={onInputChange} onNext={onNext} />
    case 2:
      return <RewardForm formData={formData} onInputChange={onInputChange} onSubmit={onSubmit} />
    default:
      return null
  }
}

export default SwitchForms
