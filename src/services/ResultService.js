import axios from 'axios';
import { initialize, renew_accessToken } from '../modules/member';
import * as Sentry from "@sentry/react";
import { useNavigate } from 'react-router-dom';

const SURVEY_API_BASE_URL = "http://172.16.1.245/result";
const config={
    withCredentials:true,
    accesstoken:localStorage.getItem('accessToken'),
    refreshtoken:localStorage.getItem('refreshToken')
}

class SurveyService {

    async getSurvey(surveyId){
        const response= await axios.get(SURVEY_API_BASE_URL+ '/' + surveyId,{headers:config}).catch(function(e){
            Sentry.captureException(e);
        })
        if(response.headers["auth-token"]){
            const auth_token=response.headers["auth-token"].split(';',2)[0].split('=',2)[1]
            const access_Token=auth_token.split(":",4)[1]
            const refresh_Token=auth_token.split(":",4)[3]
            renew_accessToken(access_Token,refresh_Token);
        }
        if(response.status===401){
            initialize()
        }
        return response
       
        
    }

    async getSurveyIndividual(surveyId){
        const response= await axios.get(SURVEY_API_BASE_URL+ '/individual/' + surveyId,{headers:config}).catch(function(e){
            Sentry.captureException(e);
        })
        if(response.headers["auth-token"]){
            const auth_token=response.headers["auth-token"].split(';',2)[0].split('=',2)[1]
            const access_Token=auth_token.split(":",4)[1]
            const refresh_Token=auth_token.split(":",4)[3]
            renew_accessToken(access_Token,refresh_Token);
        }
        if(response.status===401){
            initialize()
        }
        return response
    }

    async getSurveyQuestion(surveyId){
        const response= await axios.get(SURVEY_API_BASE_URL + '/question/' + surveyId,{headers:config}).catch(function(e){
            Sentry.captureException(e);
        })
        if(response.headers["auth-token"]){
            const auth_token=response.headers["auth-token"].split(';',2)[0].split('=',2)[1]
            const access_Token=auth_token.split(":",4)[1]
            const refresh_Token=auth_token.split(":",4)[3]
            renew_accessToken(access_Token,refresh_Token);
        }
        if(response.status===401){
            initialize()
        }

        return response
    }

    async getQuestionOption(surveyId, questionId){
        const response= await axios.get(SURVEY_API_BASE_URL + '/question/option/' +surveyId + '/' + questionId,{headers:config}).catch(function(e){
            Sentry.captureException(e);
        })
        if(response.headers["auth-token"]){
            const auth_token=response.headers["auth-token"].split(';',2)[0].split('=',2)[1]
            const access_Token=auth_token.split(":",4)[1]
            const refresh_Token=auth_token.split(":",4)[3]
            renew_accessToken(access_Token,refresh_Token);
        }
        if(response.status===401){
            initialize()
        }

        return response
    }
    async getGridOption(surveyId, questionId){
        const response= await axios.get(SURVEY_API_BASE_URL + '/question/grid/' +surveyId + '/' + questionId,{headers:config}).catch(function(e){
            Sentry.captureException(e);
        })
        if(response.headers["auth-token"]){
            const auth_token=response.headers["auth-token"].split(';',2)[0].split('=',2)[1]
            const access_Token=auth_token.split(":",4)[1]
            const refresh_Token=auth_token.split(":",4)[3]
            renew_accessToken(access_Token,refresh_Token);
        }
        
        if(response.status===401){
            initialize()
        }

        return response
    }

}

export default new SurveyService()