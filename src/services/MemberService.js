import axios from 'axios';
import * as Sentry from "@sentry/react";

const SURVEY_API_BASE_URL="http://172.16.1.245";
// 구글 로그인
export async function login(idToken){
    console.log('idToken',idToken);
    const response=await axios.get(`${SURVEY_API_BASE_URL}/login/google/${idToken}`).then((response)=>{
        console.log(response);
        if(response.data.code===2002){
            localStorage.clear();
        }
        else{
            localStorage.setItem('accessToken',response.data.result.access_TOKEN);
            localStorage.setItem('memberId',response.data.result.memberId);
            localStorage.setItem('refreshToken',response.data.result.refresh_TOKEN);
            localStorage.setItem('email',response.data.result.email);
            localStorage.setItem('name',response.data.result.memberName);
        }
    }).catch(function(e){
        Sentry.captureException(e);
    })

    
}

// 로그아웃
export async function logout(){
    const memberId=localStorage.getItem('memberId');

    const response=await axios.delete(`${SURVEY_API_BASE_URL}/logout/${localStorage.getItem('memberId')}`).catch(function(e){
        Sentry.captureException(e);
    })
    console.log('logout response',response);
    
    return response;
}