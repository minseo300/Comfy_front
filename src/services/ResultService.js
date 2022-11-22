import axios from 'axios';
import { renew_accessToken } from '../modules/member';
import * as Sentry from "@sentry/react";

const SURVEY_API_BASE_URL = `${process.env.REACT_APP_API_URL}/result`;
const config={
    withCredentials:true,
    accesstoken:localStorage.getItem('accessToken'),
    refreshtoken:localStorage.getItem('refreshToken')
}

class SurveyService {

    async getSurvey(surveyId){
        const response= await axios.get(SURVEY_API_BASE_URL+ '/' + surveyId,{headers:config}).catch(function(e){
            Sentry.captureException(e);
        }); 
        if(response.config.headers.accesstoken){
            renew_accessToken(response.config.headers.accesstoken);
        }
        return response
       
        
    }

    async getSurveyIndividual(surveyId){
        const response= await axios.get(SURVEY_API_BASE_URL+ '/individual/' + surveyId,{headers:config}).catch(function(e){
            Sentry.captureException(e);
        }); 
        if(response.config.headers.accesstoken){
            renew_accessToken(response.config.headers.accesstoken);
        }
        return response
    }

    async getSurveyQuestion(surveyId){
        const response= await axios.get(SURVEY_API_BASE_URL + '/question/' + surveyId,{headers:config}).catch(function(e){
            Sentry.captureException(e);
        }); 
        if(response.config.headers.accesstoken){
            renew_accessToken(response.config.headers.accesstoken);
        }

        return response
    }

    async getQuestionOption(surveyId, questionId){
        const response= await axios.get(SURVEY_API_BASE_URL + '/question/option/' +surveyId + '/' + questionId,{headers:config}).catch(function(e){
            Sentry.captureException(e);
        }); 
        if(response.config.headers.accesstoken){
            renew_accessToken(response.config.headers.accesstoken);
        }

        return response
    }
    async getGridOption(surveyId, questionId){
        const response= await axios.get(SURVEY_API_BASE_URL + '/question/grid/' +surveyId + '/' + questionId,{headers:config}).catch(function(e){
            Sentry.captureException(e);
        }); 
        if(response.config.headers.accesstoken){
            renew_accessToken(response.config.headers.accesstoken);
        }

        return response
    }

}

export default new SurveyService()