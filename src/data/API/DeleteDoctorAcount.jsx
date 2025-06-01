import axios from "axios"

export const DeleteDoctorAcount =async(tokenDoctor,domain)=>{
 await axios.delete(`${domain}/api/AccountDoctor/delete-account`,{
      headers: {
      Authorization: `Bearer ${tokenDoctor}`,
      'Content-Type': 'application/json',
    }
 }).then((res)=>{
   console.log(res)
 }).catch((err)=>{
    console.log(err)
 })
 return
}