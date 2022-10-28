import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { spring_domain } from "../../App";
import style from "../css/CreateSurvey.module.css"
import { CreateSurveyButton } from "../button/CreateSurveyButton";
import { CreateIntroSurvey, Satisfaction } from "../function/CreateSurveyEdit";
import { CreateSurveyHeader,CreateSurvey } from "../layer/CreateSurveyLayer";
import { ItemList } from "../list/CreateSurveyList";

export default function RespondentSurveyLayer(props){
    const dispatch=useDispatch();
    const state=useSelector(state => state.createsurvey);
    const loc=useLocation();
    const navigate=useNavigate()
    if(!state.serverload){
        if(props.mode===3){
            axios.get(`${spring_domain}${loc.pathname}`).then(response=>{ //answerSurvey/surveyid/submitid
                dispatch({
                    type:"loadfromserver",
                    value:response.data.result
                })
            });
        }
        else{
            axios.get(`${spring_domain}${loc.pathname}`).then(response=>{ //respondentSurvey/1
                dispatch({
                    type:"loadfromserver",
                    value:response.data.result
                })
            });
        }
    }

    const queslist=useSelector(state => state.createsurvey.ques_list);
    return (
        <div className={style.row_mainbody}>
            <div className={style.column_body}>
                <div className={style.row_border_container} style={{backgroundColor:'#FFF0F0', borderColor:'#F0E0E0'}}>
                    <CreateIntroSurvey pre={0}/>
                </div>
                <div className={style.row_container}>
                    <ItemList
                        state={queslist}
                        mode={props.mode}
                        type={"ques"}
                    />
                </div>
                <div className={style.row_border_container} style={{backgroundColor:'#FFFFE0', borderColor:'#F0F0D0'}}>
                    <Satisfaction mode={props.mode}/>
                </div>
                {
                    props.mode!==3 && <div className={style.button_position}>
                        <CreateSurveyButton
                            className={style.button}
                            title={"완료"}
                            onClick={()=>{
                                axios.post(`${spring_domain}${loc.pathname}`, state).then(
                                    navigate('/respondentComplete')
                                )//respondentSurvey/1
                            }}
                        />
                    </div>
                }
            </div>
        </div>
    );
}