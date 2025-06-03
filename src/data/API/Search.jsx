import axios from "axios"

export const Search = async(domain,search)=>{
    let final = []
    await axios.get(`${domain}/api/DoctorHome/search`,{
        params:{
            searchTerm:search
        }, headers: { 'accept': '*/*' }
    }).then((res)=>{
        final = res.data
        console.log(final)
    }).catch((err)=>{
        console.log(err)
    })
    return final
}