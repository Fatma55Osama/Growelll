import axios from "axios"

export const Deletevedio = (tokenDoctor, domain, id) => {
  return axios.delete(`${domain}/api/VideoEvent/${id}`, {
    headers: {
      Authorization: `Bearer ${tokenDoctor}`,
      'Content-Type': 'application/json',
    }
  })
  .then((res) => {
    console.log("Deletevedio response:", res);
    return res; 
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });
};
