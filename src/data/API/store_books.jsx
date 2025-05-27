import axios from "axios"

export const store_books =async(domain)=>{
    let final = []
   await axios.get(`${domain}/api/HomeEvents/GetBooks?pageNum=1&pageSize=10`).then((res)=>{
     final = res.data;
     console.log(final)
   }).catch((err)=>{console.log(err)})
   return final
}