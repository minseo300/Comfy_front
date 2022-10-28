import React from "react";
import { Satisfaction, SurveyEdit } from "../function/CreateSurveyEdit";
import { Multi, Writing } from "../function/QuesTemplate";
import { useSelector } from "react-redux";
import { LoadItem } from "../function/CreateSurveyLoadItem";
import style from "../css/CreateSurvey.module.css"


export function Ques_data_list(){
    return [
        {
            "id":0,
            "name":"선택",
        },
        {
            "id":1,
            "name":"객관식",
            "choice_type":0,
            "choice_value":[]
        },
        {
            "id":2,
            "name":"객관식 Grid",
            "choice_type":0,
            "choice_value":[]
        },
        {
            "id":3,
            "name":"주관식",
            "answer":"",
        },
        {
            "id":4,
            "name":"선형 배율",
            "answer":"",
        },
        {
            "id":5,
            "name":"파일 업로드",
            "file_list":[],
        }
    ]
}

export function Ans_data_list(props){
    return [
        {   //기본
            "temid":0,
            "rootid":props.rootid, //root는 질문
            "id":props.id,
            "value":"",
        },
        {   //객관식 중복 선택
            "temid":1,
            "rootid":props.rootid,
            "selectid":props.selectid,
            "id":props.id
        },
        {   //파일 업로드
            "temid":2,
            "rootid":props.rootid,
            "id":props.id,
            "name":"",
            "path":""
        }
    ]
}

export function Ques_tem_list(props){
    const tem = props;
    switch(tem.temid){
        case 1:
            return (
                <Multi data={tem} type={"not_grid"}/> 
            ); 
        case 2:
            console.log(tem.mode)
            return (
                <Multi data={tem} type={"grid"}/> 
            ); 
        case 3:
            return (
                <Writing data={tem}/> 
            ); 
        case 4:
            return (
                <Multi data={tem}/> 
            ); 
        case 5:
            return (
                <Multi data={tem}/> 
            ); 
    }
    return <div></div>
}

function Loadquesitem(){
    const ques=useSelector(state => state.createsurvey.ques_list)

    return ques
}

function Loadansitem(rootid){
    const ans=useSelector(state => state.createsurvey.ans_list.filter(t=>t.rootid===rootid))

    return ans
}

function Loadchoitem(rootid){
    const cho=useSelector(state => state.createsurvey.choice_list.filter(t=>t.rootid===rootid))

    return cho
}

export function ItemList(props){
    var que=false

    switch(props.type){
        case "ques":
            var statelist=Loadquesitem()
            var key="Q"
            var classname=style.column_container
            que=true
            break
        case "ans":
            var statelist=Loadansitem(props.rootid)
            var chos=Loadchoitem(props.rootid,props.id)
            var key="A"
            if(chos!==undefined){
                var classname=style.column_border_container
                var color_style={backgroundColor:'#E0F0E0', borderColor:'#C0E0C0'}
            }
            else{
                var classname=style.column_container
                var color_style={}
            }
            break
        case "cho":
            var statelist=Loadchoitem(props.rootid)
            var key="C"
            var classname=style.column_border_container
            break
    }
    return (
        <div className={style.column_container}>
            {
                statelist.map(state => {
                    if(props.mode===1){
                        return (
                            <SurveyEdit
                                key={key+state.id}
                                rootid={que ? state.id:props.rootid}
                                id={state.id}
                                type={props.type}
                            />
                        );
                    }
                    else{
                        return (
                            <div className={classname} style={color_style}>
                                <LoadItem
                                    key={key+state.id}
                                    rootid={que ? state.id:props.rootid}
                                    id={state.id}
                                    type={props.type}
                                    mode={props.mode}
                                />
                                {
                                    props.mode!==1 && props.type==="ans" && chos!==undefined && 
                                    <div className={style.column_body}>
                                        <div className={style.column_container}>
                                            {
                                                chos.map(cho=>{
                                                    return (
                                                        <LoadItem
                                                            key={key+state.id+"C"+cho.id}
                                                            rootid={props.rootid}
                                                            ansid={state.id}
                                                            id={cho.id}
                                                            type={"cho"}
                                                            mode={props.mode}
                                                        />
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        );
                    }
                })
            }
        </div>
    );
}

export function SelectBox(props) {
    const { onChange, id } = props;
    
    const type=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===id)[0]["type"])
    var choice_id=0
    if(type.id!==undefined){
        choice_id=type.id
    }
    return (
        <select onChange={onChange} defaultValue={Ques_data_list()[choice_id].id}>
            {Ques_data_list().map((option)=>(
                <option key={option.id} value={option.id} >
                    {option.name}
                </option>
            ))}
        </select>
    );
}