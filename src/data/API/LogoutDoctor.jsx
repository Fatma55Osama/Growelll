import axios from "axios"

export const LogoutDoctor = async (tokenDoctor, domain) => {
    await axios.post(`${domain}/api/AccountDoctor/logout`, {}, {
        headers: {
            Authorization: `Bearer ${tokenDoctor}`,
        }
    }).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })
    return
}