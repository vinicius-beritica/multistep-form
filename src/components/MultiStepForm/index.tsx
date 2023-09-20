import { useState } from "react";
import { FormStepOne } from "../FormStepOne";
import { FormStepTwo } from "../FormStepTwo";
import { FormStepThree } from "../FormStepThree";
import { Download } from "../Download";
import { Steps } from "../../components/Step";

const initialValues = {
  id: 0,
  name: "",
  email: "",
  birthdate: "",
  phone: "",
  role: "",
  bio: "",
  links: [""],
  state: "",
  city: "",
  tech: [0],
  abilities: [0],
  softskills: [0],
  experience: "",
  experiences: [
    {
      id: 0,
      title: "",
      company_name: "",
      start_date: "",
      end_date: "",
      function_performed: "",
    },
  ],
  experience_educational: [
    {
      id: 0,
      title_academy: "",
      institution: "",
      link: [""],
      start_date_academy: "",
      end_date_academy: "",
    },
  ],
};

export const MultiStepForm = () => {
  const [data, setData] = useState(initialValues);
  const [currentStep, setCurrentStep] = useState(0);

  const makeRequest = (formData) => {
    console.log("Envio", formData);
  };

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));

    if (final) {
      makeRequest(newData);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <FormStepOne next={handleNextStep} data={data} />,
    <FormStepTwo next={handleNextStep} prev={handlePrevStep} data={data} />,
    <FormStepThree next={handleNextStep} prev={handlePrevStep} data={data} />,
    <Download data={data} />,
  ];

  return (
    <div>
      {currentStep <= 2 && <Steps currentStep={currentStep} />}
      {steps[currentStep]}
    </div>
  );
};
