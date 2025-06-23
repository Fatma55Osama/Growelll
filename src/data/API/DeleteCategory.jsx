import axios from "axios"

export const DeleteCategory = async (domain, tokenDoctor, id) => {
    await axios.delete(`${domain}/api/Category/${id}`, {
        headers: {
            Authorization: `Bearer ${tokenDoctor}`
        }
    }).then((res) => {
        console.log("DeleteCategory",res)
        return res
    }).catch((err) => {
        console.log(err)
        throw err
    })
}