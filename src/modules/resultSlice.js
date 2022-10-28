import React from 'react'

import IndividualShow from '../../src/components/pages/result/IndividualShow';
import QuestionResult from '../../src/components/pages/result/QuestionResult';

const SHOW_INDIVIDUAL = 'resultSlice/SHOW_INDIVIDUAL';
const SHOW_QUESTION = 'resultSlice/SHOW_QUESTION';

export function showIndividual() {
    return {
        type: SHOW_INDIVIDUAL,
    }
}
export function showQuestion() {
    return {
        type: SHOW_QUESTION,
    }
}

const initialState = {
    address: <IndividualShow />
}


function resultSlice(state = initialState, action){
    switch(action.type){
        case SHOW_INDIVIDUAL:
            console.log('SHOW_INDIVIDUAL');
            return{
                address: <IndividualShow />
            };
        case SHOW_QUESTION:
            console.log('SHOW_QUESTION');
            return{
                address: <QuestionResult />
            };
        default:
            return state;
    }
}
export default resultSlice;