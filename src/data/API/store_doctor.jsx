import axios from "axios"

export const store_doctor =async(domain, page = 1, pageSize = 10,currentPage=1)=>{
    let final = []
   await axios.get(`${domain}/api/DoctorHome?page=${page}&pageSize=${pageSize}`).then((res)=>{
     final = res.data
     console.log(final)
   }).catch((err)=>{console.log(err)})
   return final
}