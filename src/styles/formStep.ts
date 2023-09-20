import { styled } from "styled-components";

export const Field = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-between;
  border: none;
  width: 100%;
  .input,
  select {
    width: 100%;
    height: 30px;
    background: white;
    color: gray;
    padding-left: 5px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
  }
  .text-area {
    width: 100%;
    height: 150px;
    background: white;
    color: gray;
    padding-left: 5px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
  }

  .error {
    color: red;
    font-size: small;
  }
`;

export const Input = styled.div``;

export const FormContainer = styled.div`
  width: 100%;
  .step-3-form {
    border: 1px solid white;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
`;

export const SelectForm = styled.div`
  width: 100%;
  height: 30px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  border-radius: 4px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

export const Plus = styled.button`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 30px;
  justify-content: center;
  text-align: center;
  align-items: center;
  color: white;
  background-color: #6495ed;
  border-radius: 4px;
  border: 1px solid #427af4;
  .a-download {
    color: white;
  }
`;

export const Sub = styled.button`
  display: flex;
  width: 50px;
  height: 30px;
  justify-content: center;
  text-align: right;
  align-items: center;
  background-color: #f08080;
  color: white;
  border-radius: 4px;
  border: 1px solid red;
`;

export const InputLink = styled(Field)`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  gap: 8px;
`;

export const SubStep3 = styled(Sub)`
  width: 20%;
  justify-self: end;
`;
