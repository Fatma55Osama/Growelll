import axios from "axios"

export const store_test = async (tokenDoctor,domain) => {
    let final = []
    await axios.get(`${domain}/api/Test/Get`, {
        headers: {
            Authorization: `Bearer ${tokenDoctor}`,
            Accept: "application/json"
        }
    }).then((res) => {
        final = res.data;
        console.log("this this test Dictor final " ,final)
    }).catch((err) => { console.log(err) })
    return final
}