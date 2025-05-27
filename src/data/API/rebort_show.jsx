import axios from "axios"

export const rebort_show = async (token) => {
    let final = {}
    await axios.get(`https://localhost:7071/api/UserReport/GetReport`, {
        headers: {
            Authorization: `Bearer ${token}`,
           
        }
    }).then((res) => {
        final = res.data
        console.log('UserReport', final)
    }).catch((err) => {
        if (err.response) {
            console.log("Response error:", err.response.status, err.response.data)
        } else {
            console.log("Other error:", err.message)
        }
    })
    return final
}