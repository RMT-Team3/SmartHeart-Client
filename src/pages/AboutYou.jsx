import React, { useState } from "react";
import Description from "../components/Description";
import Gender from "../components/Gender";
import Interest from "../components/Interest";

export default function AboutYou() {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Description onNext={handleNext} />;
      case 2:
        return <Gender onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Interest onBack={handleBack} />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
