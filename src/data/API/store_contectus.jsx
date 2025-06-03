import axios from "axios"

export const store_contectus = async (domain, tokenDoctor) => {
    let final = []
    await axios.get(`${domain}/api/ContactUs`, {
        params: {
            populate: "*"
        },
        headers: {
            Authorization: `Bearer ${tokenDoctor}`
        }
    }).then((res) => {
        final = res.data
        console.log("store_contectus : ", final)
    }).catch((err) => {
       
        console.error(" store_contectus:", err);
 
    })
    return final
}