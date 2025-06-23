import axios from "axios"

export const store_Category =async(domain,tokenDoctor)=>{
    let final =[]
 await axios.get(`${domain}/api/Category`,{
    headers:{
        Authorization:`Bearer ${tokenDoctor}`
    }
 }).then((res)=>{
   final = res.data
}).catch((err)=>{
    console.log(err)
})
 return final
}

 