import axios from "axios"

export const show_singlevent =async(domain,id)=>{
    let final ={}
    await axios  .get(`${domain}/api/HomeEvents/GetVideoID`, {
      params: {
        videoId: id
      }
    }).then((res)=>{
        final = res.data
        console.log("Details ," , final)
    }).catch((err)=>{console.log(err)})
    return final
}