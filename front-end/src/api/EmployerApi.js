import axios from "axios";

export const getAllCandidates = async (authToken) => {
    const headers = {
      'x-access-token': authToken,
    };
  
    try {
        const response = await axios.get('http://localhost:8090/api/test/employer/getCandidates', { headers });
        return response.data;
    } catch (error) {
        console.error('Error in Fetching', error);
        return error
    }
  };

  export const getEmployerProfile = async (authToken) => {
    const headers = {
      'x-access-token': authToken,
    };
  
    try {
        const response = await axios.get('http://localhost:8090/api/test/employer/getEmployerProfile', { headers });
        return response.data;
    } catch (error) {
        console.error('Error in Fetching', error);
    }
  };


  export const updateEmployerProfile = async (formData, authToken) => {
    const headers = {
      'x-access-token': authToken,
    };
  
    try {
          const response = await axios.put('http://localhost:8090/api/test/employer/updateEmployerProfile', formData, { headers });
          // console.log('Data successfully updated in the database:', response.data);
          return response.data;
      } catch (error) {
          console.error('Error updating data in the database:', error);
      }
  };

  export const postJob = async (formData, authToken) => {
    const headers = {
      'x-access-token': authToken,
    };
  
    try {
          const response = await axios.post('http://localhost:8090/api/test/employer/postJob', formData, { headers });
          console.log('Data successfully updated in the database:', response.data);
          return response.data;
      } catch (error) {
          console.error('Error updating data in the database:', error);
      }
  };


  export const getJobsAdded = async (authToken) => {
    const headers = {
      'x-access-token': authToken,
    };
  
    try {
        const response = await axios.get('http://localhost:8090/api/test/employer/getJobs', { headers });
        return response.data;
    } catch (error) {
        console.error('Error in Fetching', error);
    }
  };

  export const getApplicants = async (id, authToken) => {
    const headers = {
      'x-access-token': authToken,
    };
  
    try {
        const response = await axios.get(`http://localhost:8090/api/test/employer/getApplicants?jobID=${id}`, { headers });
        return response.data;
    } catch (error) {
        console.error('Error in Fetching', error);
    }
  };