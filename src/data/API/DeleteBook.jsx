import axios from "axios"

export const DeleteBook = (tokenDoctor, domain, id) => {
  return axios.delete(`${domain}/api/BookEvent/${id}`, {
    headers: {
      Authorization: `Bearer ${tokenDoctor}`,
      'Content-Type': 'application/json',
    }
  })
  .then((res) => {
    console.log("DeleteBook response:", res);
    return res; 
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });
};
