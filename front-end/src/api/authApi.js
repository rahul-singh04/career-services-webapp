import axios from 'axios';

export const handleSignup = (formData, callback) => {
  axios.post('http://192.168.2.16:3090/api/auth/signup', formData)
    .then((response) => {
      console.log(response.data.message);
      callback('Success');
    })
    .catch((error) => {
      console.error(error.response.data.message);
      callback('Failure');
    });
};

export const handleSignin = (formData, callback) => {
  axios.post('http://192.168.2.16:3090/api/auth/signin', formData)
    .then((response) => {
      console.log(response.data.message);
      callback('Success');
    })
    .catch((error) => {
      console.error(error.response.data.message);
      callback('Failure');
    });
};

