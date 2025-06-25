import axios from "axios"

export const Deleteapoiement = async (domain, tokenDoctor, id) => {
    await axios.delete(`${domain}/api/Booking/DeleteBooking/${id}`, {
        headers: {
            Authorization: `Bearer ${tokenDoctor}`
        }
    }).then((res) => {
        console.log("Deleteapoiement",res)
        return res
    }).catch((err) => {
        console.log(err)
        throw err
    })
}