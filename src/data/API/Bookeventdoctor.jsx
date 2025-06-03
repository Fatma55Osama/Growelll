import axios from "axios"

export const Bookeventdoctor = async (tokenDoctor,domain) => {
    let final = []
    await axios.get(`${domain}/api/BookEvent`, {
        headers: {
            Authorization: `Bearer ${tokenDoctor}`,
            Accept: "application/json"
        }
    }).then((res) => {
        final = res.data;
        console.log("this this BookEvent BookEvent final " ,final)
    }).catch((err) => { console.log(err) })
    return final
}