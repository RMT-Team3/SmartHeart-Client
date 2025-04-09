import React, { useState } from "react";
import Description from "../components/Description";
import Gender from "../components/Gender";
import Interest from "../components/Interest";
import { useNavigate } from "react-router";
import http from "../http";
import Swal from "sweetalert2";

export default function AboutYou() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    imageUrl: "",
    personalities: "",
    gender: "",
    interests: "",
  });

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleDataChange = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  const handleFinalSubmit = async (interests) => {
    const finalData = { ...formData, interests };
    setFormData(finalData);
    try {
      await http({
        method: "PUT",
        url: "/update",
        data: finalData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      navigate("/profile");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Description
            onNext={(data) => {
              handleDataChange(data);
              handleNext();
            }}
          />
        );
      case 2:
        return (
          <Gender
            onNext={(gender) => {
              handleDataChange({ gender });
              handleNext();
            }}
            onBack={handleBack}
          />
        );
      case 3:
        return <Interest onBack={handleBack} onSubmit={handleFinalSubmit} />;
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
