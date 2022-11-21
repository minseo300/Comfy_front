import axios from 'axios';
import { renew_accessToken,initialize } from '../modules/member';
const accessToken=localStorage.getItem('accessToken');
const memberId=localStorage.getItem('memberId');
const refreshToken=localStorage.getItem('refreshToken');

const SURVEY_API_BASE_URL="http://210.109.60.160"

const config={
    withCredentials:true,
    accesstoken:localStorage.getItem('accessToken'),
    refreshtoken:localStorage.getItem('refreshToken')
}
// 회원 설문지 조회
export async function getSurveys(){
    const memberId=localStorage.getItem('memberId');

    // if(localStorage.getItem('memberId')==='null') memberId=0;
    // else memberId=localStorage.getItem('memberId');
    
    const response= await axios.get(`${SURVEY_API_BASE_URL}/surveyPage/${memberId}`,{headers:config});
    console.log('geteSurveys response: ',response);
    if(response.data.code===2002){
        return 100;
    }
    if(response.config.headers.accesstoken){
        renew_accessToken(response.config.headers.accesstoken);
    }

    return response.data.result;
}

// 설문지 삭제
export async function deleteSurvey(surveyId){
    const memberId=localStorage.getItem('memberId');

    const response=await axios.delete(`${SURVEY_API_BASE_URL}/surveys/${surveyId}/${memberId}`,{headers:config});
    console.log('deleteSurvey response: ',response);
    if(response.data.code===2002){
        return 100;
    }
    if(response.config.headers.accesstoken){
        renew_accessToken(response.config.headers.accesstoken);
    }

    return response.data.result;
}

// 설문 중인 설문지 설문 완료 상태로 변경
export async function updateSurveyStatus(surveyId){
    const memberId=localStorage.getItem('memberId');

    const response=await axios.patch(`${SURVEY_API_BASE_URL}/surveys/${surveyId}`,{headers:config});
    console.log('updateSurveyStatus response: ',response);
    if(response.data.code===2002){
        return 100;
    }
    if(response.config.headers.accesstoken){
        renew_accessToken(response.config.headers.accesstoken);
    }
    return response.data.result;
}

// 마음에 드는 설문지 임시저장
export async function makeSurveyFromPost(surveyId){
    console.log('makeSurveyFromPost - surveyId',surveyId);
    
    const response=await axios.post(`${SURVEY_API_BASE_URL}/created-survey/${surveyId}/${localStorage.getItem('memberId')}`,{headers:config});
        
    if(response.data.code===2002){
        return 100;
    }
    if(response.config.headers.accesstoken){
        renew_accessToken(response.config.headers.accesstoken);
    }

    return response;
}

// 본인이 만든 설문지 중 설문 완료된 설문지 조회
export async function getMyFinishedSurvey(){
    const response=await axios.get(`${SURVEY_API_BASE_URL}/selectSurvey/${localStorage.getItem('memberId')}`,{headers:config});
    console.log('getMyFinishedSurvey',response);
    if(response.data.code===2002){
        return 100;
    }
    if(response.config.headers.accesstoken){
        renew_accessToken(response.config.headers.accesstoken);
    }

    return response.data.result;
    
}

// 설문지 info 조회
export async function getSurveyInfo(surveyId){
    const response=await axios.get(`${SURVEY_API_BASE_URL}/createPost/${surveyId}`,{headers:config});
    console.log('getSurveyInfo',response);
    if(response.data.code===2002){
        return 100;
    }
    if(response.config.headers.accesstoken){
        renew_accessToken(response.config.headers.accesstoken);
    }

    return response.data.result;
}

// 설문지 썸네일 저장
export async function postSurveyThumbnail(surveyId){
    const thumbNum = Math.floor(Math.random() * 5 + 1);
    const response=await axios.patch(`${SURVEY_API_BASE_URL}/survey/thumbnail/${surveyId}/${thumbNum}`,{}, {headers:config})
    if(response.data.code===2002){
        return 100;
    }
    if(response.config.headers.accesstoken){
        renew_accessToken(response.config.headers.accesstoken);
    }
    return response
}
