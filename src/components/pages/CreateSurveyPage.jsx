import React from "react";
import style from "../css/CreateSurvey.module.css"
import { CreateSurveyHeader,CreateSurvey } from "../layer/CreateSurveyLayer";


export default function CreateSurveyPage(props){
    return (
        <div className={style.page}>
            
            <div id="mainBody" className={style.column_mainbody}>
                <CreateSurvey load={props.load}/>
            </div>
        </div>
        
    );
}