import axios from "axios"

export const store_question = async (tokenDoctor) => {
    let final = []
    await axios.get(`https://localhost:7071/api/Question`, {
        headers: {
            Authorization: `Bearer ${tokenDoctor}`,
            Accept: "application/json"
        }
    }).then((res) => {
        final = res.data;
        console.log("this this Question Dictor final " + + JSON.stringify(final))
    }).catch((err) => { console.log(err) })
    return final
}