import axios from "axios"

export const show_singleCategory = async (domain, id,tokenDoctor) => {
    let final = {}
    await axios.get(`${domain}/api/Category/${id}`, {
        // params: {
        //     populate: "*"
        // },
        headers: {
            Authorization: `Bearer ${tokenDoctor}`
        }
    }).then((res) => {
        final = res.data
        console.log("Category : ", final)
    }).catch((err) => { console.log(err) })
    return final
}