import React from "react";
import styled from "styled-components";

function CreateSurveyCheckbox(props) {
  const text=props.text
  const checked=props.checked
  const onChange=props.onChange
  return (
    <StyledLabel htmlFor={text}>
      <StyledInput type="checkbox" id={text} name={text} checked={checked} onChange={onChange}/>
      <StyledP>{text}</StyledP>
    </StyledLabel>
  );
}

export default CreateSurveyCheckbox;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
`;

const StyledP = styled.p`
  margin-left: 0.25rem;
`;
const StyledInput = styled.input`
  appearance: none;
  border: 1.5px solid grey;
  border-radius: 0.35rem;
  width: 1.5rem;
  height: 1.5rem;
  background-color: gainsboro;
  
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: limegreen;
  }
`;