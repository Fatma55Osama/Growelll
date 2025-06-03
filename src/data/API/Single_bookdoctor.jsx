import axios from "axios"

export const Single_bookdoctor = async (domain, id,tokenDoctor) => {
    let final = {}
    await axios.get(`${domain}/api/BookEvent/${id}`, {
        // params: {
        //     populate: "*"
        // },
        headers: {
            Authorization: `Bearer ${tokenDoctor}`
        }
    }).then((res) => {
        final = res.data
        console.log(" Single_bookdoctor : ", final)
    }).catch((err) => { console.log(err) })
    return final
}