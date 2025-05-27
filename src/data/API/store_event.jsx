import axios from "axios"

export const store_event =async(domain)=>{
    let final = []
   await axios.get(`${domain}/api/HomeEvents/GetVidoes?pageNum=1&pageSize=10`).then((res)=>{
     final = res.data.data;
     console.log( "this this event final " + final)
   }).catch((err)=>{console.log(err)})
   return final
}