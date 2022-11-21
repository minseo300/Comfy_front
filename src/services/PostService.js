import axios from 'axios';
import { renew_accessToken,initialize } from '../modules/member';

const accessToken=localStorage.getItem('accessToken');
const memberId=localStorage.getItem('memberId');
const refreshToken=localStorage.getItem('refreshToken');
const config={
    withCredentials:true,
    ACCESS_TOKEN:localStorage.getItem('accessToken'),
    REFRESH_TOKEN:localStorage.getItem('refreshToken')
}
// 커뮤니티 조회
export async function getPosts(){
    const memberId=localStorage.getItem('memberId');
    // if(localStorage.getItem('memberId')==='null') memberId=0;
    // else memberId=localStorage.getItem('memberId');
    const response=await axios.get(`http://210.109.60.160/community/${memberId}`);
    console.log('getPosts response: ',response);
    return response.data.result;
}

// 마이 페이지 조회
export async function getMyPagePosts(){
    
    const memberId=localStorage.getItem('memberId');

    const response=await axios.get(`http://210.109.60.160/myPage/${memberId}`,{headers:config});
    console.log('getMyPagePosts response: ',response);
    if(response.data.code===2002){
        return 100;
    }
    else {
        console.log("[reissued access token]: ",response.config.headers.ACCESS_TOKEN);
        renew_accessToken(response.config.headers.ACCESS_TOKEN);
    }

    return response.data.result;
}

// 글 삭제
export async function deleteMyPost(postId){
    const memberId=localStorage.getItem('memberId');

    const response=await axios.delete(`http://210.109.60.160/post/${postId}/${memberId}`,{headers:config});
    console.log('deleteMyPost response: ',response);
    if(response.data.code===2002){
        return 100;
    }
    else renew_accessToken(response.config.headers.ACCESS_TOKEN);
     
    return response.data.result;
}

// 북마크 등록
export async function addBookmark(postId){
    const memberId=localStorage.getItem('memberId');
    console.log('[addBookmark] - accessToken: ',accessToken);
    console.log('[addBoomkark] - refreshToken: ',refreshToken);
    console.log('addBookmark - postId',postId);
    const data={
        memberId:localStorage.getItem('memberId'),
        postId:postId
    };
    const response=await axios.post('http://210.109.60.160/bookmark',data,{headers:config});
    //const response=await axios.post(`http://210.109.62.25:8080/bookmark/${postId}/${memberId}`,{headers:config});
    console.log('[ADD BOOKMARK] response',response);
    if(response.data.code===2002){
        return 100;
    }
    else {
        console.log('[NEW ACCESS TOKEN] - ',response.config.headers.ACCESS_TOKEN);
        renew_accessToken(response.config.headers.ACCESS_TOKEN);
    }
    return response.data.result;

}

// 북마크 취소
export async function deleteBookmark(postId){
    // const memberId=localStorage.getItem('memberId');
    // console.log('deleteBookmark - postId',postId);
    const data={
        memberId:localStorage.getItem('memberId'),
        postId:postId
    };
    const response=await axios.delete(`http://210.109.60.160/bookmark/${postId}/${memberId}`,{headers:config},{});
    //const response=await axios.delete(`http://210.109.62.25:8080/bookmark/${postId}/${memberId}`,{headers:{withCredentials: true,'Access-Control-Allow-Origin':'*','ACCESS_TOKEN':`${accessToken}`,'REFRESH_TOKEN':`${refreshToken}`}});
    if(response.data.code===2002){
        return 100;
    }
    else renew_accessToken(response.config.headers.ACCESS_TOKEN);
    
    return response.data.result;
}

// 게시글 열람
export async function getPostInfo(postId){
    const memberId=localStorage.getItem('memberId');

    console.log('getPostInfo - postId',postId);

    const response=await axios.get(`http://210.109.60.160/post/${postId}/${memberId}`,{headers:config});

    return response.data.result;
}

// 게시글 등록
export async function createPost(title,content,surveyId){
    const response=await axios.post(
        "http://210.109.60.160/posting",{
            title:title,
            contents:content,
            memberId:localStorage.getItem('memberId'),
            surveyId:surveyId
        }
      );
    if(response.data.code===2002){
        return 100;
    }
    else renew_accessToken(response.config.headers.ACCESS_TOKEN);

    return response.data.code;
}

// 게시글 검색
export async function getSearchedPosts(word){
    const response = await axios.get(
        "http://210.109.60.160/search?word=" + word,{
          params:{
              title:word
          }
        }
      );
    
    console.log('getSearchedPosts response',response);
    return response.data.result;
}
