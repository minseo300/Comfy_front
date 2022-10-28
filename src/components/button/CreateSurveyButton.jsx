import React from "react";
import style from "../css/CreateSurvey.module.css"

export function CreateSurveyButton(props) {
    const { title, onClick } = props;

    return <button className={style.button} onClick={onClick}>{title || "button"}</button>;
}