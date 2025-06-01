import axios from "axios"

export const Doctorprofile = async (domain, tokenDoctor) => {
    let final = []
    await axios.get(`${domain}/api/AccountDoctor/profile`, {
        params: {
            populate: "*"
        },
        headers: {
            Authorization: `Bearer ${tokenDoctor}`
        }
    }).then((res) => {
        final = res.data
        console.log("profileDoctor : ", final)
    }).catch((err) => {
        if (err.response && err.response.status === 401) {
            localStorage.removeItem("tokenDoctor");
            sessionStorage.removeItem("tokenDoctor");
            window.location.href = "/loginadmin";
        }
        console.error("Error fetching profile:", err);
        return null;
    })
    return final
}