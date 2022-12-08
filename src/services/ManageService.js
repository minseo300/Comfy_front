import axios from 'axios';
import { renew_accessToken,initialize } from '../modules/member';
import * as Sentry from "@sentry/react";

const MANAGESURVEY_API_BASE_URL = "http://172.16.1.245";

const accessToken=localStorage.getItem('accessToken');
const memberId=localStorage.getItem('memberId');
const refreshToken=localStorage.getItem('refreshToken');
const config={
    withCredentials:true,
    accesstoken:localStorage.getItem('accessToken'),
    refreshtoken:localStorage.getItem('refreshToken')
}
class ManageSurveyService {
    
    async getSurveys(){
        const response=await axios.get(MANAGESURVEY_API_BASE_URL+"/surveys",{config}).catch(function(e){
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
        return response;
    }

    async updateSurvey(surveyId,memberId,accessToken,refreshToken){
        // return axios.put(MANAGESURVEY_API_BASE_URL + '/' + surveyId, survey);
        console.log('[updateSurvey] - surveyId',surveyId);
        console.log('[updateSurvey] - memberId',memberId);
        console.log('[updateSurvey] - accessToken',accessToken);
        console.log('[updateSurvey] - refreshToken',refreshToken);
        const response=await axios.patch(`/surveys/${surveyId}`,{},{headers:config}).catch(function(e){
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
        return response;
        //axios.put(MANAGESURVEY_API_BASE_URL + '/' + surveyId, survey);
    }

    async updateSurvey2(surveyId){
        const response=await axios.patch(MANAGESURVEY_API_BASE_URL+"/surveys" + '/' + surveyId,{},{headers:config}).catch(function(e){
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
        return response;
    }

    async getSurveyById(memberId,accessToken,refreshToken){
        console.log('manage survey service - memberId',memberId);
        const response=await axios.get(MANAGESURVEY_API_BASE_URL+ "/surveys/" +memberId,{headers:config}).catch(function(e){
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
        return response;
        // return axios.get(MANAGESURVEY_API_BASE_URL + '/' + memberId);
    }

    async getSurveyByStatus(status){
        const response =await axios.get(MANAGESURVEY_API_BASE_URL+"/surveys" + '/' + status+'/'+memberId,{headers:config}).catch(function(e){
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

    async deleteSurvey(surveyId){
        const response=await axios.delete(`${MANAGESURVEY_API_BASE_URL}/surveys/${surveyId}/${memberId}`,{headers:config}).catch(function(e){
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
        return response;
    }
}

export default new ManageSurveyService()