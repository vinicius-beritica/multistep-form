import * as Styled from "./styles";

interface StepFormProps {
  title: string;
  nextStep?: () => void;
  previousStep?: () => void;
  children: React.ReactNode;
}

export const StepForm = ({ title, children }: StepFormProps) => {
  return (
    <Styled.Container>
      <Styled.Title>{title}</Styled.Title>
      {children}
    </Styled.Container>
  );
};
