import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import QuestionList from './item/QuestionList'
import { useSelector, useDispatch } from 'react-redux';
import { getQuestion } from '../../../modules/result'
import SurveyService from '../../../services/ResultService';

function QuestionResult() {
  const dispatch = useDispatch();
  const { surveyId } = useParams();
  const questionList = useSelector(state => state.result.questions);
  useEffect(() => {
    if (Object.keys(questionList).length === 0) {
      SurveyService.getSurveyQuestion(surveyId).then((res) => {
        dispatch(getQuestion(res.data.result));
      })
    } else {
      if (questionList[0].question.surveyId !== surveyId) {
        SurveyService.getSurveyQuestion(surveyId).then((res) => {
          dispatch(getQuestion(res.data.result));
        })
      } else {
        console.log("질문 데이터가 이미 있습니다.");
        return;
      }
    }
  }, [])

  return (
    <div>
      {questionList && <QuestionList questions={questionList} />}
    </div>
  );
};

export default QuestionResult;