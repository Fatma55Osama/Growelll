import axios from "axios"

export const postcreatecategory = async (domain, tokenDoctor, values) => {
    const [name,description]=values
    await axios.post(`${domain}/api/Category/Create`, {
        "name": name,
        "description": description,
    }, {
        headers: {
            Authorization: `Bearer ${tokenDoctor}`
        }
    }).then((res) => {
        console.log("create category", res)
    }).catch((err)=>{
        console.log(err)
    })
 
}