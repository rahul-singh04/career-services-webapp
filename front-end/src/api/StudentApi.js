import axios from 'axios';

export const updateProfile = async (formData, authToken) => {
  const headers = {
    'x-access-token': authToken,
  };

  try {
        const response = await axios.put('http://localhost:8090/api/test/candidate/updateUserProfile', formData, { headers });
        console.log('Data successfully updated in the database:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating data in the database:', error);
    }
};


export const getProfile = async (authToken) => {
    const headers = {
      'x-access-token': authToken,
    };
  
    try {
        const response = await axios.get('http://localhost:8090/api/test/candidate/getUserProfile', { headers });
        return response.data;
    } catch (error) {
        console.error('Error in Fetching', error);
    }
  };
  


  export const getAllJobs = async (authToken) => {
    const headers = {
      'x-access-token': authToken,
    };
  
    try {
        const response = await axios.get('http://localhost:8090/api/test/candidate/browseJobs', { headers });
        return response.data;
    } catch (error) {
        console.error('Error in Fetching', error);
    }
  };
  

  export const updateResume = async (formData, authToken) => {
    const headers = {
      'x-access-token': authToken,
    };
    try {
          const response = await axios.post('http://localhost:8090/api/test/candidate/postResume', formData, { headers });
        //   console.log('Data successfully updated in the database:', response.data);
          return response.data;
      } catch (error) {
          console.error('Error updating data in the database:', error);
      }
  };

  export const getResume = async (id , authToken) => {
    const headers = {
      'x-access-token': authToken,
    };
  
    try {
        const response = await axios.get(`http://localhost:8090/api/test/candidate/getResume?candidateID=${id}` , {headers,responseType: 'blob' });
        return response.data;
    } catch (error) {
        console.error('Error in Fetching', error);
    }
  };

  export const buildResume = async (authToken) => {
    const headers = {
      'x-access-token': authToken,
    };
  
    try {
        const response = await axios.get(`http://localhost:8090/api/test/candidate/resume` , {headers,responseType: 'blob' });
        return response.data;
    } catch (error) {
        console.error('Error in Fetching', error);
    }

  export const applyJob = async (id, authToken) => {
    const headers = {
      'x-access-token': authToken,
    };
    try {
          const response = await axios.post(`http://localhost:8090/api/test/candidate/applyJob?jobID=${id}`,{}, { headers });
        //   console.log('Data successfully updated in the database:', response.data);
          return response.data;
      } catch (error) {
          console.error('Error updating data in the database:', error);
      }
  };