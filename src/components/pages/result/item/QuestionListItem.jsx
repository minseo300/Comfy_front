import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ResponsivePie } from '@nivo/pie'
import {useSelector, useDispatch} from 'react-redux';
import SurveyService from '../../../../services/ResultService';
import {getOption} from '../../../../modules/result'

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
            SurveyService.getQuestionOption(surveyId, question.question.id).then((res) => {
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

            return (<div className="lg:h-80">
                <ResponsivePie
                    data={
                        answer_options
                    }
                    margin={{ top: 40, bottom: 80 }}
                    innerRadius={0.5}
                    padAngle={1.8}
                    cornerRadius={0}
                    // colors={['lightblue', 'lightgrey', 'lightyellow']}
                    borderWidth={1}
                    arcLinkLabelsSkipAngle={3}
                    arcLinkLabelsTextColor="#000000"
                    arcLinkLabelsThickness={1}
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
                            translateY: 60, // chart와 Y 간격
                            itemsSpacing: 10, // item간 간격
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
                array.push(<div className='m-1'>{question.answer[i].option.contents}</div>)
            }
            return array;
        } else if (type === "만족도") {
            let sum = 0;
            for (var i = 0; i < answer_count; i++) {
                sum = sum + question.answer[i].satisfaction.percent;
            }
            array.push(<div>{sum / answer_count}</div>)
            return array;
        } else { // 주관식
            for (var i = 0; i < answer_count; i++) {
                array.push(<div className='m-1'>{question.answer[i].essay.contents}</div>)
            }
            return array;
        }
    }

    return (
        <>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">{parseInt(value) === question.question.id && question.question.contents}</h2>
            {parseInt(value) === question.question.id && answer()}
        
         </>
    );
}

export default QuestionListItem;