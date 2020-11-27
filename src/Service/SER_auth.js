import axios from 'axios';

export const userService = {
  login,
  logout,
  profile_list,
  profile_detail

};
function login(username,password){
    const requestOptions={
        method:'POST',
        headers:{ 'Content-Type': 'application/json' },
        body:JSON.stringify({username,password})
    };
    // console.log(config.url+"auth/login/");
    return fetch("//django-api.eba-jmjspmms.ap-southeast-1.elasticbeanstalk.com/api/auth/loginAdmin/",requestOptions)
    .then(handleResponse)
    .then(user=>{
        localStorage.setItem('user',JSON.stringify(user))
        return user;
    });
}
function logout(){
    localStorage.removeItem('user')
}
function profile_list(){
    
    return axios({
        method: "GET",
        url: "http://django-api.eba-jmjspmms.ap-southeast-1.elasticbeanstalk.com/api/auth/profile/"
    })
    .then(listProfile=>{
        console.log(listProfile.data);
        return listProfile.data;
    });
}
function profile_detail(pk){
    
    return axios({
        method: "GET",
        url: "http://django-api.eba-jmjspmms.ap-southeast-1.elasticbeanstalk.com/api/auth/profile_ID/"+pk
    })
    .then(Profile=>{
        // console.log(Profile.data);
        return Profile.data;
    });
}
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

