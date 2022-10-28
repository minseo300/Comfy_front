import Axios from "axios";
import React from "react";
import style from "../css/CreateSurvey.module.css"
import RespondentSurveyLayer from "../layer/RespondentSurveyLayer";
;

export default function RespondentSurveyPage(props){
    return (
        <div className={style.page}>
            <div className={style.sidebar}>
                
            </div>
            <div className={style.column_mainbody}>
                <RespondentSurveyLayer mode={props.mode || 2}/>
            </div>
        </div>
    );
}

export function RespondentComplete(){
    return (
        <div className={style.page}>
            <div className={style.sidebar}>
            </div>
            <div className={style.column_mainbody}>
                <div className={style.text_name}>Finish!</div>
            </div>
        </div>
    );
}