import axios from "axios"

export const Logout =async(token,domain)=>{
 await axios.post(`${domain}/api/Account/Logout`,{
      headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
 }).then((res)=>{
   console.log(res)
 }).catch((err)=>{
    console.log(err)
 })
 return
}