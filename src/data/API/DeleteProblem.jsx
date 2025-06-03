import axios from "axios"

export const DeleteProblem = (tokenDoctor, domain, id) => {
  return axios.delete(`${domain}/api/ContactUs/${id}`, {
    headers: {
      Authorization: `Bearer ${tokenDoctor}`,
      'Content-Type': 'application/json',
    }
  })
  .then((res) => {
    console.log("DeleteProblem response:", res);
    return res; 
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });
};
