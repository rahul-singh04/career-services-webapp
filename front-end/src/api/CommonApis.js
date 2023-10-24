import axios from "axios";

export const updatePhoto = async (formData, authToken) => {
  const headers = {
    "x-access-token": authToken,
  };
  try {
    const response = await axios.post(
      "https://careerservices-backend.onrender.com/api/test/candidate/postPhoto",
      formData,
      { headers }
    );
    //   console.log('Data successfully updated in the database:', response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating data in the database:", error);
  }
};

export const getPhoto = async (id, authToken) => {
  const headers = {
    "x-access-token": authToken,
  };

  try {
    const response = await axios.get(
      `https://careerservices-backend.onrender.com/api/test/candidate/getPhoto?candidateID=${id}`,
      { headers, responseType: "blob" }
    );
    if (response.data.type.includes("image")) {
      const url = URL.createObjectURL(response.data);
      return url;
    }
  } catch (error) {
    // console.error('Error in Fetching', error);
  }
};
