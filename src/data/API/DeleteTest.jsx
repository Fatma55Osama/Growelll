import axios from "axios"

export const DeleteTest = (tokenDoctor, domain, id) => {
  return axios.delete(`${domain}/api/Test/Delete/${id}`, {
    headers: {
      Authorization: `Bearer ${tokenDoctor}`,
      'Content-Type': 'application/json',
    }
  })
  .then((res) => {
    console.log("DeleteQuestions response:", res);
    return res; 
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });
};
