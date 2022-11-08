import axios from 'axios';
import { renew_accessToken,initialize } from '../modules/member';
const MANAGESURVEY_API_BASE_URL = "http://210.109.62.25:8080";

const accessToken=localStorage.getItem('accessToken');
const memberId=localStorage.getItem('memberId');
const refreshToken=localStorage.getItem('refreshToken');
const config={
    withCredentials:true,
    ACCESS_TOKEN:localStorage.getItem('accessToken'),
    REFRESH_TOKEN:localStorage.getItem('refreshToken')
}
class ManageSurveyService {
    
    getSurveys(){
        const response=axios.get(MANAGESURVEY_API_BASE_URL+"/surveys",{headers:config});
        if(response.data.code===2002){
            return 100;
        }
        else renew_accessToken(response.config.headers.ACCESS_TOKEN);
        
        return response;
    }

    updateSurvey(surveyId,memberId,accessToken,refreshToken){
        // return axios.put(MANAGESURVEY_API_BASE_URL + '/' + surveyId, survey);
        console.log('[updateSurvey] - surveyId',surveyId);
        console.log('[updateSurvey] - memberId',memberId);
        console.log('[updateSurvey] - accessToken',accessToken);
        console.log('[updateSurvey] - refreshToken',refreshToken);
        const response=axios.patch(`/survey/${surveyId}`)
        // if(response.data.code===2002){
        //     return 100;
        // }
        // else renew_accessToken(response.config.headers.ACCESS_TOKEN);
        
        return response;
        //axios.put(MANAGESURVEY_API_BASE_URL + '/' + surveyId, survey);
    }

    updateSurvey2(surveyId){
        const response=axios.patch(MANAGESURVEY_API_BASE_URL+"/survey" + '/' + surveyId,{headers:{withCredentials: true,'Access-Control-Allow-Origin':'*','ACCESS_TOKEN':`${accessToken}`,'REFRESH_TOKEN':`${refreshToken}`}});
        // if(response.data.code===2002){
        //     return 100;
        // }
        // else renew_accessToken(response.config.headers.ACCESS_TOKEN);

        return response;
    }

    getSurveyById(memberId,accessToken,refreshToken){
        console.log('manage survey service - memberId',memberId);
        const response=axios.get(`/surveys/${memberId}`,{headers:config})
        if(response.data.code===2002){
            return 100;
        }
        else renew_accessToken(response.config.headers.ACCESS_TOKEN);

        return response;
        // return axios.get(MANAGESURVEY_API_BASE_URL + '/' + memberId);
    }

    getSurveyByStatus(status){
        return axios.get(MANAGESURVEY_API_BASE_URL+"/surveys" + '/' + status+'/'+memberId,{headers:config});
    }

    deleteSurvey(surveyId){
        console.log("delete")
        const response=axios.delete(`${MANAGESURVEY_API_BASE_URL}/survey/${surveyId}/${memberId}`);      
        return response;
    }
}

export default new ManageSurveyService()