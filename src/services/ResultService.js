import axios from 'axios';

const SURVEY_API_BASE_URL = "http://localhost:8080/result";


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

    getQuestionOption(surveyId, questionId){
        return axios.get(SURVEY_API_BASE_URL + '/question/option/' +surveyId + '/' + questionId);
    }

    getGridOption(surveyId, questionId){
        return axios.get(SURVEY_API_BASE_URL + '/question/grid/' +surveyId + '/' + questionId);
    }

}

export default new SurveyService()