import axios from 'axios';
import { renew_accessToken,initialize } from '../modules/member';
const MANAGESURVEY_API_BASE_URL = "http://210.109.60.160";

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
        const response=await axios.get(MANAGESURVEY_API_BASE_URL+"/surveys",{config});
        if(response.config.headers.accesstoken){
            renew_accessToken(response.config.headers.accesstoken);
        }
        return response;
    }

    async updateSurvey(surveyId,memberId,accessToken,refreshToken){
        // return axios.put(MANAGESURVEY_API_BASE_URL + '/' + surveyId, survey);
        console.log('[updateSurvey] - surveyId',surveyId);
        console.log('[updateSurvey] - memberId',memberId);
        console.log('[updateSurvey] - accessToken',accessToken);
        console.log('[updateSurvey] - refreshToken',refreshToken);
        const response=await axios.patch(`/surveys/${surveyId}`,{config})
        if(response.config.headers.accesstoken){
            renew_accessToken(response.config.headers.accesstoken);
        }
        return response;
        //axios.put(MANAGESURVEY_API_BASE_URL + '/' + surveyId, survey);
    }

    async updateSurvey2(surveyId){
        const response=await axios.patch(MANAGESURVEY_API_BASE_URL+"/surveys" + '/' + surveyId,{headers:config})
        if(response.config.headers.accesstoken){
            renew_accessToken(response.config.headers.accesstoken);
        }
        return response;
    }

    async getSurveyById(memberId,accessToken,refreshToken){
        console.log('manage survey service - memberId',memberId);
        const response=await axios.get(`/surveys/${memberId}`,{headers:config})
        if(response.config.headers.accesstoken){
            renew_accessToken(response.config.headers.accesstoken);
        }
        return response;
        // return axios.get(MANAGESURVEY_API_BASE_URL + '/' + memberId);
    }

    async getSurveyByStatus(status){
        const response =await axios.get(MANAGESURVEY_API_BASE_URL+"/surveys" + '/' + status+'/'+memberId,{headers:config});
        if(response.config.headers.accesstoken){
            renew_accessToken(response.config.headers.accesstoken);
        }
        return response
    }

    async deleteSurvey(surveyId){
        const response=await axios.delete(`${MANAGESURVEY_API_BASE_URL}/surveys/${surveyId}/${memberId}`,{headers:config}); 
        if(response.config.headers.accesstoken){
            renew_accessToken(response.config.headers.accesstoken);
        }
        return response;
    }
}

export default new ManageSurveyService()