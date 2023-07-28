import axios from "axios";

export const getAllJobsAdmin = async (authToken) => {
    const headers = {
      'x-access-token': authToken,
    };
  
    try {
        const response = await axios.get('http://localhost:8090/api/test/admin/getJobs', { headers });
        return response.data;
    } catch (error) {
        console.error('Error in Fetching', error);
    }
  };

  export const getAllUsers = async (authToken) => {
    const headers = {
      'x-access-token': authToken,
    };
  
    try {
        const response = await axios.get('http://localhost:8090/api/test/admin/getUsers', { headers });
        return response.data;
    } catch (error) {
        console.error('Error in Fetching', error);
    }
  };

  export const getAllApplications = async (authToken) => {
    const headers = {
      'x-access-token': authToken,
    };
  
    try {
        const response = await axios.get('http://localhost:8090/api/test/admin/getApplications', { headers });
        return response.data;
    } catch (error) {
        console.error('Error in Fetching', error);
    }
  };

  export const deleteJobPosting = async (id, authToken) => {
    const headers = {
      'x-access-token': authToken,
    };
    try {
          const response = await axios.delete(`http://localhost:8090/api/test/admin/deleteJobPosting?jobID=${id}`, { headers });
        //   console.log('Data successfully updated in the database:', response.data);
          return response.data;
      } catch (error) {
          console.error('Error updating data in the database:', error);
      }
  }

  export const deleteUser = async (id, authToken) => {
    const headers = {
      'x-access-token': authToken,
    };
    try {
          const response = await axios.delete(`http://localhost:8090/api/test/admin/deleteUser?id=${id}`, { headers });
        //   console.log('Data successfully updated in the database:', response.data);
          return response.data;
      } catch (error) {
          console.error('Error updating data in the database:', error);
      }
  }

  export const deleteApplication = async (id, authToken) => {
    const headers = {
      'x-access-token': authToken,
    };
    try {
          const response = await axios.delete(`http://localhost:8090/api/test/admin/deleteApplication?id=${id}`, { headers });
        //   console.log('Data successfully updated in the database:', response.data);
          return response.data;
      } catch (error) {
          console.error('Error updating data in the database:', error);
      }
  }