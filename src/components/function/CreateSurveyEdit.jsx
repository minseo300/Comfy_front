import React from "react";
import { SurveyTextInput } from "../part/CreateSurveyInput";
import { useState,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectBox, Ques_data_list, Ques_tem_list } from "../list/CreateSurveyList";
import { Del_item } from "./CreateSurveyAddDelItem";
import style from "../css/CreateSurvey.module.css"
import { SurveySlider } from "./QuesTemplate";

const popover = {
    position: 'absolute',
    zIndex: '2',
  }
  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
  }

  

export function CreateIntroSurvey(props){
    const [_, setIntro] = useState("");
    const [__, setName] = useState("");
    const preview = props
    const [colorPicker,setColorPicker]=useState(false);
    const [hex, setHex] = useState("#fff");
    const [bgColorBtn,setBgColorBtn]=useState(true);
    
    const dispatch=useDispatch()
    const intro=useSelector(state => state.createsurvey)
    if(preview.pre!==0){
        return (
            <div className={style.column_body}>
                <div className={style.row_container}>
                    <p className={style.text_name}>설문지 제목 :&nbsp;</p>
                    <SurveyTextInput
                        value={intro.intro0}
                        onChange={(event) => {
                            setName(event.target.value);
                            dispatch({
                                type:"intro0",
                                value:event.target.value
                            })
                        }}
                        className="intro0"
                    />
                </div>
                <div className={style.row_container}>
                    <p className={style.text_name}>설문지 설명 :&nbsp;</p>
                    <SurveyTextInput
                        value={intro.intro1}
                        onChange={(event) => {
                            setIntro(event.target.value);
                            dispatch({
                                type:"intro1",
                                value:event.target.value
                            })
                        }}
                        className="intro1"
                    />
                </div>
                
            </div>
        );
    }
    else{
        return (
            <div className={style.column_body}>
                <div className={style.row_container}>
                    <p className={style.text_name}>설문지 제목 :&nbsp;</p>
                    <p className={style.text}>{intro.intro0}</p>
                </div>
                <div className={style.row_container}>
                    <p className={style.text_name}>설문지 설명 :&nbsp;</p>
                    <p className={style.text}>{intro.intro1}</p>
                </div>
                
            </div>
        );
    }
}

function Loadquesedit(id){
    const que=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===id)[0]["ques"])

    return que
}

function Loadansedit(rootid, id){
    const ans=useSelector(state => state.createsurvey.ans_list.filter(t=>t.rootid===rootid).filter(t=>t.id===id)[0]["value"])

    return ans
}

function Loadchoedit(rootid, id){
    const cho=useSelector(state => state.createsurvey.choice_list.filter(t=>t.rootid===rootid).filter(t=>t.id===id)[0]["value"])

    return cho
}
export function SurveyEdit(props){
    const rootid = props.rootid
    const id = props.id
    const [_, setValue]=useState("")

    const dispatch=useDispatch()
    const temid=useSelector(state => state.createsurvey.ques_list.filter(t=>t.id===rootid)[0]["type"]["id"])

    var que=false
    switch(props.type){
        case "ques":
            var val=Loadquesedit(id)
            var del="del_ques"
            var edit="edit_ques"
            var name="질문"
            var class_name=`que${rootid}`
            var color_style={backgroundColor:'#E0E0FF', borderColor:'#C0C0F0'}
            que=true
            break
        case "ans":
            var val=Loadansedit(rootid,id)
            var del="del_ans"
            var edit="edit_ans"
            var name="문항"
            var class_name=`que${rootid}ans${id}`
            var color_style={backgroundColor:'#E0F0E0', borderColor:'#C0E0C0'}
            break
        case "cho":
            var val=Loadchoedit(rootid,id)
            var del="del_choice"
            var edit="edit_cho"
            var name="선택지"
            var class_name=`que${rootid}cho${id}`
            var color_style={backgroundColor:'#E0F0E0', borderColor:'#C0E0C0'}
            break
    }

    return (
        <div className={style.column_border_container} style={color_style}>
            <div className={style.row_container}>
                {
                    que && <div className={style.column_body}>
                        <SelectBox 
                            id={rootid}
                            onChange={(event)=>{
                                dispatch({
                                    type:"change_ques_type",
                                    rootid:rootid,
                                    temid:event.target.value,
                                })
                            }}
                        />
                    </div>
                }
                {
                    que && <Del_item
                        name={name}
                        type={del}
                        id={id}
                    />
                }
            </div>
            <div className={style.row_container}>
                <div className={style.row_body}>
                    <p className={style.text_name}>{name} :&nbsp;</p>
                    <SurveyTextInput
                        value={val}
                        onChange={(event) => {
                            setValue(event.target.value);
                            dispatch({
                                type:edit,
                                rootid:rootid,
                                id:id,
                                value:event.target.value
                            })
                        }}
                        className={class_name}
                    />
                </div>
                {
                    !que && <Del_item
                        name={name}
                        type={del}
                        id={id}
                    />
                }
            </div>
            {que && <Ques_tem_list temid={temid || 0} rootid={rootid} id={id} mode={1}/>} 
        </div>
    );
}

function Getsatis(){
    const ans=useSelector(state => state.createsurvey.satis)

    return ans
}

function Ans_mode_2(){
    var [_, setAns]=useState(0)
    return [_, setAns]
}
function Ans_mode_else(){
    var [ans, setAns]=useState(0)
    return [ans, setAns]
}

export function Satisfaction(props){
    const data=props

    if(data.mode===2){
        var ans=Getsatis()
        var [_, setAns]=Ans_mode_2()
        var slider_style=style.slider_text
    }
    else if(data.mode===3){
        var ans=Getsatis();
        var slider_style=style.text
    }
    else{
        var [ans, setAns]=Ans_mode_else()
        var slider_style=style.slider_text
    }
    return(
        <div className={style.row_body}>
            <p className={style.text_name}>만족도 입력 :&nbsp;</p>
            {
                data.mode!==3 && <SurveySlider
                    ans={ans || 0}
                    setAns={setAns}
                    mode={data.mode}
                    type={"edit_satis"}
                />
            }
            <p className={slider_style}
                key={data.id}
            >{ans || 0}</p>
        </div>
    );
}