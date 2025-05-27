import axios from "axios"

export const show_singledoctor =async(domain,id)=>{
    let final ={}
    await axios.get(`${domain}/api/DoctorHome/${id}`,{
        params:{
            populate:"*"
        }
    }).then((res)=>{
        final = res.data
        console.log("Details ," , final)
    }).catch((err)=>{console.log(err)})
    return final
}