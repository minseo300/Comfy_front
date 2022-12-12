import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { initialize, renew_accessToken } from '../modules/member';
import * as Sentry from "@sentry/react";
import { postSurveyThumbnail } from "../services/SurveyService";

const SURVEY_API_BASE_URL = "https://www.commfy.shop/api";
const SURVEY_SHARE_URL = "https://www.commfy.shop";

const config={
    withCredentials:true,
    accesstoken:localStorage.getItem('accessToken'),
    refreshtoken:localStorage.getItem('refreshToken')
}

class SurveyService {

    async saveSurvey(loc,memberid, data){
        axios.defaults.headers.post = null
        const thumbNum = Math.floor(Math.random() * 5 + 1);
        console.log("thumbNum: ",thumbNum);
        const response=await axios.post(`${SURVEY_API_BASE_URL}${loc}/${thumbNum}/${memberid}`, data,{headers:config}).catch(function(e){
            Sentry.captureException(e);
        })
        if(response.headers["auth-token"]){
            const surveyId=response.data.result;
            // postSurveyThumbnail(surveyId);
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
    shareSurvey(surveyId){
        return `${SURVEY_SHARE_URL}/respondent/${surveyId ? surveyId : ""}`
    }
    async loadSurvey(loc,memberid){
        var value=loc
        if(loc==="/survey"){
            var value=value+"/"+memberid
        }
        else if(loc.substring(0,7)==="/manage"){
            var value=loc.substring(7,loc.length)+"/"+memberid
        }
        value="/load"+value
        const response = await axios.get(SURVEY_API_BASE_URL+`${value}`,{headers:config}).catch(function(e){
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
    async sendSurvey(loc,data){
        const response= await axios.post(SURVEY_API_BASE_URL+`${loc}`, data,{headers:config}).catch(function(e){
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