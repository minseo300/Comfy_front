import React, { useEffect } from "react";
import styled from "styled-components";
import { CreateSurveyButton } from "../button/CreateSurveyButton"
import { CreateIntroSurvey, Satisfaction } from "../function/CreateSurveyEdit";
import { useDispatch,useSelector } from "react-redux";
import { ItemList } from "../list/CreateSurveyList";
import { Add_item } from "../function/CreateSurveyAddDelItem";
import style from "../css/CreateSurvey.module.css"
import { Await, useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { SurveyTextInput } from "../part/CreateSurveyInput";
import { useState } from "react";
import { share_domain, spring_domain } from "../../App";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import getDate from "date-fns/getDate";
import ReactDatePicker from "react-datepicker";
import 'react-calendar/dist/Calendar.css';
import "react-datepicker/dist/react-datepicker.css";
import { postSurveyThumbnail } from "../../services/SurveyService";

function Shareurl(){
    const navigate = useNavigate();
    const state=useSelector(state => state.createsurvey);
    const st=useSelector(state => state.createsurvey.shareurl_modal);
    const dispatch = useDispatch();
    const [Id, setId] = useState();
    const surveyId=Id;
    const loc=useLocation();
    if(state.load_shareurl){
        dispatch({
            type:"load_shareurl",
            value:false
        })
        const email=localStorage.getItem('email');
        //editSurvey/1/a@gmail.com //createSurvey/a@gmail.com
        Axios.post(`${spring_domain}${loc.pathname}/${email}`, state).then(response=>{
            setId(response.data.result);
            const surveyId=response.data.result;
            postSurveyThumbnail(surveyId);
        })
    }
    if(st){
        return (
            <div className={style.createsurvey_modal}>
                <div className={style.row_container}>
                    <CreateSurveyButton
                        className={style.button} 
                        title={"닫기"}
                        onClick={()=>{
                            dispatch({
                                type:"shareurl_modal",
                                value:false
                            })
                            navigate(`/manage`)
                        }}
                    />
                </div>
                <div className={style.row_container}>
                    <p className={style.text_name}>배포 주소 :&nbsp;</p>
                    <p className={style.text}>{share_domain}/respondentSurvey/{surveyId}</p>
                </div>
            </div>
        )
    }
    return <div></div>
}
function SetEndtime(){
    const endtime_modal=useSelector(state => state.createsurvey.setendtime_modal);
    const dispatch = useDispatch();
    const [endDate, setEndDate] = useState(null);

    const onChange = (dates) => {
        const [start, end] = dates;
        setEndDate(end);
    };

    var endyear=getYear(endDate);
    var endmonth=getMonth(endDate)+1;
    var endday=getDate(endDate);

    if(endmonth<10){
        endmonth='0'+endmonth
    }
    if(endday<10){
        endday='0'+endday
    }

    if(endtime_modal){
        return (
            <div className={style.createsurvey_modal}>
                <div className={style.row_container}>
                    <CreateSurveyButton
                        className={style.button} 
                        title={"닫기"}
                        onClick={()=>{
                            dispatch({
                                type:"setendtime_modal",
                                value:false
                            })
                        }}
                    />
                    <CreateSurveyButton
                        className={style.button} 
                        title={"배포"}
                        onClick={()=>{
                            dispatch({
                                type:"load_shareurl",
                                value:true
                            })
                            dispatch({
                                type:"endtime",
                                value:`${endyear}-${endmonth}-${endday}`
                            })
                            dispatch({
                                type:"setendtime_modal",
                                value:false
                            })
                            dispatch({
                                type:"shareurl_modal",
                                value:true
                            })
                        }}
                    />
                </div>
                <ReactDatePicker
                    selected={new Date()}
                    onChange={onChange}
                    startDate={new Date()}
                    endDate={endDate}
                    dateFormat="YYYY-MM-DD"
                    selectsRange
                    inline
                    placeholderText="기한을 설정해주세요"
                />
            </div>
        )
    }
    return <div></div>
}

function CreateSurveySend() {
    const state=useSelector(state => state.createsurvey);
    const serverload=useSelector(state => state.createsurvey.serverload)
    const loc=useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const email=localStorage.getItem('email');
    return (
        <div className={style.row_container}>
            <CreateSurveyButton
                title="임시저장"
                onClick={()=>{
                    console.log(loc.pathname)
                    state["endtime"]="not"
                    if(!serverload){
                        Axios.post(`${spring_domain}${loc.pathname}/${email}`, state)//createSurvey/a@gmail.com
                        .then((response)=>{
                            console.log('response',response);
                            console.log('response data',response.data);
                            const surveyId=response.data.result;
                            console.log('after post survey: surveyId - ',surveyId);
                            postSurveyThumbnail(surveyId);
                        })
                       
                    }
                    else{
                        Axios.post(`${spring_domain}${loc.pathname}/${email}`, state)//editSurvey/1/a@gmail.com
                    }
                    navigate(`/`)
                }}
            />
            <CreateSurveyButton
                title="배포"
                onClick={()=>{
                    dispatch({
                        type:"setendtime_modal",
                        value:true
                    })
                }}
            />
            <SetEndtime />
            <Shareurl />
        </div>
    );
};


export function CreateSurvey(props){  //createSurvey/a@gmail.com
    const serverload=useSelector(state => state.createsurvey.serverload)
    const dispatch = useDispatch();
    const loc=useLocation();
    if(props.load==="yes" && !serverload){
        const email=localStorage.getItem('email');

        if(loc.pathname==="/createSurvey"){
            var value=loc.pathname+"/"+email
        }
        else{
            var value=loc.pathname//editSurvey/1
        }
        Axios.get(`${spring_domain}${value}`).then(response=>{ //editSurvey/1
            dispatch({
                type:"loadfromserver",
                value:response.data.result
            })
        });
    }

    const queslist=useSelector(state => state.createsurvey.ques_list);
    console.log('queslist',queslist);
    return (
        <div className={style.row_mainbody}>
            <div className={style.column_body}>
                <div className={style.row_border_container} style={{backgroundColor:'#FFF0F0', borderColor:'#F0E0E0'}}>
                    <CreateIntroSurvey pre={1}/>
                </div>
                <div className={style.row_container}>
                    <ItemList
                        state={queslist}
                        mode={1}
                        type={"ques"}
                    />
                </div>
                <div className={style.row_container}>
                    <Add_item
                        name={"질문"} 
                        type={"add_ques"} 
                        state={queslist}
                    />
                </div>
            </div>
            <div className={style.column_body}>
                <div className={style.row_border_container} style={{backgroundColor:'#FFF0F0', borderColor:'#F0E0E0'}}>
                    <CreateIntroSurvey pre={0}/>
                </div>
                <div className={style.row_container}>
                    <ItemList
                        state={queslist}
                        mode={0}
                        type={"ques"}
                    />
                </div>
                <div className={style.row_border_container} style={{backgroundColor:'#FFFFE0', borderColor:'#F0F0D0'}}>
                    <Satisfaction mode={0}/>
                </div>
                <div className={style.button_position}>
                    <CreateSurveySend/>
                </div>
                
            </div>
        </div>
    );
}