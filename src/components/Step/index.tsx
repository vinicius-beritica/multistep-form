import { StepCurrent } from "./styles";
import { PiNumberOne, PiNumberTwo, PiNumberThree } from "react-icons/pi";

export const Steps = ({ currentStep }) => {
  return (
    <StepCurrent>
      <div className="steps">
        <div className="step active">
          <PiNumberOne />
          <p>Dados Pessoais</p>
        </div>
        <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
          <PiNumberTwo />
          <p>Dados Técnicos</p>
        </div>
        <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
          <PiNumberThree />
          <p>Experiências</p>
        </div>
      </div>
    </StepCurrent>
  );
};
