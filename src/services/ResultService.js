import axios from 'axios';
import { renew_accessToken } from '../modules/member';

const SURVEY_API_BASE_URL = "http://210.109.60.160/result";
const config={
    withCredentials:true,
    accesstoken:localStorage.getItem('accessToken'),
    refreshtoken:localStorage.getItem('refreshToken')
}

class SurveyService {

    async getSurvey(surveyId){
        const response= await axios.get(SURVEY_API_BASE_URL+ '/' + surveyId,{headers:config})
        if(response.config.headers.accesstoken){
            renew_accessToken(response.config.headers.accesstoken);
        }
        return response
       
        
    }

    async getSurveyIndividual(surveyId){
        const response= await axios.get(SURVEY_API_BASE_URL+ '/individual/' + surveyId,{headers:config})
        if(response.config.headers.accesstoken){
            renew_accessToken(response.config.headers.accesstoken);
        }
        return response
    }

    async getSurveyQuestion(surveyId){
        const response= await axios.get(SURVEY_API_BASE_URL + '/question/' + surveyId,{headers:config})
        if(response.config.headers.accesstoken){
            renew_accessToken(response.config.headers.accesstoken);
        }

        return response
    }

    async getQuestionOption(surveyId, questionId){
        const response= await axios.get(SURVEY_API_BASE_URL + '/question/option/' +surveyId + '/' + questionId,{headers:config})
        if(response.config.headers.accesstoken){
            renew_accessToken(response.config.headers.accesstoken);
        }

        return response
    }
    async getGridOption(surveyId, questionId){
        const response= await axios.get(SURVEY_API_BASE_URL + '/question/grid/' +surveyId + '/' + questionId,{headers:config})
        if(response.config.headers.accesstoken){
            renew_accessToken(response.config.headers.accesstoken);
        }

        return response
    }

}

export default new SurveyService()