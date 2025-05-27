import axios from "axios"

export const profile = async (domain, token) => {
    let final = []
    await axios.get(`${domain}/api/Account/Profile`, {
        params: {
            populate: "*"
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        final = res.data
        console.log("profile : ", final)
    }).catch((err) => {
        if (err.response && err.response.status === 401) {
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            window.location.href = "/login";
        }
        console.error("Error fetching profile:", err);
        return null;
    })
    return final
}