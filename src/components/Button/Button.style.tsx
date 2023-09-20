import styled from "styled-components";

export const ButtonAction = styled.button`
  background-color: ${(props) => (props.disabled ? "gray" : "#427af4")};
  padding: 4px;
  color: #ffff;
  margin: 15px 0px 5px 0px;
  cursor: pointer;
  width: 100px;
  text-align: center;
  border-radius: 5px;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

export const ButtonBackAction = styled(ButtonAction)`
  background-color: white;
  border: 2px solid #427af4;
  color: #427af4;
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  gap: 12px;
`;
