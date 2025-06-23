import axios from "axios"

export const getallbooking =async(domain,tokenDoctor)=>{
    let final =[]
    await axios.get(`${domain}/api/Booking/GetAllBookings`,{
        headers:{
            Authorization:`Bearer ${tokenDoctor}`
        }
    }).then((res)=>{
        final =res.data
        console.log('getallbooking',res)
    }).catch((err)=>{
        console.log(err)
    })
  return final
}