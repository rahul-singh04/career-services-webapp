import axios from 'axios';

export const handleSignup = (formData, callback) => {
  axios.post('http://localhost:3090/api/auth/signup', formData)
    .then((response) => {
    //   console.log(response.data.message);
      callback(response.data.message);
    })
    .catch((error) => {
    //   console.error(error.response.data.message);
      callback(error.response.data.message);
    });
};

export const handleSignin = (formData, callback) => {
  axios.post('http://localhost:3090/api/auth/signin', formData)
    .then((response) => {
    if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      callback('success');
    })
    .catch((error) => {
      if(error.code == "ERR_NETWORK"){
        callback(error.message);
      }
      callback(error.response);
    });

};

export const  getCurrentUser = () =>{
  return JSON.parse(localStorage.getItem('user'));;
}

export const logout = () => {
  localStorage.removeItem("user");
}

