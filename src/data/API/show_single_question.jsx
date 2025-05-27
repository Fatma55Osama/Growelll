import axios from "axios"

export const show_single_question = async (domain, id,token) => {
    let final = {}
    await axios.get(`${domain}/api/TestHome/${id}/questions`, {
        params: {
            populate: "*"
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        final = res.data
        console.log("Question : ", final)
    }).catch((err) => { console.log(err) })
    return final
}