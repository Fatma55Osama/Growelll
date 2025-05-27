import axios from "axios"

export const DeleteAccount =async(token,domain)=>{
 await axios.delete(`${domain}/api/Account/DeleteAccount`,{
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