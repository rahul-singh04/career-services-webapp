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