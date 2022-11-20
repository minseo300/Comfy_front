import axios from 'axios';
import { renew_accessToken } from '../modules/member';

const SURVEY_API_BASE_URL = "http://10.108.24.189/result";
const config={
    withCredentials:true,
    ACCESS_TOKEN:localStorage.getItem('accessToken'),
    REFRESH_TOKEN:localStorage.getItem('refreshToken')
}

class SurveyService {

    getSurvey(surveyId){
        return axios.get(SURVEY_API_BASE_URL+ '/' + surveyId,{headers:config})

       
        
    }

    getSurveyIndividual(surveyId){
        return axios.get(SURVEY_API_BASE_URL+ '/individual/' + surveyId,{headers:config})
        
    }

    getSurveyQuestion(surveyId){
        return axios.get(SURVEY_API_BASE_URL + '/question/' + surveyId,{headers:config})
        
    }

    getQuestionOption(surveyId, questionId){
        return axios.get(SURVEY_API_BASE_URL + '/question/option/' +surveyId + '/' + questionId,{headers:config})
        
    }
    getGridOption(surveyId, questionId){
       return axios.get(SURVEY_API_BASE_URL + '/question/grid/' +surveyId + '/' + questionId,{headers:config})
        
    }

}

export default new SurveyService()