import { useDispatch,useSelector } from "react-redux";
import { ItemList } from "../list/CreateSurveyList";
import { SurveyTextInput } from "../part/CreateSurveyInput";
import { useState } from "react";
import { Add_item } from "./CreateSurveyAddDelItem";
import style from "../css/CreateSurvey.module.css"
import React from "react";
import CreateSurveyCheckbox from "../part/CreateSurveyCheckbox";

export function Multi(props){
    const data=props.data
    const dispatch=useDispatch()
    const ans=useSelector(state => state.createsurvey.ans_list.filter(t=>t.rootid===data.rootid))
    const cho=useSelector(state => state.createsurvey.choice_list.filter(t=>t.rootid===data.rootid))
    const cho_type=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===data.id)[0]["type"]["choice_type"])
    return (
        <div className={style.column_body}>
            {
                data.mode===1 && <div className={style.row_container}>
                    <CreateSurveyCheckbox 
                        text={"단일 선택형"} 
                        checked={!cho_type}
                        onChange={()=>{
                            dispatch({
                                type:"set_choice_type",
                                id:data.id,
                                value:0
                            })
                        }}
                    />
                    <CreateSurveyCheckbox 
                        text={"중복 선택형"} 
                        checked={cho_type}
                        onChange={()=>{
                            dispatch({
                                type:"set_choice_type",
                                id:data.id,
                                value:1
                            })
                        }}
                    />
                </div>
            }
            <div className={style.column_container}>
                <div className={style.column_container}>
                    <ItemList
                        rootid={data.rootid}
                        mode={data.mode}
                        type={"ans"}
                    />
                    {
                        data.mode===1 &&
                        <Add_item 
                            name={"문항"} 
                            type={"add_ans"} 
                            state={ans}
                            data={data}
                        />
                    }
                </div>
                {
                    props.type==="grid" && data.mode===1 && <div className={style.column_container}>
                        <ItemList
                            rootid={data.rootid}
                            mode={data.mode}
                            type={"cho"}
                        />
                        <Add_item 
                            name={"선택지"} 
                            type={"add_choice"} 
                            state={cho}
                            data={data}
                        />
                    </div>
                }
            </div>
        </div>
    );
}

function Getans(id){
    const ans=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===id)[0]["type"]["answer"])

    return ans
}

function Ans_mode_2(){
    var [_, setAns]=useState("")
    return [_, setAns]
}
function Ans_mode_else(){
    var [ans, setAns]=useState("")
    return [ans, setAns]
}

export function Writing(props){
    const data=props.data
    const dispatch=useDispatch()
    if(data.mode===2){
        var ans=Getans(data.id)
        var [_, setAns]=Ans_mode_2()
    }
    else if(data.mode===3){
        var ans=Getans(data.id)
    }
    else{
        var [ans, setAns]=Ans_mode_else()
    }
    return (
        data.mode!==1 && 
        <div className={style.row_body}>
            <p className={style.text_name}>답변 :&nbsp;</p>
            {
                data.mode===3 && <p className={style.text}
                    key={data.id}
                >{ans}</p>
            }
            {
                data.mode!==3 && <SurveyTextInput
                    value={ans}
                    onChange={(event) => {
                        if(data.mode===2){
                            setAns(event.target.value);
                            dispatch({
                                type:"edit_writing",
                                rootid:data.id,
                                value:event.target.value
                            })
                        }
                    }}
                    className={`ans${data.id}`}
                />
            }
            
        </div>
    );
}

export function SurveySlider(props){
    const dispatch=useDispatch()
    const ans=props.ans
    const setAns=props.setAns
    
    return <input 
        className={style.row_container}
        type="range"
        min="0" 
        max="100"
        value={ans}
        onChange={({ 
            target: { value: radius } }) => {
                if(props.mode===2){
                    setAns(radius);
                    dispatch({
                        type:props.type,
                        value:radius
                    })
                }
            }
        }
    />
}