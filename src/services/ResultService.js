import axios from 'axios';

const SURVEY_API_BASE_URL = "http://localhost:8080/resultSurvey";


class SurveyService {

    getSurvey(surveyId){
        return axios.get(SURVEY_API_BASE_URL+ '/' + surveyId);
    }

    getSurveyIndividual(surveyId){
        return axios.get(SURVEY_API_BASE_URL+ '/individual/' + surveyId);
    }

    getSurveyQuestion(surveyId){
        return axios.get(SURVEY_API_BASE_URL + '/question/' + surveyId);
    }

    getSurveyIndividualResult(surveyId, userId){
        return axios.get(SURVEY_API_BASE_URL+ '/individual_result/' + surveyId + '/' +userId);
    }

    getQuestionOption(surveyId, questionId){
        return axios.get(SURVEY_API_BASE_URL + '/question/option/' +surveyId + '/' + questionId);
    }

    getGridOption(surveyId, questionId){
        return axios.get(SURVEY_API_BASE_URL + '/question/grid/' +surveyId + '/' + questionId);
    }

    
    postSatisfaction(surveyId,satisfaction){
        axios.post(SURVEY_API_BASE_URL+'/satisfaction/'+surveyId+'/'+localStorage.getItem('memberId')+'/'+satisfaction)
        .then((response)=>{
            console.log('rrr',response);
            if(response.data.code===1000) return true;
        })
    }
}

export default new SurveyService()