import axios from 'axios';

const SURVEY_API_BASE_URL="http://210.109.60.160"
// 구글 로그인
export async function login(idToken){
    console.log('idToken',idToken);
    const response=await axios.get(`${SURVEY_API_BASE_URL}/login/google/${idToken}`).then((response)=>{
        console.log(response.data.result);
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
    })

    
}

// 로그아웃
export async function logout(){
    const memberId=localStorage.getItem('memberId');

    const response=await axios.delete(`${SURVEY_API_BASE_URL}/logout/${localStorage.getItem('memberId')}`);
    console.log('logout response',response);
    
    return response;
}