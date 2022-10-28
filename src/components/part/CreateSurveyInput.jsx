import style from "../css/CreateSurvey.module.css"
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
    width: 100%;
    ${(props) =>
        props.height ?
        `height: ${props.height}px;` : `height:40px;`}
    font-size: 16px;
    line-height: 16px;
    resize:none;
    border:1px solid lightgrey;
    overflow:hidden;
    padding:6px 0px 0px 0px;
`;

export function SurveyTextInput(props) {
    const { height, value, onChange, className } = props;

    const autoResize = (e) => {
        let textarea = document.querySelector(`.${className}`);
      
        if (textarea) {
          textarea.style.height = 'auto';
          let height = textarea.scrollHeight; // 높이
          textarea.style.height = `${height}px`;
        }
      };

    return <StyledTextarea 
            height={height} 
            value={value} 
            className={className}
            onChange={onChange} 
            onKeyDown={autoResize}
            onKeyUp={autoResize}
        />;
}