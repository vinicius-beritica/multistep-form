import { styled } from "styled-components";

export const StepCurrent = styled.div`
  .steps {
    display: flex;
    gap: 4rem;
    justify-content: center;
    align-items: center;
    amx-width: 500px;
    margin: 0 auto;
    position: relative;
    margin-bottom: 2rem;
  }

  .steps::after {
    content: "";
    width: 380px;
    border-bottom: 1px solid #ccc;
    position: absolute;
    top: 20px;
  }

  .step {
    text-align: center;
    background-color: #f2f2f2;
    z-index: 1;
    width: 145px;
    padding: 0.5rem;
  }
  .step svg {
    font-size: 1.8rem;
    margin-bottom: 0.2rem;
    fill: #ccc;
  }

  .active > svg {
    fill: #427af4;
  }
  .active {
    font-weight: bold;
  }
`;
