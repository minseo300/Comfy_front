import { combineReducers } from "redux";
import post from './post';
import member from './member';
import result from './result';
import createsurvey from './createsurvey';
import resultSlice from './resultSlice.js';


const rootReducer=combineReducers({
    post,
    member,
    result,
    createsurvey,
    resultSlice,
    result,
});

export default rootReducer;