import axios from "axios"

export const show_singletestdoctor = async (domain, id,tokenDoctor) => {
    let final = {}
    await axios.get(`${domain}/api/Test/GetById/${id}`, {
        // params: {
        //     populate: "*"
        // },
        headers: {
            Authorization: `Bearer ${tokenDoctor}`
        }
    }).then((res) => {
        final = res.data
        console.log("testsingleDoctor : ", final)
    }).catch((err) => { console.log(err) })
    return final
}