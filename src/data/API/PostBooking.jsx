import axios from "axios"

export const PostBooking = async (values, token, domain, id) => {
    await axios.post(`${domain}/api/DoctorHome/${id}/book`,values, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        console.log("PostBooking", res)
    }).catch((err) => {
        console.log("PostBooking", err)
    })

}