import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import ManageService from '../../../services/ManageService'
import FinishedItem from './item/FinishedItem'
import SurveyingItem from './item/SurveyingItem'

function ManageSurvey() {

  const [surveyingList, setsurveyingList] = useState([]);
  const [finishList, setFinishList] = useState([]);

  //설문 중인 설문지 가져오기 
  useEffect(() => {
    ManageService.getSurveyByStatus('surveying').then((res) => {
      setsurveyingList(res.data.result);
      console.log("survey data : ", res.data.result);
    })
  }, [])

  //설문 완료된 설문지 가져오기 
  useEffect(() => {
    ManageService.getSurveyByStatus('finish').then((res) => {
      setFinishList(res.data.result);
      console.log("survey data : ", res.data.result);
    })
  }, [])


 
  return (

    <div className="mx-auto max-w-7xl px-4 sm:px-6 ">
      {/* 설문중 */}
      <SurveyingItem surveyItemList={surveyingList} />

      {/* 설문완료  */}
      <FinishedItem surveyItemList={finishList} />
    </div>

  )
}

export default ManageSurvey