import axios from "axios"

export const DoctorReport = async (tokenDoctor) => {
    let final = []
    await axios.get(`https://localhost:7071/api/UserReport/GetReport`, {
        headers: {
            Authorization: `Bearer ${tokenDoctor}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
    }).then((res) => {
        final = res.data
        console.log('DoctorReport', final)
    }).catch((err) => {
        if (err.response) {
            console.log("Response error:", err.response.status, err.response.data)
        } else {
            console.log("Other error:", err.message)
        }
    })
    return final
}