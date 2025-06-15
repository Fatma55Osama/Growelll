import axios from "axios"

export const single_vediodoctor =async(domain,tokenDoctor,id)=>{
 let final ={}
 await axios.get(`${domain}/api/VideoEvent/GetById/${id}`,{
    headers:{
        Authorization:`Bearer ${tokenDoctor}`
    }
 }).then((res)=>{
    final =res.data
 }).catch((err)=>{
    console.log(err)
 })
 return final
}