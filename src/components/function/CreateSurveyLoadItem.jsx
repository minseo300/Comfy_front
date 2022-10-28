import { useDispatch, useSelector } from "react-redux"
import { Ques_tem_list } from "../list/CreateSurveyList"
import style from "../css/CreateSurvey.module.css"
import React from "react";
import CreateSurveyCheckbox from "../part/CreateSurveyCheckbox";

function Loadquesitem(id){
    const ques=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===id)[0]["ques"])
    return ques
}

function Loadansitem(rootid,id){
    const ans=useSelector(state => state.createsurvey.ans_list.filter(t=>t.rootid===rootid).filter(t=>t.id===id)[0]["value"])

    return ans
}

function Loadchoitem(rootid,id){
    const cho=useSelector(state => state.createsurvey.choice_list.filter(t=>t.rootid===rootid).filter(t=>t.id===id)[0]["value"])

    return cho
}

function LoadcheckedType0(id, rootid){
    var answer=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===id)[0]["type"]["choice_value"].filter(t=>t.rootid===rootid)[0])
    return answer
}

function LoadcheckedType1(id, rootid,selid){
    var answer=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===id)[0]["type"]["choice_value"].filter(t=>t.rootid===rootid).filter(t=>t.selectid===selid)[0])
    return answer
}

function Loadcheckedvalue(id,rootid,selid){
    const cho_type=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===id)[0]["type"]["choice_type"])
    if(cho_type===0){
        var answer=LoadcheckedType0(id,rootid)
    }
    else{
        var answer=LoadcheckedType1(id,rootid,selid)
    }
    try{
        return answer.selectid
    }
    catch(e){
        return -1
    }
    
}
export function LoadItem(props){
    const rootid=props.rootid
    const id=props.id
    const dispatch=useDispatch()
    const state=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===rootid)[0]["type"])
    const ques_type=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===rootid)[0]["type"]["name"])

    var que=false
    var cho=false
    var ans=true
    if(ques_type==="객관식 Grid"){
        cho=true
    }
    switch(props.type){
        case "ques":
            var value=Loadquesitem(id)
            var typename="질문"
            que=true
            var classname=style.column_border_container
            var color_style={backgroundColor:'#E0E0FF', borderColor:'#C0C0F0'}
            break
        case "ans":
            var value=Loadansitem(rootid,id)
            var answer=Loadcheckedvalue(rootid,rootid,id)
            var typename="문항"
            var checked_id=props.id
            var classname=style.column_container
            if(cho){
                ans=false
            }
            break;
        case "cho":
            var value=Loadchoitem(rootid,id)
            var answer=Loadcheckedvalue(rootid,props.ansid,id)
            var typename="선택지"
            var checked_id=props.id
            var classname=style.column_container
            break
    }
    return (
        <div className={classname} style={color_style}>
            <div className={style.row_body}>
                <p className={style.text_name}>{typename} :&nbsp;</p>
                <p className={style.text}
                    key={id}
                >{value}</p>
                {!que && ans && <CreateSurveyCheckbox
                    checked={answer===checked_id}
                    onChange={()=>{
                        if(props.mode===2){
                            dispatch({
                                type:"choice_checked",
                                id:id,
                                rootid:rootid,
                                ansid:props.ansid,
                                value:checked_id
                            })
                        }
                        
                    }}
                />}
            </div>
            {que && <Ques_tem_list temid={state.id || 0} rootid={rootid} id={props.id} mode={props.mode}/>}
        </div>
    );
}