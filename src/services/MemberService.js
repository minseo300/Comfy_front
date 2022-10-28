import axios from 'axios';

// 구글 로그인
export async function login(idToken){
    console.log('idToken',idToken);
    const response=await axios.get(`http://localhost:8080/login/google/${idToken}`).then((response)=>{
        console.log(response.data.result);
        if(response.data.code===2002){
            localStorage.clear();
        }
        else{
            localStorage.setItem('accessToken',response.data.result.access_TOKEN);
            localStorage.setItem('refreshToken',response.data.result.refresh_TOKEN);
            localStorage.setItem('memberId',response.data.result.memberId);
            localStorage.setItem('email',response.data.result.email);
            localStorage.setItem('name',response.data.result.memberName);
            

        }
    })

    return response;
}

// 로그아웃
export async function logout(){
    const memberId=localStorage.getItem('memberId');

    const response=axios.delete(`http://localhost:8080/logout/${localStorage.getItem('memberId')}`);
    console.log('logout response',response);
    initialize();
    return response.data.result;
}

// clear localStorage
export function initialize(){
    localStorage.setItem('accessToken',null);
    localStorage.setItem('refreshToken',null);
    localStorage.setItem('memberId','null');
    localStorage.setItem('email',null);
    localStorage.setItem('name',null);
    //alert('LOGOUT');

}

// reset accessToken by refreshToken
export function renew_accessToken(accessToken){
    localStorage.setItem('accessToken',accessToken);
}
