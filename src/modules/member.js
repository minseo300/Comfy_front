import axios from 'axios';
import { logout } from "../services/MemberService";

const LOGIN='member/LOGIN';
const LOGOUT='member/LOGOUT';


//액션 생성 함수
// export function setMember(data){
export function loginMember(idToken){
    return{
        type: LOGIN,
        payload:{
            name:localStorage.getItem('name'),
            memberId:localStorage.getItem('memberId'),
            accessToken:localStorage.getItem('accessToken'),
            refreshToken:localStorage.getItem('refreshToken'),
            email:localStorage.getItem('email')
        }
    }
}

export function logoutMember(){
    console.log('header.js - logout');
    logout();
    return{
        type:LOGOUT,
        //payload
    }
}
//모듈 초기 상태
const initialState={
    name:'guest',
    accessToken:'none',
    refreshToken:'none',
    memberId:0,
    email:'none'
    // member:null
};

// 리듀서
export default function member(state=initialState,action){
    switch(action.type){
        case LOGIN:
            return{
                name:action.payload.name,
                memberId:action.payload.memberId,
                accessToken:action.payload.accessToken,
                refreshToken:action.payload.refreshToken,
                email:action.payload.email
                // member: action.payload
            };
        case LOGOUT:
            //alert('LOGOUT');
            return{
                name:'guest',
                accessToken:'none',
                memberId:0,
                member:null
            };
        default:
            return state;
    }
}