import { useDispatch } from "react-redux"
import { CreateSurveyButton } from "../button/CreateSurveyButton"
import React from "react";
import style from "../css/CreateSurvey.module.css"

export function Add_item(props){
    const dispatch=useDispatch()
    const state=props.state
    const data=props.data
    return (
        <div className={style.button_position}>
            <CreateSurveyButton
                title={props.name+" 추가"}
                onClick={()=>{
        
                    var id=0
                    if(state.length!==0){
                        id=state[state.length-1].id+1
                    }
                    console.log(state.length)
                    try{
                        dispatch({
                            type:`${props.type}`,
                            rootid:data.rootid
                        })
                    }
                    catch(e){
                        dispatch({
                            type:`${props.type}`
                        })
                    }
                }}
            />
        </div>
    )
}

export function Del_item(props){
    const dispatch=useDispatch()
    return (
        <div className={style.button_position}>
            <CreateSurveyButton
                title={props.name+" 삭제"}
                onClick={()=>{
                    dispatch({
                        type:props.type,
                        id:props.id,
                    })
                }}
            />
        </div>
    )
}