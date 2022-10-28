const GET_SURVEY_DETAILS = 'result/GET_SURVEY_DETAILS';
const GET_QUESTION = 'result/GET_QUESTION';
const GET_INDIVIDUAL = 'result/GET_INDIVIDUAL'
const GET_OPTION = 'result/GET_OPTION'
export function getSurveyDetails(surveyDetails) {
    return {
        type: GET_SURVEY_DETAILS,
        payload: surveyDetails
    }
}
// 이 부분 응답자수 구하는거로 바꿔야 함.
export function getIndividual(respondents) {
    return {
        type: GET_INDIVIDUAL,
        payload: respondents
    }
}

export function getQuestion(questions) {
    return {
        type: GET_QUESTION,
        payload: questions
    }
}

export function getOption(options) {
    return {
        type: GET_OPTION,
        payload: options
    }
}

const initialState = {
    questions: [],
    questionId: 0,
    surveyDetails: {
        title: '',
        contents: '',
        satisfaction: true
    },
    respondents: [],
    options: []
}

function result(state = initialState, action) {
    switch (action.type) {
        case GET_SURVEY_DETAILS:
            console.log('GET_SURVEY_DETAILS');
            if (state.surveyDetails.title !== action.payload.title) {
                state.surveyDetails = {
                    title: '',
                    contents: '',
                    satisfaction: true
                }
            }
            return {
                ...state,
                surveyDetails: {
                    title: action.payload.title,
                    contents: action.payload.contents,
                    satisfaction: action.payload.satisfaction
                }
            };
        // 이 부분 응답자수 구하는거로 바꿔야 함.   
        case GET_INDIVIDUAL:
            console.log('GET_INDIVIDUAL');
            if (state.respondents.length > 0) {
                state.respondents = [];
            }
            return {
                ...state,
                respondents: state.respondents.concat(action.payload)
            };

        case GET_QUESTION:
            console.log('GET_QUESTION');
            if (state.questions.length > 0) {
                state.questions = [];
                state.questionId = 0;
            }
            return {
                ...state,
                questionId: action.payload[0].question.id,
                questions: state.questions.concat(action.payload)
            };

        case GET_OPTION:
            console.log('GET_OPTION');
            if (state.options.length > 0) {
                state.options = [];
            }
            return {
                ...state,
                options: state.options.concat(action.payload)
            };
        default:
            return state;
    }
}
export default result;