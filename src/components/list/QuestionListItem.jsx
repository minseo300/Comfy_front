import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ResponsivePie } from '@nivo/pie'
import {useSelector, useDispatch} from 'react-redux';
import SurveyService from '../../services/SurveyService';
import { getOption } from '../../modules/result';
import style from "../../css/CreateSurvey.module.css"
function QuestionListItem(props) {
    const question = props.questions;
    const value = props.value;
    const type = question.question.type;
    const { surveyId } = useParams();
    const options = useSelector(state => state.result.options);
    const dispatch = useDispatch();
    const answer_count = question.answer.length;
    const answer_options = [];
    
    useEffect(() => {
        if (type === "객관식_단일" && options.length === 0) {
            SurveyService.getQuestionOption(surveyId).then((res) => {
                dispatch(getOption(res.data.result));
            })
        }
    },[])


    const answer = () => {
        var array = [];
        if (type === "객관식_단일") {

            for (let i = 0; i < options.length; i++) {
                answer_options.push({ id: options[i].contents, value: 0 })
            }
            
            for (let i = 0; i < answer_count; i++) {
                for (let j = 0; j < options.length; j++) {
                    if (question.answer[i].option.id === options[j].id) {
                        answer_options[j].value++;
                        break;
                    }
                }
            }

            return (<div style={{ width: "50vw", height: "240px" }}>
                <ResponsivePie
                    data={
                        answer_options
                    }
                    margin={{ top: 40, left: 50, bottom: 40 }}
                    innerRadius={0.5}
                    padAngle={1.8}
                    cornerRadius={8}
                    // colors={['lightblue', 'lightgrey', 'lightyellow']}
                    borderWidth={2}
                    arcLinkLabelsSkipAngle={0}
                    arcLinkLabelsTextColor="#000000"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsSkipAngle={10}
                    theme={{
                        labels: {
                            text: {
                                fontSize: 12,
                                fill: '#000000',
                            },
                        },
                        legends: {
                            text: {
                                fontSize: 12,
                                fill: '#000000',
                            },
                        },
                    }}
                    legends={[
                        {
                            anchor: 'bottom', // 위치
                            direction: 'row', // item 그려지는 방향
                            justify: false, // 글씨, 색상간 간격 justify 적용 여부
                            translateX: 20, // chart와 X 간격
                            translateY: 40, // chart와 Y 간격
                            itemsSpacing: 0, // item간 간격
                            itemWidth: 100, // item width
                            itemHeight: 18, // item height
                            itemDirection: 'left-to-right', // item 내부에 그려지는 방향
                            itemOpacity: 1, // item opacity
                            symbolSize: 18, // symbol (색상 표기) 크기
                            symbolShape: 'circle', // symbol (색상 표기) 모양
                        }
                    ]}
                />
            </div>
            )
        } else if (type === "객관식_그리드_단일") {
            for (var i = 0; i < answer_count; i++) {
                array.push(<div style={{ margin: "20px", width: "50vw", textAlign: "center", justifyContent: "center" }}>{question.answer[i].option.contents}</div>)
            }
            return array;
        } else if (type === "만족도") {
            let sum = 0;
            for (var i = 0; i < answer_count; i++) {
                sum = sum + question.answer[i].satisfaction.percent;
            }
            array.push(<div style={{ margin: "20px", width: "50vw", textAlign: "center", justifyContent: "center" }}>{sum / answer_count}</div>)
            return array;
        } else { // 주관식
            for (var i = 0; i < answer_count; i++) {
                array.push(<div style={{ margin: "20px", width: "50vw", textAlign: "center", justifyContent: "center" }}>{question.answer[i].essay.contents}</div>)
            }
            return array;
        }
    }

    return (
        <div style={{ marginTop: "30px" }}>
            <h3>{parseInt(value) === question.question.id && question.question.contents}</h3>
            {parseInt(value) === question.question.id && answer()}
        </div>
    );
}

export default QuestionListItem;